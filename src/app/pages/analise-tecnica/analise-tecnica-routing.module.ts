import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnaliseTecnicaComponent } from './analise-tecnica.component';

const routes: Routes = [
    {
        path: '',
        component: AnaliseTecnicaComponent,
        resolve: {},
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AnaliseTecnicaRoutingModule {}
