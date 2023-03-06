/* eslint-disable @typescript-eslint/naming-convention */
import { AppService } from '@app/services/app.service';
import { Component, OnInit } from '@angular/core';
import { AnalisesService, PropostaAnalise } from '@app/services/analises.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CriterioAvaliacaoFormComponent } from './criterio-avaliacao-form/criterio-avaliacao-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services';
import { UserRole } from '@app/commons';
import { FileService } from '@app/services/file.service';

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

    constructor(
        public app: AppService,
        protected auth: AuthService,
        protected service: AnalisesService,
        protected modal: NgbModal,
        protected router: Router,
        protected file: FileService
    ) {}

    ngOnInit() {
        this.service.getPropostasAnaliseTecnicaPendente().then((result: PropostaAnalise[]) => {
            this.pendentes = result.filter((x) => x.statusAnalise === 'Pendente' || x.statusAnalise === 'Aberta');
            this.concluidas = result.filter((x) => x.statusAnalise === 'Concluida' || x.statusAnalise === 'Enviada');
            this.propostas = this.pendentes;
        });
        this.app.ordem = {};
    }

    goToTab(tab: string) {
        this.tab = tab;
        this.app.ordem = {};
        if (tab === 'pendente') {
            this.propostas = this.pendentes;
        } else {
            this.propostas = this.concluidas;
        }
    }

    buscar(event: Event) {
        const filtroTexto = (filtro: string) => (item) => {
            if (filtro === '') {
                return true;
            }
            if (filtro !== '') {
                let contem = false;
                Object.keys(item).forEach((key) => {
                    if (item[key].toString().toLowerCase().includes(filtro.toLowerCase())) {
                        contem = true;
                    }
                });
                return contem;
            }
        };

        const texto = (event.target as HTMLInputElement).value;
        if (this.tab === 'pendente') {
            this.propostas = this.pendentes.filter(filtroTexto(texto));
        } else {
            this.propostas = this.concluidas.filter(filtroTexto(texto));
        }
    }

    get isAnalista() {
        return this.auth.getUser().role === UserRole.AnalistaTecnico;
    }

    async openCriterioAvaliacaoForm(isGestor = false) {
        const ref = this.modal.open(CriterioAvaliacaoFormComponent, { backdrop: false, size: 'lg' });
        const form = ref.componentInstance as CriterioAvaliacaoFormComponent;
        form.isGestor = isGestor;
    }

    async openAnaliseTecnica(propostaId: number) {
        this.router.navigateByUrl(`/analise-tecnica/parecer/${propostaId}`).then();
    }

    async downloadDocumento(documento: string, captacaoId: number, propostaId: number) {
        this.file.urlToBlobDownload(`Captacoes/${captacaoId}/Propostas/${propostaId}/${documento}`, null);
    }
}
