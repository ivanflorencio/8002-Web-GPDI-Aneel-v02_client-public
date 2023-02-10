import { AppService } from '@app/services/app.service';
import { Component, OnInit } from '@angular/core';
import { AnalisesService, PropostaAnalise } from '@app/services/analises.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CriterioAvaliacaoFormComponent } from './criterio-avaliacao-form/criterio-avaliacao-form.component';
import { ParecerFormComponent } from './parecer-form/parecer-form.component';

@Component({
    selector: 'app-analise-tecnica',
    templateUrl: './analise-tecnica.component.html',
    styleUrls: ['./analise-tecnica.component.scss'],
})
export class AnaliseTecnicaComponent implements OnInit {
    propostas: PropostaAnalise[];

    constructor(protected app: AppService, protected service: AnalisesService, protected modal: NgbModal) {}

    ngOnInit() {
        this.service.getPropostasAnaliseTecnicaPendente().then((result: PropostaAnalise[]) => {
            this.propostas = result;
        });
    }

    async openCriterioAvaliacaoForm(isGestor = false) {
        const ref = this.modal.open(CriterioAvaliacaoFormComponent, { backdrop: false, size: 'lg' });
        const form = ref.componentInstance as CriterioAvaliacaoFormComponent;
        form.isGestor = isGestor;
    }

    async openAnaliseTecnica(propostaId: number) {
        const ref = this.modal.open(ParecerFormComponent, { backdrop: false, size: 'lg' });
        const form = ref.componentInstance as ParecerFormComponent;
        form.propostaId = propostaId;
    }
}
