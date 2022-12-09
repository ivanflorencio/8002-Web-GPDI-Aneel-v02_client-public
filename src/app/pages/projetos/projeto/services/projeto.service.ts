/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { ServiceBase } from '@app/services';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Projeto } from '@app/pages/projetos/projeto/projeto.component';

@Injectable()
export class ProjetoService extends ServiceBase<any> {
    constructor(http: HttpClient) {
        super(http, 'Projetos');
    }

    protected $currentProjeto: BehaviorSubject<Projeto> = new BehaviorSubject<Projeto>(null);
    projeto = this.$currentProjeto.asObservable();

    setProjeto(proposta: Projeto) {
        if (proposta) {
            this.$currentProjeto.next(proposta);
        } else {
            throw new Error('Projeto inválido!');
        }
    }

    getCurrentProjeto() {
        return this.$currentProjeto.getValue();
    }

    async setStatusRegistro(projetoId: number, registroId: number, aprovado: boolean, observacao?: string) {
        return await this.post(`${projetoId}/RegistroFinanceiro/${registroId}/${aprovado ? 'Aprovar' : 'Reprovar'}`, { observacao });
    }

    async prorrogar(projetoId: number, data) {
        return await this.post(`${projetoId}/Prorrogacao`, data);
    }

    async gerarXmlProrrogacao(projetoId: number, data) {
        return await this.post(`${projetoId}/GerarXML/Prorrogacao`, data, {
            responseType: 'blob' as 'json',
        });
    }

    async getCronogramaProjeto(projetoId: number) {
        return await this.get(`${projetoId}/Cronograma`);
    }

    async getCronogramaConsolidado() {
        return await this.get(`CronogramaConsolidado`);
    }
}
