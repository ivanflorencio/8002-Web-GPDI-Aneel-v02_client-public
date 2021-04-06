import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {AdminRootUrl} from '@app/routes/routes';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    AdminRoutingModule
  ],
  providers: [
    {
      provide: SIDEBAR_MENU,
      useValue: [
        {text: 'Gestão de Demandas', icon: 'ta-projeto', path: `/${AdminRootUrl}/demandas`},
        {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: `/${AdminRootUrl}/captacoes`},
        {text: 'Projetos - Priorização e Seleção', icon: 'ta-file-check', path: `/${AdminRootUrl}/propostas`},
        {text: 'Configurações do Sistema', icon: 'ta-gear', path: `/${AdminRootUrl}/configuracoes`},
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Gerenciar Usuários', icon: 'ta-group', path: `/${AdminRootUrl}/gerenciar-usuarios`},
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: `/${AdminRootUrl}/meu-cadastro`}
      ]
    }, {
      provide: ROOT_URL,
      useValue: `/${AdminRootUrl}`
    }
  ]
})
export class AdminModule {
}
