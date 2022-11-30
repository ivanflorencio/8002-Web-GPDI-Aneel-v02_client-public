import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetoService } from '@app/pages/projetos/projeto/services/projeto.service';
import { AppService, LoadingController } from '@app/services';

@Component({
    selector: 'app-cronograma-projeto',
    templateUrl: './cronograma-projeto.component.html',
    styleUrls: ['./cronograma-projeto.component.scss'],
})
export class CronogramaProjetoComponent implements OnInit {
    cronograma: any;

    constructor(
        protected route: ActivatedRoute,
        protected app: AppService,
        protected loading: LoadingController,
        protected projetoService: ProjetoService
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.cronograma = data.extrato;
        });
    }
}
