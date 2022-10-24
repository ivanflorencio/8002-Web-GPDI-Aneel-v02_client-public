/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Inject, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostaComponent } from '@app/pages/propostas/proposta/proposta.component';
import { BehaviorSubject } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { PropostasService } from '../../services/propostas.service';
@Component({
    selector: 'app-cronograma',
    templateUrl: './cronograma.component.html',
    styleUrls: ['./cronograma.component.scss'],
})
export class CronogramaComponent implements OnInit {
    loading = false;
    canEdit: boolean;
    proposta: any;
    cronograma: any;

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected parent: PropostaComponent,
        protected service: PropostasService
    ) {}

    getMesesEtapas(anoInicio: number, mesInicio: number, numeroMeses: number) {
        console.log({ anoInicio, mesInicio, numeroMeses });
        const meses = [];
        let somaAno = 0;
        let somaMes = mesInicio;
        for (let index = 0; index < numeroMeses; index++) {
            meses.push({
                calendario: somaMes,
                corrido: index + 1,
                ano: anoInicio + somaAno,
            });
            somaAno = somaMes === 12 ? somaAno + 1 : somaAno;
            somaMes = somaMes === 12 ? 1 : somaMes + 1;
        }
        return meses;
    }

    carregarCronograma(infoCronograma) {
        const mesesEtapas = this.getMesesEtapas(infoCronograma.inicio.ano, infoCronograma.inicio.mes, infoCronograma.inicio.numeroMeses);
        const etapas = infoCronograma.etapas;
        const empresas = infoCronograma.empresas;
        const anos = Array.from(new Set(mesesEtapas.map((m) => m.ano)));

        const meses = anos.reduce((acc, curr) => {
            acc[curr] = {};
            acc[curr].meses = mesesEtapas.filter((m) => m.ano === curr).map((m) => ({ calendario: m.calendario, corrido: m.corrido }));
            return acc;
        }, {});

        anos.forEach((ano) => {
            let totalAno = 0;
            meses[ano].meses.forEach((m) => {
                m.valor = empresas.reduce((acc, curr) => {
                    acc += curr.desembolso[m.corrido - 1];
                    return acc;
                }, 0);
                totalAno += m.valor;
            });
            meses[ano].total = totalAno;
        });

        const corridos = anos.reduce((acc, curr) => {
            acc[curr] = mesesEtapas.filter((m) => m.ano === curr).map((m) => m.corrido);
            return acc;
        }, {});

        const totais = mesesEtapas.map((m, i) => empresas.reduce((acc, curr) => acc + curr.desembolso[i], 0));
        const maiorTotal = Math.max(...totais);
        const totalGeral = totais.reduce((a, b) => a + b, 0);

        this.cronograma = {
            mesesEtapas,
            anos,
            meses,
            corridos,
            etapas,
            empresas,
            totais,
            maiorTotal,
            totalGeral,
        };
    }

    carregarDetalheEtapa(numero) {
        this.service.getDetalheEtapaCronograma(this.proposta.guid, numero).then((result) => {
            this.cronograma = {
                ...this.cronograma,
                etapas: this.cronograma.etapas.map((etapa) => {
                    if (etapa.numero === numero) {
                        return { ...etapa, detalhe: result };
                    }
                    return etapa;
                }),
            };
        });
    }

    async ngOnInit() {
        this.service.proposta.subscribe((proposta) => {
            this.proposta = proposta;
        });
        this.route.data.subscribe((data) => {
            if (data && data.data) {
                this.carregarCronograma(data.data);
            }
        });
    }

    toggle(n) {
        const summaryHeight = document.querySelector(`.etapa-${n} .wrapper-summary`)?.clientHeight;
        document.documentElement.style.setProperty('--height-summary-etapa', `${summaryHeight + 30}px`);
        this.cronograma = {
            ...this.cronograma,
            etapas: this.cronograma.etapas.map((etapa) => {
                if (etapa.numero === n) {
                    if (!etapa.aberto && !etapa.detalhe) {
                        this.carregarDetalheEtapa(etapa.numero);
                    }
                    return { ...etapa, aberto: !etapa.aberto };
                }
                return etapa;
            }),
        };
    }
}
