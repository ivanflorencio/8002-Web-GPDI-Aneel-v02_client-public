import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@app/services/app.service';
import { PropostaNodeFormDirective } from '@app/pages/propostas/proposta/directives';
import { PropostaServiceBase } from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import { PROPOSTA_CAN_EDIT } from '@app/pages/propostas/proposta/shared';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '@app/services';

@Component({
    selector: 'app-alocar-recurso-material-form',
    templateUrl: './alocar-recurso-material-form.component.html',
    styleUrls: ['./alocar-recurso-material-form.component.scss'],
})
export class AlocarRecursoMaterialFormComponent extends PropostaNodeFormDirective implements OnInit {
    empresas = [];
    etapas = [];
    mesesDesembolso = [];
    recursos = [];
    empresaFinanciadoraCtrl = this.fb.control('', Validators.required);
    empresaFinanciadora: any;
    empresaRecebedoraCtrl = this.fb.control('', Validators.required);

    usuario: any = {};
    mensagemContrapartida = '';
    recebedoraId = 0;
    financiadoraId = 0;

    form = this.fb.group({
        id: 0,
        recursoId: ['', Validators.required],
        etapaId: ['', Validators.required],
        mesDesembolso: [''],
        empresaFinanciadoraId: this.empresaFinanciadoraCtrl,
        empresaRecebedoraId: this.empresaRecebedoraCtrl,
        justificativa: ['', Validators.required],
        quantidade: ['', [Validators.required, Validators.min(1)]],
    });

    constructor(
        @Inject(PROPOSTA_CAN_EDIT) canEdit: BehaviorSubject<boolean>,
        app: AppService,
        fb: FormBuilder,
        protected auth: AuthService,
        activeModal: NgbActiveModal,
        service: PropostaServiceBase
    ) {
        super(canEdit, app, fb, activeModal, service);
    }

    handleEtapaChange(e) {
        const etapa = this.etapas.find((x) => x.id === Number(e.target.value));
        this.mesesDesembolso = etapa?.meses;
        this.form.controls['mesDesembolso'].setValue(this.mesesDesembolso[0]);
    }

    ngOnInit() {
        super.ngOnInit();
        this.empresas = this.route.snapshot.data.empresas;
        this.etapas = this.route.snapshot.data.etapas;
        this.recursos = this.route.snapshot.data.recursos;
        this.mesesDesembolso = this.etapas.find((x) => x.id === this.form.controls['etapaId'].value)?.meses;

        this.empresas = this.route.snapshot.data.empresas;
        /*
        if (!this.app.isGestor && this.canEdit) {
            this.empresas = this.empresas.filter((i) => !(i.razaoSocial.toUpperCase().indexOf('NORTE ENERGIA') > -1));
        }*/

        this.auth.user.subscribe((user) => {
            this.usuario = user;
        });

        this.empresaFinanciadoraCtrl.valueChanges.subscribe((e) => {
            this.updateFinanciadora();
        });

        this.empresaRecebedoraCtrl.valueChanges.subscribe((e) => {});
        this.updateFinanciadora();
    }

    updateFinanciadora() {
        this.empresaFinanciadora = this.empresas.find((e) => e.id === parseFloat(this.empresaFinanciadoraCtrl.value));
        const recebedora = this.empresas.find((e) => e.id === parseFloat(this.empresaRecebedoraCtrl.value));

        if (this.empresaFinanciadora?.funcao === 'Executora' && recebedora?.funcao === 'Cooperada') {
            this.empresaRecebedoraCtrl.setValue('');
        }
    }

    updateFinanciador(id) {
        const empresa = this.empresas.find((e) => e.id === Number(id));
        this.financiadoraId = empresa.empresaRefId;
        this.updateMensagemContrapartida();
    }

    updateRecebedor(id) {
        const empresa = this.empresas.find((e) => e.id === Number(id));
        this.recebedoraId = empresa.empresaRefId;
        this.updateMensagemContrapartida();
    }

    updateMensagemContrapartida() {
        console.log(this.financiadoraId, this.recebedoraId);
        if (this.financiadoraId === 1 && this.recebedoraId !== 1) {
            this.mensagemContrapartida = 'Despesa do Projeto';
        } else if (this.financiadoraId === 1 && this.recebedoraId === 1) {
            this.mensagemContrapartida = 'Custo Operacional da Norte Energia';
        } else if (this.financiadoraId === this.usuario.empresaId) {
            this.mensagemContrapartida = 'Contrapartida da Empresa Proponente';
        }
    }
}
