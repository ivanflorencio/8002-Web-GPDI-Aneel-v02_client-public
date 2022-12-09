import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestaoPeDComponent } from './gestao-ped.component';

const routes: Routes = [
    {
        path: '',
        component: GestaoPeDComponent,
        resolve: {},
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GestaoPeDRoutingModule {}
