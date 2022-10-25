import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { DashboardModule } from '@app/dashboard';
import { ROOT_URL } from '@app/commons';
import { PROPOSTA_CAN_EDIT } from '@app/pages/propostas/proposta/shared';
import { HeaderMenu, ProjetoExecucaoMenu, ProjetoFinalizadoMenu, SidebarMenu } from './menus';
import { PropostaTextsProvider } from '@app/users-modules/shared/texts';
import { ProvidePermissions } from '@app/core/shared';
import { CaptacoesService } from '@app/users-modules/suprimento/services/captacoes.service';
import { CaptacaoResolver } from '@app/users-modules/suprimento/resolvers/captacao.resolver';
import { CaptacoesResolver } from '@app/users-modules/suprimento/resolvers/captacoes.resolver';

@NgModule({
    declarations: [],
    imports: [CommonModule, DashboardModule, AdminRoutingModule],
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
        PropostaTextsProvider,
        ProvidePermissions('enviar-captacao'),
    ],
})
export class AdminModule {}
