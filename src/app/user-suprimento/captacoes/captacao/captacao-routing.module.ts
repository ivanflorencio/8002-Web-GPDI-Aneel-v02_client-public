import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CaptacaoComponent} from '@app/user-suprimento/captacoes/captacao/captacao.component';
import {ConfiguracaoComponent} from '@app/user-suprimento/captacoes/captacao/configuracao/configuracao.component';
import {DetalhesComponent} from '@app/user-suprimento/captacoes/captacao/detalhes/detalhes.component';
import {PropostasComponent} from '@app/user-suprimento/captacoes/captacao/propostas/propostas.component';
import {ContratosPadroesResolver} from '@app/resolvers/contratos-padroes.resolver';
import {FornecedoresResolver} from '@app/resolvers/fornecedores.resolver';
import {PropostasResolver} from '@app/user-suprimento/resolvers/propostas.resolver';
import {ListComponent} from '@app/user-suprimento/captacoes/captacao/propostas/list.component';
import {PropostaDetalhesResolver} from '@app/user-suprimento/captacoes/captacao/proposta-detalhes.resolver';


const routes: Routes = [
  {
    path: '',
    component: CaptacaoComponent,
    children: [
      {
        path: '',
        redirectTo: 'detalhes'
      },
      {
        path: 'detalhes',
        component: DetalhesComponent
      },
      {
        path: 'configuracao',
        component: ConfiguracaoComponent,
        resolve: {
          contratos: ContratosPadroesResolver,
          fornecedores: FornecedoresResolver
          // arquivos,
        }
      },
      {
        path: 'propostas',
        component: PropostasComponent,
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'em-aberto'},
          {
            path: ':status',
            component: ListComponent,
            resolve: {
              propostas: PropostasResolver,
              proposta: PropostaDetalhesResolver
            },
            runGuardsAndResolvers: (from, to) => !to.fragment || !isNaN(parseFloat(to.fragment))

          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptacaoRoutingModule {
}
