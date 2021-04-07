interface Arquivo {
  id: number;
  userId: string;
  size: number;
  name: string;
  uri: string;
  fileName: string;
  contentType: string;
  createdAt: Date;
  acessoFornecedor: boolean;
  captacaoId: number;
}

export interface Proposta {
  captacao: string;
  dataCriacao?: Date;
  dataTermino?: Date;
  dataResposta?: Date;
  dataClausulasAceitas?: Date;
  duracao: number;
  fornecedorId: number;
  fornecedor: string;
  captacaoId: number;
  participacao: 0 | 1 | 2;
  planoFinalizado: boolean;
  consideracoes: string;
  arquivos: Arquivo[];
  id: number;
}

