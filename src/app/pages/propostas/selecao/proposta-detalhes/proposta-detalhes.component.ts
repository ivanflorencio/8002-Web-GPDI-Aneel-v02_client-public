/* eslint-disable @typescript-eslint/member-ordering */
import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '@app/services/file.service';
import { AnaliseTecnicaDetalhesComponent } from '@app/pages/analise-tecnica/analise-tecnica-detalhes/analise-tecnica-detalhes.component';
import { AnalisePedDetalhesComponent } from '@app/pages/analise-ped/analise-ped-detalhes/analise-ped-detalhes.component';

export interface CaptacaoSelecao {
    titulo: string;
    proposta: string;
    propostaId: number;
    responsavel: string;
    dataAlvo: Date;
    id: number;
    arquivoComprobatorio: string;
    arquivoComprobatorioId: number;
}

@Component({
    selector: 'app-proposta-detalhes',
    templateUrl: './proposta-detalhes.component.html',
    styleUrls: ['./proposta-detalhes.component.scss'],
})
export class PropostaDetalhesComponent {
    route: ActivatedRoute;
    captacao: CaptacaoSelecao;
    progress: { type: number; loaded: number; total: number } = null;

    constructor(
        public activeModal: NgbActiveModal,
        protected file: FileService,
        protected cdr: ChangeDetectorRef,
        protected modal: NgbModal
    ) {}

    protected resetProgress() {
        this.progress = { loaded: 0, total: 0, type: 0 };
    }

    async download(file) {
        this.resetProgress();
        const url = await this.file.download(`Captacoes/${this.captacao.id}/PropostaSelecionada/${file}`, (progress) => {
            this.progress = progress;
            this.cdr.detectChanges();
        });
        this.file.downloadBlob(url, `${file}-${this.captacao.titulo}(${this.captacao.proposta}).pdf`);
        this.progress = null;
    }

    abrirAnaliseTecnica(captacao: CaptacaoSelecao) {
        const ref = this.modal.open(AnaliseTecnicaDetalhesComponent, { size: 'lg' });
        const cmp = ref.componentInstance as AnaliseTecnicaDetalhesComponent;
        cmp.propostaId = captacao.propostaId;
    }

    abrirAnalisePed(captacao: CaptacaoSelecao) {
        const ref = this.modal.open(AnalisePedDetalhesComponent, { size: 'lg' });
        const cmp = ref.componentInstance as AnalisePedDetalhesComponent;
        cmp.propostaId = captacao.propostaId;
    }
}
