import { Component, OnInit } from '@angular/core';
import { AnalisesService, CriteriosDemandas } from '@app/services/analises.service';

import { AppService } from '@app/services/app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-criterio-avaliacao-form',
    templateUrl: './criterio-avaliacao-form.component.html',
    styleUrls: ['./criterio-avaliacao-form.component.scss'],
})
export class CriterioAvaliacaoFormComponent implements OnInit {
    criteriosDemandas: CriteriosDemandas[];
    isGestor = false;
    isLoading = false;
    isNovo = false;

    constructor(protected app: AppService, protected service: AnalisesService, public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.carregarCriterios();
    }

    carregarCriterios() {
        this.service.getCriteriosDemandas().then((result) => {
            this.criteriosDemandas = result;
            if (!this.isGestor) {
                this.criteriosDemandas.map((demanda) => {
                    demanda.criteriosAvaliacao = demanda.criteriosAvaliacao.sort((a, b) =>
                        a.doGestor === b.doGestor ? 0 : a.doGestor ? -1 : 1
                    );
                    return demanda;
                });
            }
        });
    }

    toggleAbaDemanda(demandaId: number) {
        this.criteriosDemandas = this.criteriosDemandas.map((d) => {
            if (demandaId === d.demandaId) {
                d.show = !d.show;
            } else {
                d.show = false;
            }
            return d;
        });
    }

    addCriterioDemanda(demandaId: number) {
        this.criteriosDemandas = this.criteriosDemandas.map((d) => {
            if (demandaId === d.demandaId) {
                d.criteriosAvaliacao.push({
                    id: 0,
                    demandaId,
                    responsavelId: 0,
                    dataHora: '',
                    descricao: '',
                    peso: 1,
                    doGestor: this.isGestor,
                });
            }
            return d;
        });
        this.isNovo = true;
    }

    salvarCriterio(event: any) {
        const { field, criterio, demanda, peso, descricao } = event.target.dataset;
        const valor = event.target.value;
        this.isLoading = true;
        this.service
            .salvarCriterioAvaliacao({
                criterioId: criterio ? Number(criterio) : 0,
                demandaId: demanda,
                descricao: field === 'descricao' ? valor : descricao,
                peso: field === 'peso' ? valor : Number(peso),
                doGestor: this.isGestor,
            })
            .then((result) => {
                if (!(criterio > 0)) {
                    this.criteriosDemandas = this.criteriosDemandas.map((d) => {
                        if (Number(result.demandaId) === Number(d.demandaId)) {
                            d.criteriosAvaliacao.splice(-1);
                            d.criteriosAvaliacao.push(result);
                        }
                        return d;
                    });
                }
            })
            .finally(() => {
                this.isLoading = false;
                this.isNovo = false;
            });
    }

    async removerCriterio(criterioId: number) {
        if (
            await this.app.confirm(
                'Tem certeza que deseja excluir esse Critério de Avaliação? Essa ação não pode ser desfeita',
                'Tem certeza?'
            )
        ) {
            this.isLoading = true;
            this.service
                .removerCriterioAvaliacao(criterioId)
                .then(async () => {
                    this.criteriosDemandas = this.criteriosDemandas.map((d) => {
                        d.criteriosAvaliacao = d.criteriosAvaliacao.filter((c) => c.id !== criterioId);
                        return d;
                    });
                    await this.app.alert('Critério de Avaliação excluído com sucesso!');
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    }

    async onSubmit() {}
}
