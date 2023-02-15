/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-shadow */
export enum UserRole {
    Administrador = 'Administrador',
    Colaborador = 'Colaborador',
    User = 'User',
    Suprimento = 'Suprimento',
    Fornecedor = 'Fornecedor',
    AnalistaTecnico = 'AnalistaTecnico',
}

export enum ProjetoAccess {
    Todos = 1,
    Leitura = 2,
    Escrita = 4,
    Aprovador = 8,
    Administrador = 16,
}

export enum XmlType {
    // Pesquisa e desenvolvimento
    ProjetoPed = 'ProjetoPed',
    InteresseProjetoPed = 'InteresseProjetoPed',
    ProrrogaExecucaoProjeto = 'ProrrogaExecucaoProjeto',
    RelatorioFinalPed = 'RelatorioFinalPed',
    RelatorioAuditoriaPed = 'RelatorioAuditoriaPed',

    // Gestão
    ProjetoGestao = 'ProjetoGestao',
    RelatorioFinalGestao = 'RelatorioFinalGestao',
    RelatorioAuditoriaGestao = 'RelatorioAuditoriaGestao',

    // Todos
    InicioExecucaoProjeto = 'InicioExecucaoProjeto',
}
