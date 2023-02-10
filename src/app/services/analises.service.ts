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
    fornecedor: string;
    dataHora: string;
    analistaResponsavel: string;
    statusAnalise: string;
}

export interface ParecerTecnico {
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

@Injectable({
    providedIn: 'root',
})
export class AnalisesService {
    constructor(private http: HttpClient) {}

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
}
