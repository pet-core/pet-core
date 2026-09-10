#!/usr/bin/env node
"use strict";

/**
 * SPRINT 3 - PARTE 1
 * Codemod: Expo Router -> React Navigation (Native Stack)
 *          + extração da lógica das Views para Custom Hooks (camada de Control)
 *
 * Uso:
 *   node scripts/migrate.js <pasta-do-projeto-original> <pasta-de-saida>
 *
 * O script é IDEMPOTENTE: pode ser rodado de novo, ele sempre regenera a
 * pasta de saída do zero a partir do projeto original.
 */

const fs = require("fs");
const path = require("path");
const { splitComponentBody, classifyLogicStatement } = require("./lib/splitComponent.js");
const { ROUTES, byPath } = require("./lib/routeManifest.js");

const SRC_ROOT = process.argv[2];
const OUT_ROOT = process.argv[3];

if (!SRC_ROOT || !OUT_ROOT) {
  console.error("Uso: node migrate.js <projeto-origem> <projeto-destino>");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function read(p) {
  return fs.readFileSync(p, "utf8");
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function write(p, content) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content, "utf8");
}

function extractImportLines(src) {
  const lines = src.split("\n");
  const importLines = [];
  let i = 0;
  while (i < lines.length && /^\s*import\s/.test(lines[i])) {
    importLines.push(lines[i]);
    i++;
  }
  return { importLines, rest: lines.slice(i).join("\n") };
}

// Parses `import Default, { a, b as c } from "source";` style lines into a
// list of { local, source, isDefault }.
function parseImportLine(line) {
  const m = line.match(/^\s*import\s+(.+?)\s+from\s+["']([^"']+)["'];?\s*$/);
  if (!m) return [];
  const [, spec, source] = m;
  const bindings = [];
  const braceMatch = spec.match(/^\{([^}]*)\}$/);
  const mixedMatch = spec.match(/^(\w+)\s*,\s*\{([^}]*)\}$/);
  if (braceMatch) {
    braceMatch[1].split(",").map((s) => s.trim()).filter(Boolean).forEach((s) => {
      const asMatch = s.match(/(\w+)\s+as\s+(\w+)/);
      bindings.push({ local: asMatch ? asMatch[2] : s, imported: asMatch ? asMatch[1] : s, isDefault: false });
    });
  } else if (mixedMatch) {
    bindings.push({ local: mixedMatch[1], imported: null, isDefault: true });
    mixedMatch[2].split(",").map((s) => s.trim()).filter(Boolean).forEach((s) => {
      const asMatch = s.match(/(\w+)\s+as\s+(\w+)/);
      bindings.push({ local: asMatch ? asMatch[2] : s, imported: asMatch ? asMatch[1] : s, isDefault: false });
    });
  } else {
    bindings.push({ local: spec.trim(), imported: null, isDefault: true });
  }
  return bindings.map((b) => ({ ...b, source }));
}

function resolveInternalSource(originalSource, destKind) {
  // destKind: 'screen' (src/screens/<Group>/File.jsx) or 'hook' (src/hooks/File.js)
  const assetsIdx = originalSource.indexOf("assets/");
  if (assetsIdx !== -1) {
    const suffix = originalSource.slice(assetsIdx + "assets/".length);
    return (destKind === "screen" ? "../../../assets/" : "../../assets/") + suffix;
  }
  if (/data\/mockData$/.test(originalSource)) {
    return destKind === "screen" ? "../../data/mockData" : "../data/mockData";
  }
  if (/components\/(Header|Footer|PetCard)$/.test(originalSource)) {
    const name = originalSource.match(/components\/(Header|Footer|PetCard)$/)[1];
    return destKind === "screen" ? `../../components/${name}` : `../components/${name}`;
  }
  if (/services\/storage$/.test(originalSource)) {
    return destKind === "screen" ? "../../services/storage" : "../services/storage";
  }
  return originalSource; // node_modules package, unchanged
}

function buildImportLine(bindings, source) {
  const defaultBinding = bindings.find((b) => b.isDefault);
  const named = bindings.filter((b) => !b.isDefault);
  const parts = [];
  if (defaultBinding) parts.push(defaultBinding.local);
  if (named.length) {
    parts.push(
      "{ " +
        named
          .map((b) => (b.imported && b.imported !== b.local ? `${b.imported} as ${b.local}` : b.local))
          .join(", ") +
        " }"
    );
  }
  return `import ${parts.join(", ")} from "${source}";`;
}

// Given all parsed bindings (grouped by original source) and two code blobs
// (logicText, renderText), returns { hookImportLines, screenImportLines }.
function splitImportsByUsage(allBindings, logicText, renderText) {
  const bySourceHook = new Map();
  const bySourceScreen = new Map();

  for (const b of allBindings) {
    const usedInLogic = new RegExp(`\\b${b.local}\\b`).test(logicText);
    const usedInRender = new RegExp(`\\b${b.local}\\b`).test(renderText);
    if (!usedInLogic && !usedInRender) continue;

    if (usedInLogic) {
      const newSource = resolveInternalSource(b.source, "hook");
      if (!bySourceHook.has(newSource)) bySourceHook.set(newSource, []);
      bySourceHook.get(newSource).push(b);
    }
    if (usedInRender) {
      const newSource = resolveInternalSource(b.source, "screen");
      if (!bySourceScreen.has(newSource)) bySourceScreen.set(newSource, []);
      bySourceScreen.get(newSource).push(b);
    }
  }

  const hookImportLines = [...bySourceHook.entries()].map(([source, bindings]) => buildImportLine(bindings, source));
  const screenImportLines = [...bySourceScreen.entries()].map(([source, bindings]) => buildImportLine(bindings, source));
  return { hookImportLines, screenImportLines };
}

function fixRequirePaths(code, destKind) {
  return code.replace(/require\(\s*"([^"]*assets\/[^"]*)"\s*\)/g, (m, p) => {
    return `require("${resolveInternalSource(p, destKind)}")`;
  });
}

function transformNavigationCalls(code) {
  code = code.replace(
    /router\.push\(\s*\{\s*pathname:\s*"([^"]+)"\s*,\s*params:\s*(\{[\s\S]*?\})\s*,?\s*\}\s*\)/g,
    (m, p, params) => {
      const r = byPath(p);
      return `navigation.navigate("${r ? r.routeName : p}", ${params})`;
    }
  );
  code = code.replace(/router\.push\(\s*"([^"]+)"\s*\)/g, (m, p) => {
    const r = byPath(p);
    return `navigation.navigate("${r ? r.routeName : p}")`;
  });
  code = code.replace(/router\.replace\(\s*"([^"]+)"\s*\)/g, (m, p) => {
    const r = byPath(p);
    return `navigation.replace("${r ? r.routeName : p}")`;
  });
  code = code.replace(/router\.back\(\)/g, "navigation.goBack()");
  code = code.replace(/useLocalSearchParams\(\)/g, "route.params");
  return code;
}

function extractOtherDeclaredNames(stmt) {
  const names = [];
  let m = stmt.match(/^const\s+(\w+)\s*=/);
  if (m) names.push(m[1]);
  m = stmt.match(/^const\s*\{([^}]+)\}\s*=/);
  if (m) m[1].split(",").forEach((s) => names.push(s.trim().split(":").pop().trim()));
  m = stmt.match(/^const\s*\[([^\]]+)\]\s*=/);
  if (m) m[1].split(",").forEach((s) => names.push(s.trim()));
  return names;
}

// ---------------------------------------------------------------------------
// Core: process one screen file
// ---------------------------------------------------------------------------

function processScreen(route) {
  const filePath = path.join(SRC_ROOT, "app", route.appFile);
  const src = read(filePath);

  const { importLines, rest } = extractImportLines(src);
  const allBindings = importLines
    .flatMap(parseImportLine)
    .filter((b) => b.source !== "expo-router" && b.source !== "react");

  const fnMatch = rest.match(/export default function (\w+)\s*\(([^)]*)\)\s*\{/);
  if (!fnMatch) throw new Error(`Não encontrei o componente em ${filePath}`);
  const componentName = fnMatch[1];
  const bodyStart = fnMatch.index + fnMatch[0].length;

  const stylesIdx = rest.indexOf("\nconst styles");
  const hasStyles = stylesIdx !== -1;
  const bodyEnd = hasStyles ? stylesIdx : rest.lastIndexOf("}");
  let bodySrc = rest.slice(bodyStart, bodyEnd);
  bodySrc = bodySrc.replace(/\}\s*$/, ""); // drop the function's own closing brace
  const stylesBlock = hasStyles ? rest.slice(stylesIdx).trim() : "";

  const { logicStatements, renderCode } = splitComponentBody(bodySrc);

  const usesNavigationLib = /router\.|useLocalSearchParams/.test(bodySrc);
  const usesRoute = /useLocalSearchParams/.test(bodySrc);

  // Transform router.* calls -> navigation.* and require("...assets...") paths up front.
  const transformedLogicStatements = logicStatements.map((s) => fixRequirePaths(transformNavigationCalls(s), "hook"));
  const transformedRenderCode = fixRequirePaths(transformNavigationCalls(renderCode), "screen");

  const stateVars = [];
  const functionNames = [];
  const extraReturnNames = new Set();

  const hookBodyLines = [];
  if (usesNavigationLib) hookBodyLines.push("    const navigation = useNavigation();");
  if (usesRoute) hookBodyLines.push("    const route = useRoute();");

  transformedLogicStatements.forEach((stmt, idx) => {
    const original = logicStatements[idx];
    const info = classifyLogicStatement(original);
    if (info.type === "state") {
      stateVars.push([info.varName, info.setterName]);
    } else if (info.type === "function") {
      functionNames.push(info.name);
    } else {
      extractOtherDeclaredNames(original).forEach((n) => {
        if (new RegExp(`\\b${n}\\b`).test(transformedRenderCode)) extraReturnNames.add(n);
      });
    }
    hookBodyLines.push(
      stmt
        .split("\n")
        .map((l) => "    " + l)
        .join("\n")
    );
  });

  const returnNames = [
    ...stateVars.flatMap(([v, s]) => [v, s]),
    ...functionNames,
    ...extraReturnNames,
  ];

  const alreadyHasStyleSheet = allBindings.some((b) => b.local === "StyleSheet");
  const bindingsForSplit =
    hasStyles && !alreadyHasStyleSheet
      ? [...allBindings, { local: "StyleSheet", imported: "StyleSheet", isDefault: false, source: "react-native" }]
      : allBindings;

  const { hookImportLines, screenImportLines } = splitImportsByUsage(
    bindingsForSplit,
    transformedLogicStatements.join("\n"),
    transformedRenderCode + "\n" + stylesBlock
  );

  if (usesNavigationLib) hookImportLines.push('import { useNavigation' + (usesRoute ? ", useRoute" : "") + ' } from "@react-navigation/native";');

  const hookBodyText = hookBodyLines.join("\n");
  const reactHookNames = [];
  if (/\buseState\(/.test(hookBodyText)) reactHookNames.push("useState");
  if (/\buseEffect\(/.test(hookBodyText)) reactHookNames.push("useEffect");

  const hookContent =
    route.hookName === null
      ? null
      : [
          reactHookNames.length ? `import { ${reactHookNames.join(", ")} } from "react";` : "",
          ...hookImportLines,
          "",
          `export function ${route.hookName}() {`,
          hookBodyLines.join("\n\n"),
          "",
          `    return {`,
          returnNames.map((n) => `        ${n},`).join("\n"),
          `    };`,
          `}`,
          "",
        ].join("\n");

  // Screen also needs its own navigation const if navigation.* appears
  // directly inside the render JSX (inline onPress handlers, etc.).
  const renderUsesNavigation = /navigation\./.test(transformedRenderCode);
  if (renderUsesNavigation) screenImportLines.push('import { useNavigation } from "@react-navigation/native";');

  const hookCallLine =
    route.hookName === null
      ? ""
      : returnNames.length
      ? `    const { ${returnNames.join(", ")} } = ${route.hookName}();`
      : `    ${route.hookName}();`;

  const screenBodyPieces = [];
  if (route.hookName) screenBodyPieces.push(hookCallLine);
  if (renderUsesNavigation) screenBodyPieces.push("    const navigation = useNavigation();");
  screenBodyPieces.push(
    transformedRenderCode
      .split("\n")
      .map((l) => "    " + l)
      .join("\n")
  );

  const screenContent = [
    ...screenImportLines,
    route.hookName ? `import { ${route.hookName} } from "../../hooks/${route.hookName}";` : "",
    "",
    `export default function ${route.screenName.replace(/Screen$/, "") || componentName}(props) {`,
    screenBodyPieces.filter(Boolean).join("\n\n"),
    `}`,
    "",
    stylesBlock,
    "",
  ]
    .filter((l) => l !== "")
    .join("\n");

  return { hookContent, screenContent, componentName };
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

function main() {
  for (const route of ROUTES) {
    if (!route.hookName && route.path !== "/" && route.path !== "/erro") continue;
  }

  const results = [];
  for (const route of ROUTES.filter((r) => r.path !== "/" && r.path !== "/erro")) {
    const { hookContent, screenContent } = processScreen(route);
    results.push({ route, hookContent, screenContent });
  }

  for (const { route, hookContent, screenContent } of results) {
    const screenOut = path.join(OUT_ROOT, "src", "screens", route.group, `${route.screenName}.jsx`);
    write(screenOut, screenContent);
    if (hookContent) {
      const hookOut = path.join(OUT_ROOT, "src", "hooks", `${route.hookName}.js`);
      write(hookOut, hookContent);
    }
    console.log("OK", route.path, "->", screenOut);
  }
}

main();
