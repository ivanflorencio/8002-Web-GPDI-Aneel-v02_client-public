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
    private _tabelaValorHora: any;
    graduacoes: any;
    funcoes: any;

    get tabelaValorHora(): any {
        return this._tabelaValorHora;
    }

    set tabelaValorHora(value: any) {
        if (value) {
            const dadosForm = JSON.parse(value.registros);
            this._tabelaValorHora = dadosForm;
            this.form.patchValue(dadosForm);
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
        registros: [''],

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
            this.form.controls['registros'].setValue(JSON.stringify(this.form.value));
            console.log('FORM', this.form.value);
            try {
                await this.service.salvar(this.form.value);
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
