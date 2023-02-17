/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AnalisesService, AnaliseTecnica } from '@app/services/analises.service';
import { AppService } from '@app/services';

@Component({
    selector: 'app-analise-ped-detalhes',
    templateUrl: './analise-ped-detalhes.component.html',
    styleUrls: ['./analise-ped-detalhes.component.scss'],
})
export class AnalisePedDetalhesComponent implements OnInit {
    route: ActivatedRoute;
    propostaId: number;
    analise: AnaliseTecnica;

    constructor(public activeModal: NgbActiveModal, protected service: AnalisesService, protected app: AppService) {}

    ngOnInit(): void {
        console.log('proposta', this.propostaId);
        this.service
            .abrirAnaliseTecnicaProposta(this.propostaId)
            .then((result) => {
                this.analise = result as AnaliseTecnica;
            })
            .catch((e) => {
                this.app.alertError('Não foi possível abrir a Análise Técnica');
            });
    }
}
