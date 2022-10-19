/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Inject, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostaComponent } from '@app/pages/propostas/proposta/proposta.component';
import { BehaviorSubject } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

const MOCK_QTD_MESES = 60;
const MOCK_QTD_EMPRESAS = 8;
const MOCK_QTD_ETAPAS = 10;
const MOCK_INICIO_ANO = 2022;
const MOCK_INICIO_MES = 8;
@Component({
    selector: 'app-cronograma',
    templateUrl: './cronograma.component.html',
    styleUrls: ['./cronograma.component.scss'],
})
export class CronogramaComponent implements OnInit {
    loading = false;

    canEdit: boolean;
    cronograma: any;
    fixedHeader = false;
    scrollOffset = 215;
    tableWidth = 0;

    constructor(protected router: Router, protected route: ActivatedRoute, protected parent: PropostaComponent) {}

    @HostListener('window:scroll')
    onWindowScroll() {
        this.fixedHeader = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) > this.scrollOffset;
    }

    async ngAfterViewInit() {
        this.tableWidth = document.querySelector('.cronograma').clientWidth;
    }

    getMesesEtapas(anoInicio: number, mesInicio: number, qtdMeses: number) {
        const meses = [];
        let somaAno = 0;
        let somaMes = mesInicio;
        for (let index = 0; index < qtdMeses; index++) {
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

    getEtapas() {
        const etapas = [];
        const tamanho = Math.floor(MOCK_QTD_MESES / MOCK_QTD_ETAPAS);
        for (let index = 0; index < MOCK_QTD_ETAPAS; index++) {
            etapas.push({
                numero: index + 1,
                etapa: this._getNomeMock(),
                meses: Array.from(Array(tamanho).keys()).map((i) => i + 1 + tamanho * index),
                aberto: false,
                produto: this._getNomeMock(),
            });
        }
        return etapas;
    }

    _getDesembolsosMock() {
        const desembolsos = [];
        for (let index = 0; index < MOCK_QTD_MESES; index++) {
            desembolsos.push(20000 + Math.floor(Math.random() * 100000));
        }
        return desembolsos;
    }

    _getNomeMock() {
        const nomes = [
            'Lorem ipsum dolor sit amet, consectetur',
            'Adipiscing Elit sed do eiusmod tempor incididunt',
            'Labore Magna Et dolore magna aliqua',
            'Enim Ad minim veniam, quis nostrud exercitation',
            'Ullamco laboris nisi ut aliquip ex ea commodo consequat',
            'Duis Aute irure dolor in reprehenderit in voluptate ',
            'Velit Pariatur cillum dolore eu fugiat nulla pariatur',
            'Excepteur Sint occaecat cupidatat non proident',
            'Sunt Mollit in culpa qui officia deserunt mollit anim id est laborum',
        ];
        return nomes[Math.floor(Math.random() * nomes.length)];
    }

    getEmpresas() {
        const desembolso = this._getDesembolsosMock();
        const empresas = [];
        for (let index = 0; index < MOCK_QTD_EMPRESAS; index++) {
            const nome = this._getNomeMock().split(' ');
            empresas.push({ nome: `${nome[0]} ${nome[1]} Incorporações`, desembolso, total: desembolso.reduce((a, b) => a + b, 0) });
        }
        return empresas;
    }

    async ngOnInit() {
        const mesesEtapas = this.getMesesEtapas(MOCK_INICIO_ANO, MOCK_INICIO_MES, MOCK_QTD_MESES);
        const etapas = this.getEtapas();
        const empresas = this.getEmpresas();

        console.log(etapas);

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

    toggle(n) {
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
