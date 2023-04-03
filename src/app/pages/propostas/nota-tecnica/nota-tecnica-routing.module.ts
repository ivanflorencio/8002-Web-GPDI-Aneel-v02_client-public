/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropostaNotaTecnicaComponent } from './nota-tecnica.component';
import resolvers from './nota-tecnica.resolver';

const routes: Routes = [
    {
        path: 'manter/:id',
        resolve: {
            relatorio: resolvers.relatorios,
            shortcodes: resolvers.shortcodes,
        },
        component: PropostaNotaTecnicaComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotaTecnicaRoutingModule {}
