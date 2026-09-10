"use strict";

// Maps the old expo-router path to the new React Navigation route name,
// the screen component file (relative to app/), the group used for the
// output folder structure, and the hook name that will hold its logic.
const ROUTES = [
  { path: "/", routeName: "Splash", appFile: "index.jsx", group: "", screenName: "SplashScreen", hookName: null },
  { path: "/login", routeName: "Login", appFile: "login.jsx", group: "Auth", screenName: "LoginScreen", hookName: "useLogin" },
  { path: "/cadastro", routeName: "Cadastro", appFile: "cadastro.jsx", group: "Auth", screenName: "CadastroScreen", hookName: "useCadastro" },
  { path: "/erro", routeName: "Erro", appFile: "erro.jsx", group: "Common", screenName: "ErroScreen", hookName: null },

  { path: "/tutor/home", routeName: "TutorHome", appFile: "tutor/home.jsx", group: "Tutor", screenName: "HomeScreen", hookName: "useTutorHome" },
  { path: "/tutor/menu", routeName: "TutorMenu", appFile: "tutor/menu.jsx", group: "Tutor", screenName: "MenuScreen", hookName: "useTutorMenu" },
  { path: "/tutor/adicionar-pet", routeName: "TutorAdicionarPet", appFile: "tutor/adicionar-pet.jsx", group: "Tutor", screenName: "AdicionarPetScreen", hookName: "useAdicionarPet" },
  { path: "/tutor/alterar-dados", routeName: "TutorAlterarDados", appFile: "tutor/alterar-dados.jsx", group: "Tutor", screenName: "AlterarDadosScreen", hookName: "useTutorAlterarDados" },
  { path: "/tutor/avisos", routeName: "TutorAvisos", appFile: "tutor/avisos.jsx", group: "Tutor", screenName: "AvisosScreen", hookName: "useAvisos" },
  { path: "/tutor/comedouro", routeName: "TutorComedouro", appFile: "tutor/comedouro.jsx", group: "Tutor", screenName: "ComedouroScreen", hookName: "useComedouro" },
  { path: "/tutor/exames", routeName: "TutorExames", appFile: "tutor/exames.jsx", group: "Tutor", screenName: "ExamesScreen", hookName: "useTutorExames" },
  { path: "/tutor/historico", routeName: "TutorHistorico", appFile: "tutor/historico.jsx", group: "Tutor", screenName: "HistoricoScreen", hookName: "useHistorico" },
  { path: "/tutor/pet-detalhe", routeName: "TutorPetDetalhe", appFile: "tutor/pet-detalhe.jsx", group: "Tutor", screenName: "PetDetalheScreen", hookName: "usePetDetalhe" },
  { path: "/tutor/receitas", routeName: "TutorReceitas", appFile: "tutor/receitas.jsx", group: "Tutor", screenName: "ReceitasScreen", hookName: "useTutorReceitas" },

  { path: "/vet/home", routeName: "VetHome", appFile: "vet/home.jsx", group: "Vet", screenName: "HomeScreen", hookName: "useVetHome" },
  { path: "/vet/menu", routeName: "VetMenu", appFile: "vet/menu.jsx", group: "Vet", screenName: "MenuScreen", hookName: "useVetMenu" },
  { path: "/vet/alterar-dados", routeName: "VetAlterarDados", appFile: "vet/alterar-dados.jsx", group: "Vet", screenName: "AlterarDadosScreen", hookName: "useVetAlterarDados" },
  { path: "/vet/exames", routeName: "VetExames", appFile: "vet/exames.jsx", group: "Vet", screenName: "ExamesScreen", hookName: "useVetExames" },
  { path: "/vet/prontuario", routeName: "VetProntuario", appFile: "vet/prontuario.jsx", group: "Vet", screenName: "ProntuarioScreen", hookName: "useProntuario" },
  { path: "/vet/protocolos", routeName: "VetProtocolos", appFile: "vet/protocolos.jsx", group: "Vet", screenName: "ProtocolosScreen", hookName: "useProtocolos" },
  { path: "/vet/receitas", routeName: "VetReceitas", appFile: "vet/receitas.jsx", group: "Vet", screenName: "ReceitasScreen", hookName: "useVetReceitas" },
  { path: "/vet/relatorios", routeName: "VetRelatorios", appFile: "vet/relatorios.jsx", group: "Vet", screenName: "RelatoriosScreen", hookName: "useRelatorios" },
];

function byPath(path) {
  return ROUTES.find((r) => r.path === path);
}

module.exports = { ROUTES, byPath };
