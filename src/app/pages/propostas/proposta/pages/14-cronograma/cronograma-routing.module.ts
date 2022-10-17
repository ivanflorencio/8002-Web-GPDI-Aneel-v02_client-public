import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CronogramaComponent } from '@app/pages/propostas/proposta/pages/14-cronograma/cronograma.component';
import { CrudDataResolver, CrudItemResolver } from '@app/pages/propostas/proposta/resolvers';

const routes: Routes = [
    {
        path: '',
        component: CronogramaComponent,
        resolve: {
            item: CrudItemResolver,
            data: CrudDataResolver,
        },
        runGuardsAndResolvers: (from, to) => to.fragment !== 'novo',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CronogramaRoutingModule {}
