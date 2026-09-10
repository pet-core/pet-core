"use strict";

/**
 * Tokenizes the body of a React component function into an ordered list of
 * top-level statements. Respects (), {}, [] nesting, strings and template
 * literals (including ${...} interpolation), so it works even though the
 * body contains JSX (JSX is just balanced {}/() from a bracket-counting
 * point of view).
 */
function tokenizeStatements(src) {
  let i = 0;
  const n = src.length;
  const statements = [];
  let stmtStart = 0;
  let depth = 0;

  function skipString(quote) {
    i++;
    while (i < n) {
      if (src[i] === "\\") { i += 2; continue; }
      if (src[i] === quote) { i++; return; }
      i++;
    }
  }

  function skipTemplateLiteral() {
    i++;
    while (i < n) {
      if (src[i] === "\\") { i += 2; continue; }
      if (src[i] === "`") { i++; return; }
      if (src[i] === "$" && src[i + 1] === "{") {
        i += 2;
        let d = 1;
        while (i < n && d > 0) {
          if (src[i] === "{") d++;
          else if (src[i] === "}") { d--; i++; continue; }
          else if (src[i] === '"' || src[i] === "'") { skipString(src[i]); continue; }
          else if (src[i] === "`") { skipTemplateLiteral(); continue; }
          i++;
        }
        continue;
      }
      i++;
    }
  }

  let mode = null; // 'block' -> ends at top-level '}'; 'semi' -> ends at top-level ';'

  function detectMode(from) {
    const head = src.slice(from, from + 40);
    if (/^(async\s+)?function\b/.test(head) || /^(if|for|while|try|switch)\s*\(/.test(head) || /^(if|try)\b/.test(head)) {
      return "block";
    }
    return "semi";
  }

  while (i < n) {
    const ch = src[i];
    if (depth === 0 && /\s/.test(ch)) { i++; continue; }
    if (mode === null && depth === 0) mode = detectMode(i);
    if (ch === '"' || ch === "'") { skipString(ch); continue; }
    if (ch === "`") { skipTemplateLiteral(); continue; }
    if (ch === "(" || ch === "{" || ch === "[") { depth++; i++; continue; }
    if (ch === ")" || ch === "]") { depth--; i++; continue; }
    if (ch === "}") {
      depth--;
      i++;
      if (depth === 0 && mode === "block") {
        let j = i;
        while (j < n && /\s/.test(src[j])) j++;
        if (src[j] === ";") j++;
        statements.push(src.slice(stmtStart, j).trim());
        stmtStart = j;
        i = j;
        mode = null;
      }
      continue;
    }
    if (depth === 0 && ch === ";" && mode !== "block") {
      i++;
      statements.push(src.slice(stmtStart, i).trim());
      stmtStart = i;
      mode = null;
      continue;
    }
    i++;
  }
  const rest = src.slice(stmtStart).trim();
  if (rest) statements.push(rest);
  return statements.filter(Boolean);
}

/**
 * Splits a component body into { logicStatements, renderCode }.
 * "render" starts at the first top-level `if (...)` or `return` statement.
 */
function splitComponentBody(bodySrc) {
  const statements = tokenizeStatements(bodySrc);
  const logicStatements = [];
  let renderStartIndex = -1;

  for (let idx = 0; idx < statements.length; idx++) {
    const s = statements[idx];
    if (/^if\s*\(/.test(s) || /^return\b/.test(s)) {
      renderStartIndex = idx;
      break;
    }
    logicStatements.push(s);
  }

  const renderStatements = renderStartIndex === -1 ? [] : statements.slice(renderStartIndex);
  return {
    logicStatements,
    renderCode: renderStatements.join("\n\n"),
  };
}

function classifyLogicStatement(stmt) {
  const useStateMatch = stmt.match(/^const\s*\[\s*(\w+)\s*,\s*(\w+)\s*\]\s*=\s*useState\(/);
  if (useStateMatch) {
    return { type: "state", varName: useStateMatch[1], setterName: useStateMatch[2] };
  }
  const fnMatch = stmt.match(/^(?:async\s+)?function\s+(\w+)\s*\(/);
  if (fnMatch) {
    return { type: "function", name: fnMatch[1] };
  }
  return { type: "other" };
}

module.exports = { tokenizeStatements, splitComponentBody, classifyLogicStatement };
