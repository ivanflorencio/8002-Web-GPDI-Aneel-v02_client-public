import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipeComponent } from './equipe/equipe.component';
import { ConfiguracoesSistemaComponent } from './configuracoes-sistema.component';
import { FormEditorComponent } from '@app/pages/configuracoes/form-editor/form-editor.component';
import { PadraoFormulariosComponent } from './padrao-formularios/padrao-formularios.component';

const routes: Routes = [
    {
        path: '',
        component: ConfiguracoesSistemaComponent,
        children: [
            {
                path: '',
                redirectTo: 'equipe',
                pathMatch: 'full',
            },
            {
                path: 'equipe',
                component: EquipeComponent,
            },
            {
                path: 'padrao-formularios',
                component: PadraoFormulariosComponent,
            },
            {
                path: 'padrao-formularios/:key',
                component: FormEditorComponent,
            },
            {
                path: 'contratos-padrao',
                loadChildren: () => import('./contratos-padrao/contratos-padrao.module').then((m) => m.ContratosPadraoModule),
            },
            {
                path: 'relatorios-diretoria',
                loadChildren: () => import('./relatorios-diretoria/relatorios-diretoria.module').then((m) => m.RelatoriosDiretoriaModule),
            },
            {
                path: 'clausulas',
                loadChildren: () => import('./clausulas/clausulas.module').then((m) => m.ClausulasModule),
            },
            {
                path: 'fornecedores',
                loadChildren: () => import('./fornecedores/fornecedores.module').then((m) => m.FornecedoresModule),
            },
            {
                path: 'tabelas',
                loadChildren: () => import('./tabelas/tabelas.module').then((m) => m.TabelasModule),
            },
            {
                path: 'ajuda',
                loadChildren: () => import('./ajuda/ajuda.module').then((m) => m.AjudaModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConfiguracoesSistemaRoutingModule {}
