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
        public app: AppService,
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
        this.analise.pontuacaoFinal = somaPontos / 4;
        this.analise.conceito = this.calcularConceito(somaPontos / 4);

        this.form.controls['pontuacaoFinal'].setValue(this.analise.pontuacaoFinal);
        this.form.controls['conceito'].setValue(this.analise.conceito);
    }

    calcularConceito(pontos: number) {
        console.log(this.form.controls['pontuacaoFinal'].value);
        let conceito = '';
        if ((pontos > 1 && pontos < 2) || this.form.controls['pontuacaoOriginalidade'].value <= 1) {
            conceito = 'Inadequado';
        } else if (pontos >= 2 && pontos < 3) {
            conceito = 'Insuficiente';
        } else if (pontos >= 3 && pontos < 3.5) {
            conceito = 'Aceitável';
        } else if (pontos >= 3.5 && pontos < 4.5) {
            conceito = 'Bom';
        } else if (pontos >= 4.5 && pontos < 5) {
            conceito = 'Excelente';
        }
        return conceito;
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

    mostrarCriteriosConceito() {
        this.app.alert(
            `<table class="table">
                <thead>
                    <tr>
                        <th>Média do Projeto (N)</th>
                        <th>Conceito do Projeto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1,0 &lt; N &lt; 2,0</td>
                        <td>Inadequado*</td>
                    </tr>
                    <tr>
                        <td>2,0 &le; N &lt; 3,0</td>
                        <td>Insuficiênte</td>
                    </tr>
                    <tr>
                        <td>3,0 &le; N &lt; 3,5</td>
                        <td>Aceitável</td>
                    </tr>
                    <tr>
                        <td>3,5 &le; N &lt; 4,5</td>
                        <td>Bom</td>
                    </tr>
                    <tr>
                        <td>4,5 &le; N &lt; 5,0</td>
                        <td>Excelente</td>
                    </tr>
                </tbody>
            </table>
            <p>* Considera-se <b>Inadequado</b> também quando o item <i><b>Originalidade</b></i> tem o valor menor que 1.</p>`,
            'Conceito do Projeto'
        );
    }
}
