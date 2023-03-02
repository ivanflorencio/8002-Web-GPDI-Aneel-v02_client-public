/* eslint-disable @typescript-eslint/naming-convention */
import { AppService } from '@app/services/app.service';
import { Component, OnInit } from '@angular/core';
import { AnalisesService, PropostaAnalise } from '@app/services/analises.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services';
import { UserRole } from '@app/commons';
import { AnaliseTecnicaDetalhesComponent } from '../analise-tecnica/analise-tecnica-detalhes/analise-tecnica-detalhes.component';

@Component({
    selector: 'app-analise-ped',
    templateUrl: './analise-ped.component.html',
    styleUrls: ['./analise-ped.component.scss'],
})
export class AnalisePedComponent implements OnInit {
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
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.service.getPropostasAnalisePedPendente().then((result: PropostaAnalise[]) => {
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

    abrirAnaliseTecnica(propostaId) {
        const ref = this.modal.open(AnaliseTecnicaDetalhesComponent, { size: 'lg' });
        const cmp = ref.componentInstance as AnaliseTecnicaDetalhesComponent;
        cmp.propostaId = propostaId;
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

    get isGestor() {
        return this.auth.getUser().role === UserRole.User || this.auth.getUser().role === UserRole.Administrador;
    }

    get isAnalista() {
        return this.auth.getUser().role === UserRole.AnalistaTecnico;
    }

    async openAnalisePed(propostaId: number) {
        this.router.navigateByUrl(`/analise-ped/parecer-ped/${propostaId}`).then();
    }
}
