import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestorRoutingModule } from './gestor-routing.module';
import { DashboardModule } from '@app/dashboard';
import { HEADER_MENU, ROOT_URL, SIDEBAR_MENU } from '@app/commons';
import { PROPOSTA_CAN_EDIT } from '@app/pages/propostas/proposta/shared';
import { HeaderMenu, ProjetoExecucaoMenu, ProjetoFinalizadoMenu, SidebarMenu } from './menus';
import { PropostaTextsProvider } from '@app/users-modules/shared/texts';
import { ProvidePermissions } from '@app/core/shared';
import { CaptacoesService } from './services/captacoes.service';
import { CaptacaoResolver } from './resolvers/captacao.resolver';
import { CaptacoesResolver } from './resolvers/captacoes.resolver';

@NgModule({
    declarations: [],
    imports: [CommonModule, DashboardModule, GestorRoutingModule],
    providers: [
        CaptacoesService,
        CaptacaoResolver,
        CaptacoesResolver,
        SidebarMenu,
        HeaderMenu,
        ProjetoExecucaoMenu,
        ProjetoFinalizadoMenu,
        {
            provide: ROOT_URL,
            useValue: ``,
        },
        {
            provide: SIDEBAR_MENU,
            useValue: [{ subtitle: 'Suprimentos', text: 'Captação de Propostas', icon: 'ta-extrato', path: '/captacoes' }],
        },
        {
            provide: HEADER_MENU,
            useValue: [{ text: 'Meu Cadastro', icon: 'ta-user-o', path: '/meu-cadastro' }],
        },
        {
            provide: ROOT_URL,
            useValue: `/`,
        },
        PropostaTextsProvider,
        ProvidePermissions('enviar-captacao'),
    ],
})
export class GestorModule {}
