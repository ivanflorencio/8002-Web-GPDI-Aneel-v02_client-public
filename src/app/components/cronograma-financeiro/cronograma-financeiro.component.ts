/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Input, Output, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-cronograma-financeiro',
    templateUrl: './cronograma-financeiro.component.html',
    styleUrls: ['./cronograma-financeiro.component.scss'],
})
export class CronogramaFinanceiroComponent implements OnInit {
    @Input() infoCronograma: any;

    loading = false;
    cronograma: any;
    isCronogramaProjeto: boolean;
    isConsolidado: boolean;

    getMesesEtapas(anoInicio: number, mesInicio: number, numeroMeses: number) {
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
        const totaisExecutado = mesesEtapas.map((m, i) => empresas.reduce((acc, curr) => acc + curr.executado[i], 0));
        const maiorTotal = Math.max(...totais);
        const totalGeral = totais.reduce((a, b) => a + b, 0);
        const totalGeralExecutado = totaisExecutado.reduce((a, b) => a + b, 0);

        empresas.forEach((empresa) => {
            const { nomeUltimoMes, ultimoMes } = this.getUltimoMesExecutado(infoCronograma.inicio.ano, infoCronograma.inicio.mes, empresa);
            empresa.ultimoMes = ultimoMes;
            empresa.nomeUltimoMes = nomeUltimoMes;
            empresa.totalPlanejado = empresa.desembolso.slice(0, ultimoMes).reduce((acc, curr) => acc + curr, 0);
            empresa.totalProjetado = empresa.executado.slice(0, ultimoMes).reduce((acc, curr) => acc + curr, 0);
            empresa.porcentagemExecutado =
                empresa.totalProjetado > 0 && empresa.totalPlanejado > 0
                    ? ((empresa.totalProjetado / empresa.totalPlanejado) * 100).toFixed(2)
                    : '0';
            empresa.porcentagemPlanejado =
                empresa.totalPlanejado > 0 && empresa.total > 0 ? ((empresa.totalPlanejado / empresa.total) * 100).toFixed(2) : '0';
        });

        this.isCronogramaProjeto = empresas?.some((i) => !!i.executado);
        this.isConsolidado = !!infoCronograma.etapas[0].projetoId;

        this.cronograma = {
            mesesEtapas,
            anos,
            meses,
            corridos,
            etapas,
            empresas,
            totais,
            totaisExecutado,
            maiorTotal,
            totalGeral,
            totalGeralExecutado,
        };
    }

    getUltimoMesExecutado(anoInicio: number, mesInicio: number, empresa: any) {
        let ultimoMes = 0;
        empresa.executado.forEach((desembolso, index) => (ultimoMes = desembolso > 0 ? index : ultimoMes));
        return {
            nomeUltimoMes: moment(`${anoInicio}-${mesInicio}-01`).add(ultimoMes, 'months').format('MMM/YY'),
            ultimoMes: ultimoMes + 1,
        };
    }

    async ngOnInit() {}

    async ngOnChanges() {
        this.carregarCronograma(this.infoCronograma);
    }

    toggle(n) {
        const summaryHeight = document.querySelector(`.etapa-${n} .wrapper-summary`)?.clientHeight;
        document.documentElement.style.setProperty('--height-summary-etapa', `${summaryHeight + 30}px`);
        this.cronograma = {
            ...this.cronograma,
            etapas: this.cronograma.etapas.map((etapa) => {
                if (etapa.numero === n) {
                    return { ...etapa, aberto: !etapa.aberto };
                }
                return etapa;
            }),
        };
    }
}
