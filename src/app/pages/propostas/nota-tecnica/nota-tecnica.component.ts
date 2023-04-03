import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '@app/services/app.service';
import { ServiceBase } from '@app/services/service-base.service';
import { ConfigEditor } from '@app/core/shared';
import * as ClassicEditor from '@projects/ckeditor/build/ckeditor';
import { FileService } from '@app/services/file.service';
import { LoadingComponent } from '@app/core/components/loading/loading.component';

@Component({
    selector: 'app-proposta-nota-tecnica',
    templateUrl: './nota-tecnica.component.html',
    styleUrls: ['./nota-tecnica.component.scss'],
})
export class PropostaNotaTecnicaComponent implements OnInit {
    @ViewChild(LoadingComponent, { static: true })
    private loading: LoadingComponent;
    editor = ClassicEditor;
    configEditor = { ...ConfigEditor, height: 500, toolbar: [...ConfigEditor.toolbar, 'placeholder'], shortcodes: new Map() };
    form: FormGroup;
    categorias: Array<string>;
    titulo: string;

    constructor(
        protected app: AppService,
        protected router: Router,
        protected service: ServiceBase<any>,
        private route: ActivatedRoute,
        protected fileService: FileService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.configEditor.shortcodes = new Map(this.route.snapshot.data.shortcodes || []);
        this.buildForm();
    }

    buildForm() {
        const relatorio = this.route.snapshot.data.relatorio;
        if (relatorio.finalizado) {
            const nomeArquivo = relatorio.titulo.replace(/-/g, ' ').replace(/ /g, '_').toLowerCase();
            this.download(relatorio.propostaId, nomeArquivo);
            this.router.navigate(['/formalizacao/pendente']).then();
        } else {
            this.form = this.fb.group({
                id: 0,
                draft: true,
                conteudo: ['', Validators.required],
            });
            if (this.route.snapshot.data.relatorio) {
                this.form.patchValue(this.route.snapshot.data.relatorio);
            }
            this.form.updateValueAndValidity();
            this.titulo = this.route.snapshot.data.relatorio.titulo;
        }
    }

    voltar() {
        this.router.navigate(['/formalizacao/pendente']).then();
    }

    async finalizar() {
        this.app
            .confirm(
                `Você está concluindo a Nota Técnica. 
                Depois desse passo não é mais possível editá-la.`,
                'CONCLUIR NOTA TÉCNICA',
                [
                    { text: 'Cancelar', value: false, cssClass: 'btn btn-link' },
                    { text: 'Confirmar Conclusão da Nota Técnica', value: true, cssClass: 'btn-primary' },
                ]
            )
            .then(() => {
                this.loading.show();
                this.form.get('draft').setValue(false);
                this.onSubmit();
            });
    }

    async download(propostaId, arquivo: string) {
        await this.fileService.urlToBlobDownload(`Proposta/NotaTecnica/Download/${propostaId}`, `NT-${arquivo}.pdf`);
    }

    async onSubmit() {
        if (this.form.valid) {
            try {
                await this.service.salvar(this.form.value);
                this.loading.hide();
                this.app.alert('Relatório salvo com sucesso').then();
                this.app.router.navigateByUrl('/formalizacao/pendente').then();
            } catch (e) {
                this.app.alert('Não foi possível salvar o relatório').then();
                this.form.get('draft').setValue(true);
                console.error(e);
            }
        }
    }
}
