import { Component, Inject, OnInit } from '@angular/core';
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

    constructor(protected router: Router, protected route: ActivatedRoute, protected parent: PropostaComponent) {}

    async ngOnInit() {
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
                [1, 'Lorem ipsum dolor sit amet, consectetur', [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                [2, 'Adipiscing elit, sed do eiusmod tempor incididunt ', [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                [3, 'Yt labore et dolore magna aliqua. Ut enim ad minim veniam', [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                [4, 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ', [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                [5, 'Commodo consequat. Duis aute irure dolor in reprehender ', [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                [6, 'Velit esse cillum dolore eu fugiat nulla pariatur', [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]],
                [7, 'Cupidatat non proident, sunt in culpa qui officia', [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0]],
                [8, 'Deserunt mollit anim id est laborum', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]],
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
}
