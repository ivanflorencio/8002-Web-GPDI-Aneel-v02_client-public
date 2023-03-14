import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '@app/services/app.service';
import { ServiceBase } from '@app/services/service-base.service';
import { ConfigEditor } from '@app/core/shared';
import * as ClassicEditor from '@projects/ckeditor/build/ckeditor';

@Component({
    selector: 'app-relatorio-diretoria-form',
    templateUrl: './relatorio-diretoria-form.component.html',
    styleUrls: ['./relatorio-diretoria-form.component.scss'],
})
export class RelatorioDiretoriaFormComponent implements OnInit {
    editor = ClassicEditor;
    configEditor = { ...ConfigEditor, height: 200, toolbar: [...ConfigEditor.toolbar, 'placeholder'], shortcodes: new Map() };
    configEditorMeio = { ...ConfigEditor, height: 500 };
    form: FormGroup;
    categorias: Array<string>;

    constructor(protected app: AppService, protected service: ServiceBase<any>, private route: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit() {
        this.configEditor.shortcodes = new Map(this.route.snapshot.data.shortcodes || []);
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            id: 0,
            titulo: ['', [Validators.required]],
            header: ['', Validators.required],
            conteudo: ['', Validators.required],
            footer: ['', Validators.required],
        });
        if (this.route.snapshot.data.contrato) {
            this.form.patchValue(this.route.snapshot.data.contrato);
        }
        this.form.updateValueAndValidity();
    }

    async remover() {
        if (await this.app.confirm('Tem certeza que deseja apagar este relatório? Essa ação não pode ser desfeita')) {
            try {
                await this.service.excluir(this.form.value.id);
                this.app.router.navigateByUrl('/configuracoes/relatorios-diretoria').then();
            } catch (e) {
                this.app.alert('Não foi possível excluir este relatório').then();
            }
        }
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
