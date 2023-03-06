/* eslint-disable @typescript-eslint/member-ordering */
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { AppService, AuthService } from '@app/services';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PropostaNodeFormDirective } from '@app/pages/propostas/proposta/directives';
import { PropostaServiceBase } from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import { PROPOSTA_CAN_EDIT } from '@app/pages/propostas/proposta/shared';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from '@app/commons';

@Component({
    selector: 'app-alocar-recurso-humano-form',
    templateUrl: './alocar-recurso-humano-form.component.html',
    styleUrls: ['./alocar-recurso-humano-form.component.scss'],
})
export class AlocarRecursoHumanoFormComponent extends PropostaNodeFormDirective implements OnInit, AfterViewInit {
    empresaReadonly = false;
    empresas = [];
    etapas = [];
    recursos = [];
    tabelaValorHora: any;
    recursoSelecionado: any;

    etapaCtrl = this.fb.control('', Validators.required);
    recursoCtrl = this.fb.control('', Validators.required);
    empresaFinanciadora = this.fb.control('', Validators.required);
    formMeses = this.fb.group({});

    form = this.fb.group({
        id: 0,
        recursoId: this.recursoCtrl,
        etapaId: this.etapaCtrl,
        empresaFinanciadoraId: this.empresaFinanciadora,
        justificativa: ['', Validators.required],
        horaMeses: this.formMeses,
    });
    recursoSelected: any;

    private _meses: Array<number> = [];
    private _mesesPrev: Array<number> = [];

    get meses() {
        return this._meses;
    }

    set meses(value) {
        this._mesesPrev = this._meses;
        this._meses = value.filter((n) => !isNaN(n));
        this._mesesPrev.forEach((m) => this.formMeses.removeControl(m.toString()));
        this._meses.forEach((m) => {
            this.formMeses.addControl(
                m.toString(),
                this.fb.control('', [Validators.required, Validators.min(0), Validators.max(this.max)])
            );
        });
    }

    @Input() max = 172;
    @ViewChild('financiadora') selectFinanciadora: ElementRef<HTMLSelectElement>;

    constructor(
        @Inject(PROPOSTA_CAN_EDIT) canEdit: BehaviorSubject<boolean>,
        app: AppService,
        protected auth: AuthService,
        fb: FormBuilder,
        activeModal: NgbActiveModal,
        service: PropostaServiceBase
    ) {
        super(canEdit, app, fb, activeModal, service);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.etapas = this.route.snapshot.data.etapas;
        this.recursos = this.route.snapshot.data.recursos;
        this.max = 190;

        this.empresas = this.route.snapshot.data.empresas;
        if (!this.app.isGestor && this.canEdit) {
            this.empresas = this.empresas.filter((i) => !(i.razaoSocial.toUpperCase().indexOf('NORTE ENERGIA') > -1));
        }

        const mesesMount = (v, d = null) => {
            const etapa = this.etapas.find((e) => e.id === parseFloat(v));
            if (etapa) {
                this._mesesPrev = this.meses;
                this.meses = etapa.meses;
                if (d) {
                    this.formMeses.patchValue(d);
                }
            }
        };
        const maxMeses = (recursoId) => {
            this.service.getTabelaValorHora(this.proposta.guid).then((tabela) => {
                this.tabelaValorHora = JSON.parse(tabela.registros);
                this.recursoSelecionado = this.recursos.find((r) => r.id === Number(recursoId));
                if (this.recursoSelecionado) {
                    const funcao = this.recursoSelecionado.funcao;
                    const graduacao = this.recursoSelecionado.titulacao;
                    this.max = this.tabelaValorHora[`Horas_${funcao}_${graduacao}`];
                }
            });
        };

        if (this.route.snapshot.data.item) {
            const item = this.route.snapshot.data.item;

            mesesMount(item.etapaId, item.horaMeses);
            maxMeses(item.recursoId);
        }

        this.etapaCtrl.valueChanges.subscribe((v) => {
            mesesMount(v);
        });
        this.recursoCtrl.valueChanges.subscribe((id) => {
            maxMeses(id);
            this.updateFinanciador();
        });
        if (!this.canEdit) {
            this.formMeses.disable();
        }
    }

    ngAfterViewInit() {
        if (!this.canEdit) {
            //this.formMeses.disable();
            this.selectFinanciadora?.nativeElement.setAttribute('disabled', 'disabled');
        } else {
            this.updateFinanciador();
        }
    }

    updateFinanciador() {
        this.recursoSelected = this.recursos.find((r) => r.id === parseFloat(this.recursoCtrl.value));
        const empresa = this.empresas.find((e) => e.id === this.recursoSelected?.empresaId);
        this.empresaReadonly = this.recursoSelected && empresa.funcao === 'Cooperada';
        if (this.empresaReadonly) {
            this.empresaFinanciadora.setValue(this.recursoSelected.empresaId);
            // Não "Corrija" para this.empresaFinanciadora.disable();
            // Isso remove o empresaFinanciadoraId das informações enviadas
            this.selectFinanciadora?.nativeElement.setAttribute('disabled', 'disabled');
        } else {
            this.empresaFinanciadora.enable();
        }
    }
}
