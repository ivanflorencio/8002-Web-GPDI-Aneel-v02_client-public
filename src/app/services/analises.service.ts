/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Projeto } from '@app/pages/projetos/projeto/projeto.component';

export interface PropostaAnalise {
    demandaId: number;
    tituloDemanda: string;
    propostaId: number;
    captacaoId: number;
    fornecedor: string;
    dataHora: string;
    analistaResponsavel: string;
    statusAnalise: string;
    pontuacao: number;
}

export interface ParecerTecnico {
    id: number;
    criterioId: number;
    descricaoCriterio: string;
    peso: number;
    justificativa: string;
    pontuacao: number;
}

export interface CriterioAvaliacao {
    id: number;
    demandaId: number;
    responsavelId: number;
    dataHora: string;
    descricao: string;
    peso: number;
    doGestor: boolean;
}

export interface CriteriosDemandas {
    demandaId: number;
    tituloDemanda: string;
    peso: number;
    criteriosAvaliacao: CriterioAvaliacao[];
    show: boolean;
}

export interface AnaliseTecnica {
    id: number;
    demandaId: number;
    propostaId: number;
    justificativa: string;
    comentarios: string;
    pontuacaoFinal: number;
    status: string;
    pareceres: ParecerTecnico[];
}

export interface AnalisePed {
    id: number;
    demandaId: number;
    propostaId: number;
    originalidade: string;
    aplicabilidade: string;
    relevancia: string;
    razoabilidadeCustos: string;
    pontuacaoOriginalidade: number;
    pontuacaoAplicabilidade: number;
    pontuacaoRelevancia: number;
    pontuacaoRazoabilidadeCustos: number;
    pontosCriticos: string;
    comentarios: string;
    pontuacaoFinal: number;
    conceito: string;
    status: string;
}

@Injectable({
    providedIn: 'root',
})
export class AnalisesService {
    constructor(private http: HttpClient) {}

    // ANÁLISE TÉCNICA DA PROPOSTA

    getPropostasAnaliseTecnicaPendente() {
        return this.http.get<PropostaAnalise[]>(`AnaliseTecnica/PropostasPendentes`).toPromise();
    }

    getCriteriosDemandas() {
        return this.http.get<CriteriosDemandas[]>(`AnaliseTecnica/CriteriosAvaliacao`).toPromise();
    }

    salvarCriterioAvaliacao({ descricao, demandaId, criterioId, peso, doGestor }) {
        return this.http
            .post<CriterioAvaliacao>(`AnaliseTecnica/CriteriosAvaliacao`, { descricao, demandaId, criterioId, peso, doGestor })
            .toPromise();
    }

    removerCriterioAvaliacao(criterioId: number) {
        return this.http.delete(`AnaliseTecnica/CriteriosAvaliacao/${criterioId}`).toPromise();
    }

    abrirAnaliseTecnicaProposta(propostaId: number) {
        return this.http.get<AnaliseTecnica>(`AnaliseTecnica/${propostaId}`).toPromise();
    }

    salvarAnaliseTecnica(analise: AnaliseTecnica) {
        return this.http.post(`AnaliseTecnica`, analise).toPromise();
    }

    enviarAnaliseTecnica(analise: AnaliseTecnica) {
        return this.http.post(`AnaliseTecnica/Enviar`, analise).toPromise();
    }

    // ANÁLISE P&D

    getPropostasAnalisePedPendente() {
        return this.http.get<PropostaAnalise[]>(`AnalisePed/PropostasPendentes`).toPromise();
    }

    abrirAnalisePedProposta(propostaId: number) {
        return this.http.get<AnalisePed>(`AnalisePed/${propostaId}`).toPromise();
    }

    salvarAnalisePed(analise: AnalisePed) {
        return this.http.post(`AnalisePed`, analise).toPromise();
    }

    enviarAnalisePed(analise: AnalisePed) {
        return this.http.post(`AnalisePed/Enviar`, analise).toPromise();
    }
}
