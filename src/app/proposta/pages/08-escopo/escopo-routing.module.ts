import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EscopoComponent} from '@app/proposta/pages/08-escopo/escopo.component';
import {EscopoResolver} from '@app/proposta/resolvers';


const routes: Routes = [
  {
    path: '',
    component: EscopoComponent,
    resolve: {
      escopo: EscopoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscopoRoutingModule {
}
