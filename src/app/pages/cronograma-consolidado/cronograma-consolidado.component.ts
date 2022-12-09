import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService, LoadingController } from '@app/services';

@Component({
    selector: 'app-cronograma-consolidado',
    templateUrl: './cronograma-consolidado.component.html',
    styleUrls: ['./cronograma-consolidado.component.scss'],
})
export class CronogramaConsolidadoComponent implements OnInit {
    cronograma: any;

    constructor(protected route: ActivatedRoute, protected app: AppService, protected loading: LoadingController) {}

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.cronograma = data.extrato;
        });
    }
}
