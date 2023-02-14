import { AppService } from '@app/services/app.service';
import { Component, OnInit } from '@angular/core';
import { AnalisesService, PropostaAnalise } from '@app/services/analises.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CriterioAvaliacaoFormComponent } from './criterio-avaliacao-form/criterio-avaliacao-form.component';
import { ParecerFormComponent } from './parecer-form/parecer-form.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-analise-tecnica',
    templateUrl: './analise-tecnica.component.html',
    styleUrls: ['./analise-tecnica.component.scss'],
})
export class AnaliseTecnicaComponent implements OnInit {
    propostas: PropostaAnalise[] = [];
    tab = 'pendente';
    pendentes: PropostaAnalise[] = [];
    concluidas: PropostaAnalise[] = [];

    constructor(protected app: AppService, protected service: AnalisesService, protected modal: NgbModal, protected router: Router) {}

    ngOnInit() {
        this.service.getPropostasAnaliseTecnicaPendente().then((result: PropostaAnalise[]) => {
            this.pendentes = result.filter((x) => x.statusAnalise === 'Pendente' || x.statusAnalise === 'Aberta');
            this.concluidas = result.filter((x) => x.statusAnalise === 'Concluida' || x.statusAnalise === 'Enviada');
            this.propostas = this.pendentes;
        });
    }

    goToTab(tab: string) {
        this.tab = tab;
        if (tab === 'pendente') {
            this.propostas = this.pendentes;
        } else {
            this.propostas = this.concluidas;
        }
    }

    async openCriterioAvaliacaoForm(isGestor = false) {
        const ref = this.modal.open(CriterioAvaliacaoFormComponent, { backdrop: false, size: 'lg' });
        const form = ref.componentInstance as CriterioAvaliacaoFormComponent;
        form.isGestor = isGestor;
    }

    async openAnaliseTecnica(propostaId: number) {
        this.router.navigateByUrl(`/analise-tecnica/parecer/${propostaId}`).then();
    }
}
