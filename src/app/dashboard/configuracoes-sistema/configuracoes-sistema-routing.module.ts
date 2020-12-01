import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {EquipeComponent} from './equipe/equipe.component';
import {ConfiguracoesSistemaComponent} from './configuracoes-sistema.component';
import {FormEditorComponent} from '@app/dashboard/configuracoes-sistema/form-editor/form-editor.component';
import {PadraoFormulariosComponent} from './padrao-formularios/padrao-formularios.component';
import {ContratosPadraoComponent} from './contratos-padrao/contratos-padrao.component';
import {ContratoPadraoFormComponent} from './contratos-padrao/contrato-padrao-form/contrato-padrao-form.component';
import {ContratoBaseComponent} from './contrato-base/contrato-base.component';
import {FornecedoresComponent} from './fornecedores/fornecedores.component';
import {FornecedorFormComponent} from './fornecedores/fornecedor-form/fornecedor-form.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracoesSistemaComponent,
    children: [
      {
        path: '',
        redirectTo: 'equipe-ped',
        pathMatch: 'full',
      },
      {
        path: 'equipe-ped',
        component: EquipeComponent
      },
      {
        path: 'padrao-formularios',
        component: PadraoFormulariosComponent
      },
      {
        path: 'padrao-formularios/:key',
        component: FormEditorComponent
      },
      {
        path: 'contratos-padrao',
        loadChildren: () => import('./contratos-padrao/contratos-padrao.module').then(m => m.ContratosPadraoModule)
      },

      {
        path: 'contrato-base',
        component: ContratoBaseComponent
      },
      {
        path: 'fornecedores',
        component: FornecedoresComponent
      },
      {
        path: 'fornecedores/novo',
        component: FornecedorFormComponent
      },
      {
        path: 'fornecedores/editar/:id',
        component: FornecedorFormComponent
      }
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracoesSistemaRoutingModule {
}
