/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, Provider } from '@angular/core';
import { ServiceBase } from '@app/services';
import { HttpClient } from '@angular/common/http';
import { BaseEntity, Proposta, Validations } from '@app/commons';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PropostasService extends ServiceBase<any> {
    protected $currentProposta: BehaviorSubject<Proposta> = new BehaviorSubject<Proposta>(null);
    proposta = this.$currentProposta.asObservable();

    constructor(http: HttpClient) {
        super(http, 'Propostas');
    }

    setProposta(proposta: Proposta) {
        if (proposta) {
            this.$currentProposta.next(proposta);
        } else {
            throw new Error('Proposta inválida!');
        }
    }

    getProposta() {
        return this.$currentProposta.getValue();
    }

    async rejeitar(guid: string) {
        return await this.http.put<any>(`${this.controller}/${guid}/Rejeitar`, {}).toPromise();
    }

    async participar(guid: string) {
        return await this.http.put<any>(`${this.controller}/${guid}/Participar`, {}).toPromise();
    }

    async atualizarDuracao(guid: string, duracao: number) {
        return await this.http.put<any>(`${this.controller}/${guid}/Duracao`, duracao).toPromise();
    }

    async getClausulas() {
        return await this.http.get<Array<any>>(`Clausulas`).toPromise();
    }

    async getErros(guid: string) {
        return await this.http.get<Validations>(`${this.controller}/${guid}/Erros`, {}).toPromise();
    }

    async aceitarCondicoes(guid: string) {
        return await this.http
            .post<any>(`${this.controller}/${guid}/Condicoes`, {
                clausulasAceita: true,
                clausulaRejeitada: 0,
            })
            .toPromise();
    }

    async rejeitarCondicoes(guid: string, condicaoId: number) {
        return await this.http
            .post<any>(`${this.controller}/${guid}/Condicoes`, {
                clausulasAceita: false,
                clausulaRejeitada: condicaoId,
            })
            .toPromise();
    }

    async marcarComoFinalizado(guid: string, mensagem?: string) {
        return await this.http.put<any>(`${this.controller}/${guid}/Finalizar`, { mensagem }).toPromise();
    }

    async saveCoExecutor(guid: string, coExecutor: BaseEntity) {
        if (coExecutor.id === 0) {
            return await this.http.post(`${this.controller}/${guid}/CoExecutores`, coExecutor).toPromise();
        }
        return await this.http.put(`${this.controller}/${guid}/CoExecutores`, coExecutor).toPromise();
    }

    async getCoExecutores(guid: string) {
        return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/Empresas`, {}).toPromise();
    }

    async getEmpresas(guid: string) {
        return await this.http.get<any>(`${this.controller}/${guid}/Empresas`, {}).toPromise();
    }

    async getContrato(guid: string) {
        return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/Contrato`, {}).toPromise();
    }

    async getContratoRevisoes(guid: string) {
        return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/Contrato/Revisoes`, {}).toPromise();
    }

    async getContratoRevisao(guid: string, id: number) {
        return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/Contrato/Revisoes/${guid}`, {}).toPromise();
    }

    async getContratoRevisaoDiff(guid: string, id: number) {
        return await this.http
            .get(`${this.controller}/${guid}/Contrato/Revisoes/${id}/Diff`, {
                responseType: 'text',
            })
            .toPromise();
    }

    async saveContrato(guid: string, contrato: any) {
        return await this.http.post(`${this.controller}/${guid}/Contrato`, contrato).toPromise();
    }

    async getPlanoTrabalho(guid: string) {
        return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/PlanoTrabalho`, {}).toPromise();
    }

    async savePlanoTrabalho(guid: string, plano) {
        return await this.http.post<Array<BaseEntity>>(`${this.controller}/${guid}/PlanoTrabalho`, plano).toPromise();
    }

    async getEscopo(guid: string) {
        return await this.http.get<Array<BaseEntity>>(`${this.controller}/${guid}/Escopo`, {}).toPromise();
    }

    async saveEscopo(guid: string, escopo: any) {
        return await this.http.post<Array<BaseEntity>>(`${this.controller}/${guid}/Escopo`, escopo).toPromise();
    }

    async downloadArquivo(guid: string, file) {
        const blob = await this.http
            .get(`${this.controller}/${guid}/Arquivos/${file.id}`, {
                responseType: 'blob',
            })
            .toPromise();

        const a = document.createElement('a');
        const blobUrl = URL.createObjectURL(blob);
        a.href = blobUrl;
        a.setAttribute('download', file.name);
        a.click();
        URL.revokeObjectURL(blobUrl);
    }

    async comentarios(guid: string) {
        return await this.obter<Array<any>>(`${guid}/Comentarios`, {});
    }

    /**
     * @description Aprovar plano de trabalho (Usuário Norte Energia)
     */
    async aprovarPlano(guid: string) {
        return await this.post(`${guid}/Aprovar`, {});
    }

    /**
     * @description Solicitar alteração no plano de trabalho
     * @param guid identificador da  proposta
     * @param mensagem descrição do que deve ser alterado no plano
     */
    async solicitarAlteracao(guid: string, mensagem: string) {
        return await this.post(`${guid}/SolicitarAlteracao`, { mensagem });
    }

    /**
     * @description Recuperar informações do cronograma fisico financeiro
     * @param guid identificador da  proposta
     */
    async getInfoCronograma(guid: string) {
        return await this.obter(`${guid}/Cronograma`, {});
    }

    /**
     * @description Recuperar os detalhes da etapa do Cronograma
     * @param guid identificador da  proposta
     * @param numEtapa identificador da etapa
     */
    async getDetalheEtapaCronograma(guid: string, numEtapa) {
        return await this.obter(`${guid}/Cronograma/Etapa/${numEtapa}`, {});
    }
}
