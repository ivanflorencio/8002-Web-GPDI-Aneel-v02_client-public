/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntity, Proposta, ROOT_URL } from '@app/commons';
import { AppService } from '@app/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@env/environment';
import { ModalComponent } from './modal/modal.component';
import { StorageService } from '@app/services/storage.service';
import { PropostasService } from '@app/pages/propostas/proposta/services/propostas.service';
import { PropostaComponent } from '@app/pages/propostas/proposta/proposta.component';

@Component({
    templateUrl: './condicoes.component.html',
    styleUrls: ['./condicoes.component.scss'],
})
export class CondicoesComponent implements OnInit {
    clausulas: Array<BaseEntity>;
    clausulasAceitas: Map<number, boolean> = new Map<number, boolean>();
    indiceAtual = 0;
    pdfUrl = null;

    proposta: Proposta;

    get clausulaAceita() {
        return this.clausulasAceitas.has(this.indiceAtual) && this.clausulasAceitas.get(this.indiceAtual);
    }

    constructor(
        @Inject(ROOT_URL) protected root_url: string,
        protected router: Router,
        protected route: ActivatedRoute,
        protected app: AppService,
        protected modal: NgbModal,
        protected propostasService: PropostasService,
        protected parent: PropostaComponent,
        protected storage: StorageService
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.clausulas = (data.clausulas as Array<BaseEntity>).sort((a, b) => Math.sign(a.ordem - b.ordem));
            this.proximaClausulaPendente();
        });
        this.propostasService.proposta.subscribe((p) => {
            this.proposta = p;
            this.pdfUrl = `${environment.api_url}/Propostas/${p.guid}/Download/Contrato?v=${new Date().getTime()}`;
            const clausulasAceitas = this.storage.get(`[${this.proposta.guid}]clausulasAceitas`);
            if (clausulasAceitas) {
                try {
                    const map = JSON.parse(clausulasAceitas);
                    this.clausulasAceitas = new Map<number, boolean>(map);
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }

    @HostListener('window:keydown', ['$event'])
    keydown(evt: KeyboardEvent) {
        switch (evt.key) {
            case 'ArrowRight':
                this.proximaClausula();
                break;
            case 'ArrowLeft':
                this.clausulaAnterior();
                break;
        }
    }

    clausulaAnterior() {
        if (this.indiceAtual > 0) {
            this.indiceAtual--;
        } else {
            this.indiceAtual = this.clausulas.length - 1;
        }
    }

    proximaClausulaPendente() {
        if (this.clausulasAceitas.size === this.clausulas.length) {
            return;
        }
        const i = this.clausulas.findIndex((b, idx) => !this.clausulasAceitas.has(idx));
        this.indiceAtual = i >= 0 ? i : this.indiceAtual;
    }

    proximaClausula() {
        this.indiceAtual++;
        this.indiceAtual = this.indiceAtual % this.clausulas.length;
    }

    concordar() {
        this.clausulasAceitas.set(this.indiceAtual, true);
        this.storage.set(`[${this.proposta.guid}]clausulasAceitas`, JSON.stringify([...this.clausulasAceitas]));
        if (this.clausulasAceitas.size === this.clausulas.length) {
            this.finalizar().then();
        }
        this.proximaClausulaPendente();
    }

    async discordar() {
        const ref = this.modal.open(ModalComponent, { size: 'lg' });
        const result = await ref.result;
        if (result) {
            const clausula = this.clausulas[this.indiceAtual];
            if (clausula) {
                const proposta = await this.propostasService.rejeitarCondicoes(this.proposta.guid, clausula.id);
                this.parent.proposta.participacao = proposta.participacao;
                this.router.navigate([this.root_url]).then();
            }
        }
    }

    async finalizar() {
        if (this.clausulas.length === this.clausulasAceitas.size) {
            const proposta = await this.propostasService.aceitarCondicoes(this.proposta.guid);
            this.propostasService.setProposta(proposta);
            this.storage.remove(`[${this.proposta.guid}]clausulasAceitas`);
            await this.app.alert('Proposta atualizada com sucesso!');
        } else {
            throw new Error('Finalizar foi chamado sem ter todas as clausulas aceitas');
        }
    }
}
