import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TextValue } from '@app/commons';
import { AppService, LoadingController, DemandasService } from '@app/services';
import * as moment from 'moment';
import { ProjetoService } from '../projetos/projeto/services/projeto.service';

@Component({
    selector: 'app-cronograma-consolidado',
    templateUrl: './cronograma-consolidado.component.html',
    styleUrls: ['./cronograma-consolidado.component.scss'],
})
export class CronogramaConsolidadoComponent implements OnInit {
    cronograma: any;
    propostasFull: any;
    propostas: Array<TextValue> = [];
    propostasSimuladas: Array<any> = [];
    dataMinSimulacao: string = moment().format('YYYY-MM');
    dataMaxSimulacao: string = moment().add(2, 'years').format('YYYY-MM');

    simulador = new FormGroup({
        propostaSelecionada: new FormControl(),
        mesInicioProposta: new FormControl(),
    });

    constructor(
        protected route: ActivatedRoute,
        protected app: AppService,
        protected service: DemandasService,
        protected projetoService: ProjetoService,
        protected loading: LoadingController
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.cronograma = data.extrato;
        });

        this.app.demandas
            .getPropostasSimulacao()
            .toPromise()
            .then((data) => {
                this.propostasFull = data;
                this.propostas = data.map((proposta) => ({
                    value: proposta.guid,
                    text: proposta.captacao + ' | ' + proposta.fornecedor,
                }));
            });
    }

    selecionarProposta(e) {}

    adicionarProposta() {
        const propostaSelecionada = this.propostasFull.find((x) => x.guid === this.simulador.controls.propostaSelecionada.value);
        this.propostasSimuladas.push({
            proposta: propostaSelecionada.guid,
            etapa: propostaSelecionada.captacao + ' | ' + propostaSelecionada.fornecedor,
            mesInicio: this.simulador.controls.mesInicioProposta.value,
            duracao: propostaSelecionada.duracao,
            id: propostaSelecionada.id,
        });
        this.projetoService.getCronogramaConsolidadoSimulado(this.propostasSimuladas).then((data) => {
            this.cronograma = data;
            this.simulador.controls.propostaSelecionada.setValue(null);
            this.simulador.controls.mesInicioProposta.setValue(null);
        });
    }
}
