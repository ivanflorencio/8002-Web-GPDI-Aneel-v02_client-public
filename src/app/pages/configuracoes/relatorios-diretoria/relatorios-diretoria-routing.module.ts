/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelatorioDiretoriaFormComponent } from '@app/pages/configuracoes/relatorios-diretoria/relatorio-diretoria-form/relatorio-diretoria-form.component';
import { RelatoriosDiretoriaComponent } from '@app/pages/configuracoes/relatorios-diretoria/relatorios-diretoria.component';
import { RelatoriosDiretoriaResolver } from '@app/resolvers/relatorios-diretoria.resolver';
import { RelatorioDiretoriaResolver } from '@app/resolvers/relatorio-diretoria.resolver';
import { RelatoriosDiretoriaShortcodesResolver } from './relatorios-diretoria-shortcodes.resolver';

const routes: Routes = [
    {
        path: '',
        resolve: {
            contratos: RelatoriosDiretoriaResolver,
        },
        component: RelatoriosDiretoriaComponent,
    },
    {
        path: 'novo',
        component: RelatorioDiretoriaFormComponent,
        resolve: {
            shortcodes: RelatoriosDiretoriaShortcodesResolver,
        },
    },
    {
        path: 'editar/:id',
        resolve: {
            contrato: RelatorioDiretoriaResolver,
            shortcodes: RelatoriosDiretoriaShortcodesResolver,
        },
        component: RelatorioDiretoriaFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RelatoriosDiretoriaRoutingModule {}
