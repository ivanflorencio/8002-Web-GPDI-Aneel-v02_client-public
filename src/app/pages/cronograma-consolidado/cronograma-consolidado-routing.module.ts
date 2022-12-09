import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CronogramaConsolidadoResolver } from '@app/resolvers/cronograma-consolidado.resolver';
import { CronogramaConsolidadoComponent } from './cronograma-consolidado.component';

const routes: Routes = [
    {
        path: '',
        component: CronogramaConsolidadoComponent,
        resolve: {
            extrato: CronogramaConsolidadoResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CronogramaConsolidadoRoutingModule {}
