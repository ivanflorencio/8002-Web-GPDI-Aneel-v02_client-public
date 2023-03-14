import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '@app/services/app.service';
import { ServiceBase } from '@app/services/service-base.service';
import { ConfigEditor } from '@app/core/shared';
import * as ClassicEditor from '@projects/ckeditor/build/ckeditor';

@Component({
    selector: 'app-proposta-relatorio-diretoria',
    templateUrl: './relatorio-diretoria.component.html',
    styleUrls: ['./relatorio-diretoria.component.scss'],
})
export class PropostaRelatorioDiretoriaComponent implements OnInit {
    editor = ClassicEditor;
    configEditor = { ...ConfigEditor, height: 500, toolbar: [...ConfigEditor.toolbar, 'placeholder'], shortcodes: new Map() };
    form: FormGroup;
    categorias: Array<string>;

    constructor(
        protected app: AppService,
        protected router: Router,
        protected service: ServiceBase<any>,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.configEditor.shortcodes = new Map(this.route.snapshot.data.shortcodes || []);
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            id: 0,
            conteudo: ['', Validators.required],
        });
        if (this.route.snapshot.data.relatorio) {
            this.form.patchValue(this.route.snapshot.data.relatorio);
        }
        this.form.updateValueAndValidity();
    }

    voltar() {
        this.router.navigate(['/formalizacao/pendente']).then();
    }

    async onSubmit() {
        if (this.form.valid) {
            try {
                await this.service.salvar(this.form.value);
                this.app.alert('Relatório salvo com sucesso').then();
                this.app.router.navigateByUrl('/configuracoes/relatorios-diretoria').then();
            } catch (e) {
                this.app.alert('Não foi possível salvar o relatório').then();
                console.error(e);
            }
        }
    }
}
