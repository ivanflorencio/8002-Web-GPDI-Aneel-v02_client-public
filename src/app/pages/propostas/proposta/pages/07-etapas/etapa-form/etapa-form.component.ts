import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { AppService } from '@app/services/app.service';
import { Component, Inject, OnInit } from '@angular/core';
import { EtapasService, ProdutosService } from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import { Proposta } from '@app/commons';
import { ActivatedRoute } from '@angular/router';
import { PropostasService } from '@app/pages/propostas/proposta/services/propostas.service';
import { PROPOSTA_CAN_EDIT } from '@app/pages/propostas/proposta/shared';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-etapa-form',
    templateUrl: './etapa-form.component.html',
    styleUrls: ['./etapa-form.component.scss'],
})
export class EtapaFormComponent implements OnInit {
    route: ActivatedRoute;
    proposta: Proposta;
    produtos: Array<any>;
    mesFinalMin: number;
    mesFinalMax: number;
    mesInicioCtrl = this.fb.control('', Validators.required);
    mesFinalCtrl = this.fb.control('', Validators.required);
    form = this.fb.group({
        id: [0],
        descricaoAtividades: ['', Validators.required],
        produtoId: ['', Validators.required],
        mesInicio: this.mesInicioCtrl,
        mesFinal: this.mesFinalCtrl,
    });
    canEdit: boolean;

    constructor(
        @Inject(PROPOSTA_CAN_EDIT) public propostaCanEdit: BehaviorSubject<boolean>,
        public produtoService: ProdutosService,
        protected propostasService: PropostasService,
        protected service: EtapasService,
        private app: AppService,
        private fb: FormBuilder,
        public activeModal: NgbActiveModal
    ) {}

    ngOnInit(): void {
        this.propostaCanEdit.subscribe((can) => (this.canEdit = can));
        this.propostasService.proposta.subscribe((p) => (this.proposta = p));
        this.produtoService.obter().then((p) => (this.produtos = p));

        this.mesInicioCtrl.valueChanges.subscribe((v) => {
            const m = parseFloat(v);
            const mf = parseFloat(this.mesFinalCtrl.value);
            this.mesFinalMin = Math.min(m, this.proposta.duracao);
            this.mesFinalMax = this.proposta.duracao;

            if (mf > this.mesFinalMax || mf < this.mesFinalMin) {
                this.mesFinalCtrl.setValue('');
            }
        });
        if (this.route.snapshot.data.etapa) {
            const etapa = this.route.snapshot.data.etapa;
            this.form.patchValue(etapa);
            const mesInicio = etapa.meses[0];
            const mesFinal = etapa.meses[etapa.meses.length - 1];
            this.mesInicioCtrl.setValue(mesInicio);
            this.mesFinalCtrl.setValue(mesFinal);
            this.form.updateValueAndValidity();
        }
        if (!this.canEdit) {
            this.form.disable();
        }
    }

    async onSubmit() {
        if (this.form.valid) {
            try {
                await this.service.salvar(this.form.value);
                this.app.alert('Etapa salva com sucesso').then();
                this.activeModal.close();
            } catch (e) {
                this.app.alert('Não foi possível salvar a etapa').then();
                console.error(e);
            }
        }
    }

    async remover() {
        try {
            if (this.form.value.id !== 0 && (await this.app.confirm('Tem certeza que deseja remover?', 'Confirme a exclusão'))) {
                await this.service.excluir(this.form.value.id);
                this.activeModal.close(true);
            }
        } catch (e) {
            if (e.error && e.error.detail) {
                this.app.alert(e.error.detail, 'Erro').then();
            } else {
                this.app.alert('Erro ao remover, tente novamente mais tarde', 'Erro').then();
            }
        }
    }
}
