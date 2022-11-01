/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { AppService } from '@app/services/app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppValidators, Funcoes, Graduacoes } from '@app/commons';
import { ServiceBase } from '@app/services/service-base.service';

@Component({
    selector: 'app-tabela-form',
    templateUrl: './tabelas-form.component.html',
    styleUrls: ['./tabelas-form.component.scss'],
})
export class TabelasFormComponent implements OnInit {
    private _fornecedor: any;
    graduacoes: any;
    funcoes: any;

    get fornecedor(): any {
        return this._fornecedor;
    }

    set fornecedor(value: any) {
        if (value) {
            this._fornecedor = value;
            this.form.patchValue(value);
            const nomeCtrl = this.form.get('responsavelNome');
            const emailCtrl = this.form.get('responsavelEmail');
            nomeCtrl.clearValidators();
            emailCtrl.clearValidators();
            nomeCtrl.disable();
            emailCtrl.disable();
        }
    }

    getCampos() {
        let registros = {};
        Funcoes.forEach((funcao) => {
            Graduacoes.forEach((graduacao) => {
                registros = {
                    ...registros,
                    [`Valor_${funcao.value}_${graduacao.value}`]: new FormControl(''),
                    [`Horas_${funcao.value}_${graduacao.value}`]: new FormControl(''),
                };
            });
        });
        return registros;
    }

    form = this.fb.group({
        id: [0, Validators.required],
        nome: ['', Validators.required],
        ...this.getCampos(),
    });

    constructor(
        protected app: AppService,
        protected service: ServiceBase<any>,
        private fb: FormBuilder,
        public activeModal: NgbActiveModal
    ) {}

    ngOnInit() {
        this.graduacoes = Graduacoes;
        this.funcoes = Funcoes;
    }

    async onSubmit() {
        if (this.form.valid) {
            this.app.loading.show().then();
            console.log('FORM', this.form.value);
            try {
                //await this.service.salvar(this.form.value);
                this.activeModal.close(true);
                this.app.alert('Tabela salva com sucesso').then();
            } catch (e) {
                this.app.alert('Não foi possível salvar a Tabela').then();
                console.error(e);
            }
            this.app.loading.hide();
        }
    }
}
