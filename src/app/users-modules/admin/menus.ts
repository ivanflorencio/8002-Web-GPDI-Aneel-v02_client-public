/* eslint-disable @typescript-eslint/naming-convention */
import { HEADER_MENU, SIDEBAR_MENU } from '@app/commons';
import {
    MenuItemAlterarProjeto,
    MenuItemCentralAdministrativa,
    MenuItemConsultarDados,
    MenuItemExtrato,
    MenuItemCronogramaProjeto,
    MenuItemRefpAprovado,
    MenuItemRefpNovo,
    MenuItemRefpPendente,
    MenuItemRefpReprovado,
    MenuItemRelatorioEtapa,
    MenuItemRelatorioFinal,
    MenuItemResultadosApoio,
    MenuItemResultadosCapacitacao,
    MenuItemResultadosCientifico,
    MenuItemResultadosEconomicos,
    MenuItemResultadosIntelectual,
    MenuItemResultadosSocioAmbientais,
    PROJETO_EXECUCAO_MENU,
    PROJETO_FINALIZADO_MENU,
} from '@app/pages/projetos/projeto/projeto';
import {
    Demandas,
    AnaliseTecnica,
    Captacoes,
    Selecao,
    Refinamento,
    Riscos,
    Aprovacao,
    Execucao,
    Finalizacao,
    GestaoPeD,
    CronogramaConsolidado,
    Configuracao,
    MeuCadastro,
    GerenciarUsers,
} from '@app/users-modules/shared/menus';

export const SidebarMenu = {
    provide: SIDEBAR_MENU,
    useValue: [
        Demandas,
        Captacoes,
        AnaliseTecnica,
        Selecao,
        Refinamento,
        Riscos,
        Aprovacao,
        Execucao,
        Finalizacao,
        GestaoPeD,
        CronogramaConsolidado,
        Configuracao,
    ],
};

export const HeaderMenu = {
    provide: HEADER_MENU,
    useValue: [GerenciarUsers, MeuCadastro],
};

export const ProjetoExecucaoMenu = {
    provide: PROJETO_EXECUCAO_MENU,
    useValue: [
        MenuItemRefpNovo,
        MenuItemRefpPendente,
        MenuItemRefpReprovado,
        MenuItemRefpAprovado,
        MenuItemAlterarProjeto,
        MenuItemExtrato,
        MenuItemCronogramaProjeto,
        MenuItemConsultarDados,
        MenuItemCentralAdministrativa,
    ],
};
export const ProjetoFinalizadoMenu = {
    provide: PROJETO_FINALIZADO_MENU,
    useValue: [
        MenuItemRelatorioFinal,
        MenuItemRelatorioEtapa,
        MenuItemResultadosCapacitacao,
        MenuItemResultadosCientifico,
        MenuItemResultadosApoio,
        MenuItemResultadosIntelectual,
        MenuItemResultadosSocioAmbientais,
        MenuItemResultadosEconomicos,
        MenuItemCentralAdministrativa,
    ],
};
