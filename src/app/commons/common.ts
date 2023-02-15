/* eslint-disable @typescript-eslint/member-ordering */
import { UserRole } from './enums';
import { InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BaseEntity {
    id: number;

    [prop: string]: any;
}

export interface Searchable<T> {
    item: T;
    texts: Array<string>;
}

export interface TextValue {
    text: string;
    value: any;

    [propName: string]: any;
}

export interface MessageAlert {
    message: string;
    type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    icon?: string;
}

export interface FileUploaded {
    id: number;
    nomeArquivo: string;
    url: string;
    projetoId?: any;
    temaId: number;
    registroFinanceiroId?: any;
    categoria: number;
    categoriaValor?: any;
    userId: string;
    user?: any;
    created: string;
}

export interface UF {
    id: number;
    nome: string;
    valor: string;
}

export interface Segmento {
    id: number;
    nome: string;
    valor: string;
}

export interface Empresa {
    id: number;
    nome: string;
    valor: string;
}

export interface Permissao {
    id: number;
    nome: string;
    valor: string;
}

export interface ProjetoStatus {
    id: number;
    status: string;
}

export interface User {
    id?: string;
    userName?: string;
    normalizedUserName?: string;
    email: string;
    nomeCompleto: any;
    role: string;
    roles?: Array<UserRole>;
    status: boolean;
    razaoSocial?: any;
    fotoPerfil?: string;
    cpf?: any;
    cargo?: string;
    empresa?: string;
    empresaId?: number | string | '';
    ultimoLogin?: string;
    dataCadastro?: string;
    dataAtualizacao?: string;
    normalizedEmail?: string;
    emailConfirmed?: boolean;
    passwordHash?: string;
    securityStamp?: string;
    concurrencyStamp?: string;
    phoneNumber?: any;
    phoneNumberConfirmed?: boolean;
    twoFactorEnabled?: boolean;
    lockoutEnd?: any;
    lockoutEnabled?: boolean;
    accessFailedCount?: number;
}

export interface Tema {
    id: number;
    nome: string;
    valor: string;
    subTemas: SubTema[];
}

export interface CatalogTema {
    id: number;
    nome: string;
    valor: string;
    order: number;
    parent: string;
    parentId: number;
    subTemas: CatalogTema[];
}

export interface CatalogSubTema {
    subTemaId: number;
    catalogTemaId: number;
    nome: string;
    valor: string;
}

export interface SubTema {
    id: number;
    temaId: number;
    catalogSubTemaId: number;
    catalogSubTema: CatalogSubTema;
    outroDesc?: any;
}

export interface TemaProjeto {
    id: number;
    projetoId: number;
    catalogTemaId: number;
    catalogTema: CatalogTema;
    outroDesc?: any;
    subTemas: SubTema[];
    uploads: FileUploaded[];
}

// Produtos
export interface Produto {
    created: string;
    id: number;
    projetoId: number;
    titulo: string;
    desc: string;
    classificacao: number;
    classificacaoValor: string;
    tipo: number;
    tipoValor: string;
    faseCadeia: number;
    faseCadeiaValor: string;
    catalogProdutoFaseCadeiaId: number;
    catalogProdutoTipoDetalhadoId: number;
    etapaProduto: any[];
}

/**
 * Etapa Request
 */

export interface Etapa {
    id: number;
    projetoId: number;
    numeroEtapa?: number;
    desc: string;
    dataInicio: string;
    dataFim: string;
    atividadesRealizadas?: any;
    etapaProdutos: EtapaProduto[];
    etapaMeses: Array<{ id?: number; etapaId?: number; mes: string }>;
}

export interface EtapaProduto {
    id: number;
    etapaId: number;
    produtoId: number;
}

export interface EmpresaProjeto {
    id: number;
    projetoId: number;
    classificacao: number;
    classificacaoValor: string;
    empresaId: number;
    catalogEmpresa?: Empresa;
    cnpj?: any;
    catalogEstadoId?: any;
    estado?: UF;
    razaoSocial?: string;
}

export interface RecursoMaterial {
    id: number;
    projetoId: number;
    nome: string;
    categoriaContabil: number;
    categoriaContabilValor: string;
    catalogCategoriaContabilGestaoId: number;
    categoriaContabilGestao: { id: number; nome: string; valor: string; atividades: Array<any> };
    catalogAtividadeId: number;
    valorUnitario: string;
    especificacao: string;
}

export interface AlocacaoRM {
    id: number;
    etapaId: number;
    etapa?: any;
    projetoId: number;
    recursoMaterialId: number;
    recursoMaterial?: any;
    empresaFinanciadoraId: number;
    empresaFinanciadora?: any;
    empresaRecebedoraId: number;
    empresaRecebedora?: any;
    qtd: number;
    justificativa: string;

    [propName: string]: any;
}

export interface RecursoHumano {
    id: number;
    projetoId: number;
    empresaId: number;
    empresa?: any;
    valorHora: number;
    nomeCompleto: string;
    titulacao: number;
    titulacaoValor: string;
    funcao: number;
    funcaoValor: string;
    nacionalidade: number;
    nacionalidadeValor: string;
    cpf: string;
    passaporte?: any;
    urlCurriculo: string;
    gerenteProjeto: boolean;
}

export interface ExtratoItem {
    alocacaoId: number;
    desc: string;
    etapa: Etapa;
    recursoHumano?: RecursoHumano;
    recursoMaterial?: RecursoMaterial;
    registroFinanceiro: RegistroREFP;
    valor: number;
}

export interface ExtratoRelatorio {
    categoriaContabil: number;
    desc: string;
    items: ExtratoItem[];
    total: number;
    valor: number;
}

export interface OrcamentoEmpresa {
    nome: string;
    relatorios: ExtratoRelatorio[];
    total: number;
    valor: number;
}

export interface ExtratoEmpresa extends OrcamentoEmpresa {
    desvio: number;
    totalAprovado: number;
    valorAprovado: number;
}

export interface OrcamentosEmpresas {
    empresas: OrcamentoEmpresa[];
    total: number;
    valor: number;
}

export interface ExtratosEmpresas extends OrcamentosEmpresas {
    empresas: ExtratoEmpresa[];
}

export interface AlocacaoRH {
    id: number;
    etapaId: number;
    etapa?: any;
    projetoId: number;
    recursoHumanoId: number;
    recursoHumano: RecursoHumano;
    empresaId: number;
    empresa: EmpresaProjeto;
    hrsMes1: number;
    hrsMes2: number;
    hrsMes3: number;
    hrsMes4: number;
    hrsMes5: number;
    hrsMes6: number;
    justificativa: string;
}

// Extrato por Etapas
export interface ExtratoEtapa {
    nome: string;
    etapa: Etapa;
    empresas: OrcamentoEmpresa[];
    total: number;
    valor: number;
}

export interface ExtratosEtapas {
    etapas: ExtratoEtapa[];
    total: number;
    valor: number;
}

// -------------- ---------------
/**
 * Registro REFP
 */

export interface REFPObsInterna {
    id?: number;
    registroFinanceiroId?: number;
    created?: string;
    userId?: string;
    user?: User;
    texto: string;
}

export interface RegistroREFP {
    id: number;
    atividade?: { id: number; nome: string; valor: string };
    projetoId: number;
    tipo: 'RH' | 'RM';
    tipoValor: 'RH' | 'RM';
    status: number | string;
    statusValor: string;
    recursoHumanoId: number;
    recursoHumano?: any;
    mes: string;
    qtdHrs: number;
    empresaFinanciadoraId: number;
    empresaFinanciadora?: any;
    tipoDocumento: number;
    tipoDocumentoValor: string;
    numeroDocumento: string;
    dataDocumento: string;
    atividadeRealizada: string;
    obsInternas: REFPObsInterna[];
    nomeItem?: any;
    recursoMaterialId?: any;
    recursoMaterial?: any;
    empresaRecebedoraId?: any;
    empresaRecebedora?: any;
    beneficiado?: any;
    cnpjBeneficiado?: any;
    categoriaContabil: number;
    categoriaContabilValor: string;
    catalogCategoriaContabilGestaoId: number;
    catalogAtividadeId: number;
    equiparLabExistente?: any;
    equiparLabNovo?: any;
    itemNacional?: any;
    qtdItens?: any;
    valorUnitario?: any;
    especificacaoTecnica?: any;
    funcaoRecurso?: any;
    uploads: any[];
}

export interface RegistroREFPEdit {
    id: number;
    status: 'Pendente' | 'Aprovado' | 'Reprovado';
    obsInternas?: REFPObsInterna[];
}

export interface TotalLog {
    itens: Array<LogProjeto>;
    total: number;
}

export interface LogProjeto {
    id: number;
    projetoId: number;
    projeto?: any;
    userId: string;
    user: User;
    applicationUser?: any;
    tela: string;
    acao: string;
    acaoValor: string;
    statusAnterior: string;
    statusNovo: string;
    created: string;
    data: {
        statusAnterior?: Array<{ titulo: string; valor: any; type: string }>;
        statusNovo?: Array<{ titulo: string; valor: any; type: string }>;
    };
}

export type LogItem = Array<{
    text: string;
    value: any;
    children?: Array<LogItem>;
}>;

export interface RelatorioFinal {
    id?: number;
    produtoAlcancado: boolean;
    justificativaProduto: string;
    especificacaoProduto: string;
    tecnicaPrevista: boolean;
    justificativaTecnica: string;
    descTecnica: string;
    aplicabilidadePrevista: boolean;
    justificativaAplicabilidade: string;
    descTestes: string;
    descAbrangencia: string;
    descAmbito: string;
    descAtividades: string;
    uploads: Array<FileUploaded>;
}

export interface ResultadoCapacitacao {
    id: number;
    projetoId: number;
    recursoHumanoId: number;
    recursoHumano: RecursoHumano;
    tipo: number;
    tipoValor: string;
    conclusao: boolean;
    dataConclusao: string;
    cnpjInstituicao: string;
    areaPesquisa: string;
    tituloTrabalho: string;
    uploads: Array<FileUploaded>;
}

export interface ResultadoInfra {
    id: number;
    projetoId: number;
    tipo: string;
    tipoValor?: string;
    cnpjReceptora: string;
    nomeLaboratorio: string;
    areaPesquisa: string;
    listaMateriais: string;
}

export interface ResultadoProducao {
    id: number;
    projetoId: number;
    tipo: string;
    tipoValor?: string;
    dataPublicacao: string;
    confirmacao: boolean;
    nome: string;
    url: string;
    catalogPaisId: number;
    cidade: string;
    titulo: string;
    uploads: Array<FileUploaded>;
}

export interface ResultadoPropriedade {
    id: number;
    projetoId: number;
    tipo: string;
    tipoValor?: string;
    dataPedido: string;
    numeroPedido?: any;
    titulo: string;
    inventores: Array<{
        id?: number;
        recursoHumanoId: number;
        recursoHumano?: RecursoHumano;
        resultadoIntelectualId?: number;
    }>;
    depositantes: Array<{
        empresaId: number;
        entidade: number;
    }>;
}

export interface ResultadoSocialAmbiental {
    id: number;
    projetoId: number;
    tipo: number;
    tipoValor: string;
    positivo: boolean;
    tecnicaPrevista?: any;
    desc: string;
}

export interface ResultadoEconomico {
    id: number;
    projetoId: number;
    tipo: number;
    tipoValor: string;
    desc: string;
    unidadeBase: string;
    valorIndicador: number;
    percentagem: number;
    valorBeneficio: number;
}

export interface ProjetoGestaoAtividades {
    id: number;
    projetoId: number;
    dedicacaoHorario: string;
    participacaoMembros: string;
    desenvFerramenta: string;
    prospTecnologica: string;
    divulgacaoResultados: string;
    participacaoTecnicos: string;
    buscaAnterioridade: string;
    contratacaoAuditoria: string;
    apoioCitenel: string;
}

export interface Validations {
    isValid: boolean;
    errors: ValidationError[];
    ruleSetsExecuted: string[];
}

export interface ValidationError {
    propertyName: string;
    errorMessage: string;
    attemptedValue: null;
    customState: null;
    severity: number;
    errorCode: null;
    formattedMessageArguments: null;
    formattedMessagePlaceholderValues: null;
}

export interface MenuItem {
    text: string;
    path: string;
    icon?: string;
    role?: string | string[];

    [prop: string]: any;
}

export type MenuItems = Array<MenuItem>;

export interface Pagination<T> {
    data: Array<T>;
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
    filters?: Array<{ name: string; field: string; values: { [key: string]: string } }>;
}

export const SIDEBAR_MENU = new InjectionToken<Array<MenuItem> | BehaviorSubject<Array<MenuItem>>>('Sidebar menu', {
    providedIn: 'root',
    factory: () => new BehaviorSubject([]),
});
export const HEADER_MENU = new InjectionToken<Array<MenuItem>>('Header menu');
export const TOPNAV_MENU = new InjectionToken<Array<MenuItem> | BehaviorSubject<Array<MenuItem>>>('Topnav menu');
export const ROOT_URL = new InjectionToken<string>('Root Url');
