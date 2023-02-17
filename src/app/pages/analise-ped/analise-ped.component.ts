/* eslint-disable @typescript-eslint/naming-convention */
import { AppService } from '@app/services/app.service';
import { Component, OnInit } from '@angular/core';
import { AnalisesService, PropostaAnalise } from '@app/services/analises.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services';
import { UserRole } from '@app/commons';

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
        protected app: AppService,
        protected auth: AuthService,
        protected service: AnalisesService,
        protected modal: NgbModal,
        protected router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.service.getPropostasAnaliseTecnicaPendente().then((result: PropostaAnalise[]) => {
            this.pendentes = result.filter((x) => x.statusAnalise === 'Pendente' || x.statusAnalise === 'Aberta');
            this.concluidas = result.filter((x) => x.statusAnalise === 'Concluida' || x.statusAnalise === 'Enviada');
            this.propostas = this.pendentes;
        });
        console.log('isGestor', this.isGestor, 'analista', this.isAnalista);
    }

    goToTab(tab: string) {
        this.tab = tab;
        if (tab === 'pendente') {
            this.propostas = this.pendentes;
        } else {
            this.propostas = this.concluidas;
        }
    }

    get isGestor() {
        return this.auth.getUser().role === UserRole.User || this.auth.getUser().role === UserRole.Administrador;
    }

    get isAnalista() {
        return this.auth.getUser().role === UserRole.AnalistaTecnico;
    }

    async openAnalisePed(propostaId: number) {
        this.router.navigateByUrl(`/analise-ped/parecer/${propostaId}`).then();
    }
}
