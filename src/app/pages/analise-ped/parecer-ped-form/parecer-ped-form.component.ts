import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalisesService, AnaliseTecnica, ParecerTecnico } from '@app/services/analises.service';
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
    analise: AnaliseTecnica;
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
        this.service.abrirAnaliseTecnicaProposta(this.propostaId).then((result) => {
            this.analise = result;
            this.readonly = this.analise.status === 'Enviada' || this.analise.status === 'Concluída';

            this.form = this.fb.group({
                id: new FormControl(this.analise.id),
                pontuacaoFinal: new FormControl(0),
                comentarios: new FormControl(this.analise.comentarios, [Validators.required]),
                justificativa: new FormControl(this.analise.justificativa, [Validators.required]),
                pareceres: this.fb.array(
                    this.analise.pareceres.map((i) =>
                        this.fb.group({
                            parecerId: new FormControl(i.id),
                            criterioId: new FormControl(i.criterioId),
                            justificativa: new FormControl(i.justificativa, [Validators.required]),
                            peso: new FormControl(i.peso),
                            pontuacao: new FormControl(i.pontuacao),
                        })
                    )
                ),
            });
            this.calcular();
        });
    }

    calcular() {
        const analise = this.form.value as AnaliseTecnica;
        if (!analise || !analise.pareceres) {
            return 0;
        }
        const somaPontos = analise.pareceres.reduce((soma: number, parecer: ParecerTecnico) => soma + parecer.pontuacao * parecer.peso, 0);
        this.form.controls['pontuacaoFinal'].setValue(somaPontos);
        this.analise.pontuacaoFinal = somaPontos;
    }

    voltar() {
        this.router.navigate(['/analise-tecnica']).then();
    }

    salvar() {
        const analise = this.form.value as AnaliseTecnica;
        analise.propostaId = this.propostaId;
        this.service
            .salvarAnaliseTecnica(analise)
            .then(() => {
                this.app.alert('Análise Salva com Sucesso!');
                this.voltar();
            })
            .catch((e) => {
                this.app.alertError('Não foi possível salvar a Análise!');
            });
    }

    enviar() {
        if (this.form.valid) {
            const analise = this.form.value as AnaliseTecnica;
            analise.propostaId = this.propostaId;
            this.service
                .enviarAnaliseTecnica(analise)
                .then(() => {
                    this.app.alert('Análise Enviada com Sucesso!');
                    this.voltar();
                })
                .catch((e) => {
                    this.app.alertError('Não foi possível enviar a Análise!');
                });
        }
    }
}
