/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AnalisePed, AnalisesService, AnaliseTecnica } from '@app/services/analises.service';
import { AppService } from '@app/services';

@Component({
    selector: 'app-analise-ped-detalhes',
    templateUrl: './analise-ped-detalhes.component.html',
    styleUrls: ['./analise-ped-detalhes.component.scss'],
})
export class AnalisePedDetalhesComponent implements OnInit {
    route: ActivatedRoute;
    propostaId: number;
    analise: AnalisePed;

    constructor(public activeModal: NgbActiveModal, protected service: AnalisesService, protected app: AppService) {}

    ngOnInit(): void {
        this.service
            .abrirAnalisePedProposta(this.propostaId)
            .then((result) => {
                this.analise = result as AnalisePed;
            })
            .catch((e) => {
                this.app.alertError('Não foi possível abrir a Análise Técnica');
            });
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
