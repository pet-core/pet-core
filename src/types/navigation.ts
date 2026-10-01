export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Cadastro: undefined;
    Erro: undefined;

    TutorHome: undefined;
    TutorMenu: undefined;
    TutorAdicionarPet: undefined;
    TutorAlterarDados: undefined;
    TutorAvisos: { registroId?: string } | undefined;
    TutorComedouro: { petId?: string } | undefined;
    TutorExames: { registroId?: string } | undefined;
    TutorHistorico: undefined;
    TutorPetDetalhe: { petId: string };
    TutorEditarPet: { petId: string };
    TutorReceitas: { registroId?: string } | undefined;

    VetHome: undefined;
    VetMenu: undefined;
    VetAlterarDados: undefined;
    VetExames: undefined;
    VetProntuario: undefined;
    VetProtocolos: undefined;
    VetReceitas: undefined;
    VetRelatorios: undefined;
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
