import { AppService } from '@app/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-configuracoes-sistema',
    templateUrl: './configuracoes-sistema.component.html',
    styleUrls: ['./configuracoes-sistema.component.scss'],
})
export class ConfiguracoesSistemaComponent implements OnInit {
    tabs: Array<any>;
    i: number;
    adp = 1;

    constructor(protected app: AppService) {}

    ngOnInit() {
        this.tabs = [
            { text: 'Aprovadores', path: 'equipe' },
            { text: 'Padrão Formulários', path: 'padrao-formularios' },
            { text: 'Contratos Padrão', path: 'contratos-padrao' },
            { text: 'Condições Fundamentais', path: 'clausulas' },
            { text: 'Fornecedores', path: 'fornecedores' },
            { text: 'Configuração Captações', path: 'config-captacoes' },
            { text: 'Tabelas Hora/Valor', path: 'tabelas' },
            { text: 'Fornecedores', path: 'fornecedores' },
            { text: 'Banco de Ajuda', path: 'ajuda' },
        ];
    }
}
