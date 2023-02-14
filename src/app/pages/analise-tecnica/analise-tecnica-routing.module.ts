import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnaliseTecnicaComponent } from './analise-tecnica.component';
import { ParecerFormComponent } from './parecer-form/parecer-form.component';

const routes: Routes = [
    {
        path: '',
        component: AnaliseTecnicaComponent,
        resolve: {},
    },
    {
        path: 'parecer/:propostaId',
        component: ParecerFormComponent,
        resolve: {},
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AnaliseTecnicaRoutingModule {}
