import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalisePed, AnalisesService, AnaliseTecnica, ParecerTecnico } from '@app/services/analises.service';
import * as ClassicEditor from '@projects/ckeditor/build/ckeditor';
import { ConfigEditor } from '@app/core/shared';
import { AppService } from '@app/services/app.service';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-parecer-form',
    templateUrl: './parecer-ped-form.component.html',
    styleUrls: ['./parecer-ped-form.component.scss'],
})
export class ParecerPedFormComponent implements OnInit {
    propostaId = 0;
    readonly = false;
    analise: AnalisePed;
    editor = ClassicEditor;
    configEditor = { ...ConfigEditor, height: 500, toolbar: [...ConfigEditor.toolbar, 'placeholder'], shortcodes: new Map() };
    configEditorFornecedor = { ...ConfigEditor };
    form: FormGroup;

    constructor(
        protected app: AppService,
        protected service: AnalisesService,
        protected fb: FormBuilder,
        private router: Router,
        protected route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.configEditor.shortcodes = new Map(this.route.snapshot.data.shortcodes || []);
        this.propostaId = Number(this.route.snapshot.paramMap.get('propostaId'));
        this.service.abrirAnalisePedProposta(this.propostaId).then((result) => {
            this.analise = result;
            this.readonly = this.analise.status === 'Enviada' || this.analise.status === 'Concluída';

            this.form = this.fb.group({
                id: new FormControl(this.analise.id),

                originalidade: new FormControl(this.analise.originalidade, [Validators.required]),
                aplicabilidade: new FormControl(this.analise.aplicabilidade, [Validators.required]),
                relevancia: new FormControl(this.analise.relevancia, [Validators.required]),
                razoabilidadeCustos: new FormControl(this.analise.razoabilidadeCustos, [Validators.required]),

                pontuacaoOriginalidade: new FormControl(this.analise.pontuacaoOriginalidade),
                pontuacaoAplicabilidade: new FormControl(this.analise.pontuacaoAplicabilidade),
                pontuacaoRelevancia: new FormControl(this.analise.pontuacaoRelevancia),
                pontuacaoRazoabilidadeCustos: new FormControl(this.analise.pontuacaoRazoabilidadeCustos),

                pontosCriticos: new FormControl(this.analise.pontosCriticos, [Validators.required]),
                conceito: new FormControl(this.analise.conceito),
                comentarios: new FormControl(this.analise.comentarios, [Validators.required]),
                pontuacaoFinal: new FormControl(this.analise.pontuacaoFinal),
            });
            this.calcular();
        });
    }

    calcular() {
        const analise = this.form.value as AnalisePed;
        if (!analise) {
            return 0;
        }
        const somaPontos =
            analise.pontuacaoOriginalidade +
            analise.pontuacaoAplicabilidade +
            analise.pontuacaoRelevancia +
            analise.pontuacaoRazoabilidadeCustos;
        this.form.controls['pontuacaoFinal'].setValue(somaPontos);
        this.analise.pontuacaoFinal = somaPontos;
    }

    voltar() {
        this.router.navigate(['/analise-ped']).then();
    }

    salvar() {
        const analise = this.form.value as AnalisePed;
        analise.propostaId = this.propostaId;
        this.service
            .salvarAnalisePed(analise)
            .then(() => {
                this.app.alert('Análise P&D Salva com Sucesso!');
                this.voltar();
            })
            .catch((e) => {
                this.app.alertError('Não foi possível salvar a Análise P&D!');
            });
    }

    enviar() {
        if (this.form.valid) {
            const analise = this.form.value as AnalisePed;
            analise.propostaId = this.propostaId;
            this.service
                .enviarAnalisePed(analise)
                .then(() => {
                    this.app.alert('Análise P&D Enviada com Sucesso!');
                    this.voltar();
                })
                .catch((e) => {
                    this.app.alertError('Não foi possível enviar a Análise P&D!');
                });
        }
    }
}
