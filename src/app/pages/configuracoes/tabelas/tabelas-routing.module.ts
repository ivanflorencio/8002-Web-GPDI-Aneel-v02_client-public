import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelasComponent } from '@app/pages/configuracoes/tabelas/tabelas.component';
import { ListResolver } from '@app/resolvers/list.resolver';

const routes: Routes = [
    {
        path: '',
        resolve: {
            tabelasValorHora: ListResolver,
        },
        component: TabelasComponent,
    },
    // ...
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabelasRoutingModule {}
