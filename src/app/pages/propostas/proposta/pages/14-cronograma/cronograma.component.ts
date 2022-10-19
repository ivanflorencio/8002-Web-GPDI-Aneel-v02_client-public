/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Inject, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostaComponent } from '@app/pages/propostas/proposta/proposta.component';
import { BehaviorSubject } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

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
    tableWidth: number;

    constructor(protected router: Router, protected route: ActivatedRoute, protected parent: PropostaComponent) {}

    @HostListener('window:scroll')
    onWindowScroll() {
        this.fixedHeader = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) > this.scrollOffset;
    }

    async ngAfterViewInit() {
        this.tableWidth = document.querySelector('.cronograma').clientWidth;
        console.log('tableWidth', this.tableWidth);
    }

    async ngOnInit() {
        const mesesEtapas = [
            { calendario: 6, corrido: 1, ano: 2022 },
            { calendario: 7, corrido: 2, ano: 2022 },
            { calendario: 8, corrido: 3, ano: 2022 },
            { calendario: 9, corrido: 4, ano: 2022 },
            { calendario: 10, corrido: 5, ano: 2022 },
            { calendario: 11, corrido: 6, ano: 2022 },
            { calendario: 12, corrido: 7, ano: 2022 },
            { calendario: 1, corrido: 8, ano: 2023 },
            { calendario: 2, corrido: 9, ano: 2023 },
            { calendario: 3, corrido: 10, ano: 2023 },
            { calendario: 4, corrido: 11, ano: 2023 },
            { calendario: 5, corrido: 12, ano: 2023 },
            { calendario: 6, corrido: 13, ano: 2023 },
            { calendario: 7, corrido: 14, ano: 2023 },
            { calendario: 8, corrido: 15, ano: 2023 },
            { calendario: 9, corrido: 16, ano: 2023 },
            { calendario: 10, corrido: 17, ano: 2023 },
            { calendario: 11, corrido: 18, ano: 2023 },
            { calendario: 12, corrido: 19, ano: 2023 },
            { calendario: 1, corrido: 20, ano: 2024 },
            { calendario: 2, corrido: 21, ano: 2024 },
            { calendario: 3, corrido: 22, ano: 2024 },
            { calendario: 4, corrido: 23, ano: 2024 },
            { calendario: 5, corrido: 24, ano: 2024 },
            { calendario: 6, corrido: 25, ano: 2024 },
            { calendario: 7, corrido: 26, ano: 2024 },
            { calendario: 8, corrido: 27, ano: 2024 },
            { calendario: 9, corrido: 28, ano: 2024 },
            { calendario: 10, corrido: 29, ano: 2024 },
            { calendario: 11, corrido: 30, ano: 2024 },
            { calendario: 12, corrido: 31, ano: 2024 },
            { calendario: 1, corrido: 32, ano: 2025 },
            { calendario: 2, corrido: 33, ano: 2025 },
            { calendario: 3, corrido: 34, ano: 2025 },
        ];

        const etapas = [
            {
                numero: 1,
                etapa: 'Lorem ipsum dolor sit amet, consectetur',
                meses: [1, 2, 3],
                aberto: false,
                produto: 'Commodo consequat. Duis aute irure dolor in reprehender',
            },
            {
                numero: 2,
                etapa: 'Adipiscing elit, sed do eiusmod tempor incididunt ',
                meses: [2, 3],
                aberto: false,
                produto: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
            },
            {
                numero: 3,
                etapa: 'Yt labore et dolore magna aliqua. enim ad minim venia Ut enim ad minim veniam',
                meses: [4, 5, 6],
                aberto: false,
                produto: 'Commodo consequat. Duis aute irure dolor in reprehender',
            },
            {
                numero: 4,
                etapa: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ',
                meses: [6, 7],
                aberto: false,
                produto: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                numero: 5,
                etapa: 'Commodo consequat. Duis aute irure dolor in reprehender ',
                meses: [8, 9, 10, 11],
                aberto: false,
                produto: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
            },
            {
                numero: 6,
                etapa: 'Velit esse cillum dolore eu fugiat nulla pariatur',
                meses: [10, 11],
                aberto: false,
                produto: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                numero: 7,
                etapa: 'Cupidatat non proident,enim ad minim veniaenim ad minim venia sunt in culpa qui officia',
                meses: [11, 12, 13, 14, 15],
                aberto: false,
                produto: 'Commodo consequat. Duis aute irure dolor in reprehender',
            },
            {
                numero: 8,
                etapa: 'Deserunt mollit anim id est laborum',
                meses: [13, 14, 15],
                aberto: false,
                produto: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                numero: 9,
                etapa: 'Lorem ipsum dolor sit amet, consectetur',
                meses: [15, 16],
                aberto: false,
                produto: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
            },
            {
                numero: 10,
                etapa: 'Adipiscing elit, sed do eiusmod tempor incididunt ',
                meses: [16],
                aberto: false,
                produto: 'Commodo consequat. Duis aute irure dolor in reprehender',
            },
            {
                numero: 11,
                etapa: 'Yt labore et dolore magna aliqua. Ut enim ad minim veniam',
                meses: [16, 17],
                aberto: false,
                produto: 'Lorem ipsum dolor sit amet, consectetur',
            },
        ];

        const desembolsoEmpresa = [
            25520, 45200, 98500, 23000, 150000, 50000, 250000, 85500, 225000, 75200, 69500, 55000, 47800, 43150, 28600, 155000, 114000,
            25520, 45200, 98500, 23000, 150000, 50000, 250000, 85500, 225000, 75200, 69500, 55000, 47800, 43150, 28600, 155000, 114000,
        ];

        const empresas = [
            { nome: 'Empresa Executora A', desembolso: desembolsoEmpresa, total: desembolsoEmpresa.reduce((a, b) => a + b, 0) },
            { nome: 'Empresa Executora B', desembolso: desembolsoEmpresa, total: desembolsoEmpresa.reduce((a, b) => a + b, 0) },
            { nome: 'Empresa Executora C', desembolso: desembolsoEmpresa, total: desembolsoEmpresa.reduce((a, b) => a + b, 0) },
        ];

        const anos = Array.from(new Set(mesesEtapas.map((m) => m.ano)));
        const meses = anos.reduce((acc, curr) => {
            acc[curr] = mesesEtapas.filter((m) => m.ano === curr).map((m) => m.calendario);
            return acc;
        }, {});
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
            totaisAnos: {
                [2022]: 670000,
                [2023]: 1080000,
                [2024]: 1080000,
                [2025]: 985000,
            },
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
