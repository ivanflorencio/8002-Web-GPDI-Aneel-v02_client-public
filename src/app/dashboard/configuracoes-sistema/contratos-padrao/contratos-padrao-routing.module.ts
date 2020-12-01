import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContratoPadraoFormComponent} from '@app/dashboard/configuracoes-sistema/contratos-padrao/contrato-padrao-form/contrato-padrao-form.component';
import {ContratosPadraoComponent} from '@app/dashboard/configuracoes-sistema/contratos-padrao/contratos-padrao.component';
import {ContratosPadraoResolver} from '@app/dashboard/configuracoes-sistema/contratos-padrao/contratos-padrao.resolver';
import {ContratoPadraoResolver} from '@app/dashboard/configuracoes-sistema/contratos-padrao/contrato-padrao.resolver';


const routes: Routes = [
  {
    path: '',
    resolve: {
      contratos: ContratosPadraoResolver,
    },
    component: ContratosPadraoComponent
  },
  {
    path: 'novo',
    component: ContratoPadraoFormComponent
  },
  {
    path: 'editar/:id',
    resolve: {
      contrato: ContratoPadraoResolver
    },
    component: ContratoPadraoFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratosPadraoRoutingModule {
}
