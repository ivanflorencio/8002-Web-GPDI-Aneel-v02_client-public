import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '@app/services/app.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@app/services/users.service';
import { EQUIPE_PED, EquipePeD, Roles, UserRole } from '@app/commons';
import { DEMANDA } from '@app/pages/demandas/demanda/providers';
import { Demanda } from '@app/commons/demandas';
import { AuthService } from '@app/services';

@Component({
    selector: 'app-definicao-pessoas-processo-validacao',
    templateUrl: './equipe-validacao.component.html',
    styleUrls: [],
})
export class EquipeValidacaoComponent implements OnInit {
    pessoas: Array<any> = [];
    tabelas: Array<any> = [];
    analistasTecnicos: Array<any> = [];
    analistasPed: Array<any> = [];
    exceptIds: Array<any> = [];
    form = this.fb.group({
        tabelaValorHoraId: ['', Validators.required],
        analistaTecnicoId: ['', Validators.required],
        analistaPedId: ['', Validators.required],
        superiorDireto: ['', Validators.required],
    });

    constructor(
        @Inject(DEMANDA) protected demanda: Demanda,
        @Inject(EQUIPE_PED) public equipe: EquipePeD,
        protected app: AppService,
        public auth: AuthService,
        protected route: ActivatedRoute,
        protected fb: FormBuilder
    ) {}

    ngOnInit() {
        this.configForm().then();
    }

    async configForm() {
        this.tabelas = await this.app.sistema.getTabelasValorHora();
        const { superiorDireto, tabelaValorHora, analistaTecnico, analistaPed } = await this.app.demandas.getSuperiorDireto(
            this.demanda.id
        );
        this.pessoas = this.equipe.outros;
        this.analistasTecnicos = this.equipe.analistasTecnicos;
        this.analistasPed = this.equipe.analistasPed;
        this.form.patchValue({
            superiorDireto,
            analistaTecnicoId: analistaTecnico,
            analistaPedId: analistaPed,
            tabelaValorHoraId: tabelaValorHora,
        });
        if (!this.auth.hasRoles(UserRole.Administrador)) {
            this.exceptIds = [this.auth.getUser().id];
        }
    }

    async salvar() {
        if (this.form.valid) {
            this.app.showLoading();
            try {
                await this.app.demandas.setSuperiorDireto(this.demanda.id, this.form.value);
                this.app.hideLoading();
                await this.app.alert('Demanda atualizada com sucesso!');
                this.app.router.navigate(['../', 'formulario', 'especificacao-tecnica'], { relativeTo: this.route }).then();
            } catch (e) {
                this.app.hideLoading();
                this.app.alert('Não foi possível atualizar a demanda').then();
            }
        }
    }
}
