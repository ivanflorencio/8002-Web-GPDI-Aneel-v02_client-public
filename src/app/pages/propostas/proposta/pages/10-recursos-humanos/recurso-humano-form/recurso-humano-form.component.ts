import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppValidators, Funcoes, Graduacoes, TextValue } from '@app/commons';
import { AppService } from '@app/services/app.service';
import { PropostaNodeFormDirective } from '@app/pages/propostas/proposta/directives';
import { PropostaService, PropostaServiceBase } from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import { PROPOSTA_CAN_EDIT } from '@app/pages/propostas/proposta/shared';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-recurso-humano-form',
    templateUrl: './recurso-humano-form.component.html',
    styleUrls: ['./recurso-humano-form.component.scss'],
})
export class RecursoHumanoFormComponent extends PropostaNodeFormDirective implements OnInit {
    documentoMask = '';
    tabelaValorHora: any;
    valorMaximoHora = 0;
    propostaService: PropostaService;
    form = this.fb.group({
        id: [0],
        empresaId: ['', [Validators.required]],
        nomeCompleto: ['', [Validators.required]],
        titulacao: ['', [Validators.required]],
        funcao: ['', [Validators.required]],
        nacionalidade: ['', [Validators.required]],
        documento: ['', [Validators.required]],
        valorHora: ['', [Validators.required, Validators.max(this.valorMaximoHora)]],
        urlCurriculo: ['', [AppValidators.isUrl]],
    });
    empresas: Array<TextValue> = [];
    titulacoes = Graduacoes;
    funcoes = Funcoes;

    constructor(
        @Inject(PROPOSTA_CAN_EDIT) canEdit: BehaviorSubject<boolean>,
        app: AppService,
        fb: FormBuilder,
        activeModal: NgbActiveModal,
        service: PropostaServiceBase
    ) {
        super(canEdit, app, fb, activeModal, service);
    }

    atualizarValorMaximo() {
        console.log('atualizarValorMaximo');
        const funcao = this.form.get('funcao').value;
        const graduacao = this.form.get('titulacao').value;
        console.log(`Valor_${funcao}_${graduacao}`);
        console.log(this.tabelaValorHora);
        const valorMax = this.tabelaValorHora[`Valor_${funcao}_${graduacao}`];

        if (valorMax) {
            this.valorMaximoHora = valorMax;
            this.form.get('valorHora').setValidators([Validators.required, Validators.max(this.valorMaximoHora)]);
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.empresas = this.route.snapshot.data.empresas;

        this.service.getTabelaValorHora(this.proposta.guid).then((tabela) => {
            this.tabelaValorHora = JSON.parse(tabela.registros);
        });

        this.form.get('nacionalidade').valueChanges.subscribe((v) => {
            const brasileiro = v === 'Brasileiro';
            const control = this.form.get('documento');
            control.clearValidators();

            this.documentoMask = brasileiro ? '000.000.000-00' : 'A*';
            if (brasileiro) {
                control.setValidators([Validators.required, AppValidators.cpf]);
            } else {
                control.setValidators([Validators.required]);
            }
        });
    }
}
