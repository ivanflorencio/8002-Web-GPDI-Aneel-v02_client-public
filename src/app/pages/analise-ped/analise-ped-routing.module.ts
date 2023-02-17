import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalisePedComponent } from './analise-ped.component';
import { ParecerPedFormComponent } from './parecer-ped-form/parecer-ped-form.component';

const routes: Routes = [
    {
        path: '',
        component: AnalisePedComponent,
        resolve: {},
    },
    {
        path: 'parecer-ped/:propostaId',
        component: ParecerPedFormComponent,
        resolve: {},
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AnalisePedRoutingModule {}
