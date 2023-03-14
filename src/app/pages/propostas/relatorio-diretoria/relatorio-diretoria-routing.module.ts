/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropostaRelatorioDiretoriaComponent } from './relatorio-diretoria.component';
import resolvers from './relatorio-diretoria.resolver';

const routes: Routes = [
    {
        path: 'manter/:id',
        resolve: {
            relatorio: resolvers.relatorios,
            shortcodes: resolvers.shortcodes,
        },
        component: PropostaRelatorioDiretoriaComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RelatorioDiretoriaRoutingModule {}
