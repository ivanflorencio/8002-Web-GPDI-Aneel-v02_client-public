import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostaComponent } from '@app/pages/propostas/proposta/proposta.component';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-cronograma',
    templateUrl: './cronograma.component.html',
    styleUrls: ['./cronograma.component.scss'],
})
export class CronogramaComponent implements OnInit {
    loading = false;

    canEdit: boolean;
    cronograma: any;
    fixedHeader: boolean;
    scrollOffset = 215;

    constructor(protected router: Router, protected route: ActivatedRoute, protected parent: PropostaComponent) {}

    @HostListener('window:scroll')
    onWindowScroll() {
        console.log('scroll', window.pageYOffset);
        this.fixedHeader = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) > this.scrollOffset;
    }

    async ngOnInit() {
        this.fixedHeader = false;
        const desembolsos = [
            [
                'Executor A',
                [50000, 10000, 50000, 23000, 150000, 50000, 250000, 5000, 225000, 50000, 50000, 55000, 50000, 47000, 50000, 50000],
                [50000, 10000, 50000, 23000, 150000, 50000, 250000, 5000, 225000, 50000, 50000, 55000, 50000, 47000, 50000, 50000].reduce(
                    (a, b) => a + b,
                    0
                ),
            ],
            [
                'Executor B',
                [50000, 50000, 50000, 30000, 50000, 25000, 50000, 50000, 50000, 75000, 50000, 83000, 50000, 50000, 50000, 50000],
                [50000, 50000, 50000, 30000, 50000, 25000, 50000, 50000, 50000, 75000, 50000, 83000, 50000, 50000, 50000, 50000].reduce(
                    (a, b) => a + b,
                    0
                ),
            ],
            [
                'Executor C',
                [76000, 5000, 150000, 50000, 44000, 50000, 33000, 250000, 50000, 5000, 50000, 50000, 45000, 50000, 2000, 50000],
                [76000, 5000, 150000, 50000, 44000, 50000, 33000, 250000, 50000, 5000, 50000, 50000, 45000, 50000, 2000, 50000].reduce(
                    (a, b) => a + b,
                    0
                ),
            ],
        ];
        const totais = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (i) => desembolsos[0][1][i] + desembolsos[1][1][i] + desembolsos[2][1][i]
        );
        this.cronograma = {
            anos: [2022, 2023],
            meses: {
                [2022]: [6, 7, 8, 9, 10, 11, 12],
                [2023]: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            },
            corridos: {
                [2022]: [1, 2, 3, 4, 5, 6, 7],
                [2023]: [8, 9, 10, 11, 12, 13, 14, 15, 16],
            },
            etapas: [
                [1, 'Lorem ipsum dolor sit amet, consectetur', [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], false],
                [2, 'Adipiscing elit, sed do eiusmod tempor incididunt ', [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], false],
                [3, 'Yt labore et dolore magna aliqua. Ut enim ad minim veniam', [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], false],
                [
                    4,
                    'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ',
                    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    false,
                ],
                [5, 'Commodo consequat. Duis aute irure dolor in reprehender ', [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], false],
                [6, 'Velit esse cillum dolore eu fugiat nulla pariatur', [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], false],
                [7, 'Cupidatat non proident, sunt in culpa qui officia', [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0], false],
                [8, 'Deserunt mollit anim id est laborum', [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0], false],
                [9, 'Lorem ipsum dolor sit amet, consectetur', [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], false],
                [10, 'Adipiscing elit, sed do eiusmod tempor incididunt ', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0], false],
                [11, 'Yt labore et dolore magna aliqua. Ut enim ad minim veniam', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], false],
            ],
            desembolsos,
            totais,
            maiorTotal: Math.max(...totais),
            totalGeral: totais.reduce((a, b) => a + b, 0),
            totaisAnos: {
                [2022]: 670000,
                [2023]: 1080000,
            },
        };
    }

    toggle(n) {
        this.cronograma = {
            ...this.cronograma,
            etapas: this.cronograma.etapas.map((etapa) => {
                if (etapa[0] === n) {
                    return [etapa[0], etapa[1], etapa[2], !etapa[3]];
                }
                return etapa;
            }),
        };
    }
}
