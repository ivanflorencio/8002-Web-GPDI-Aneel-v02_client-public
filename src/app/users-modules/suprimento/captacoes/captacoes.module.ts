import { NgModule } from '@angular/core';

import { CaptacoesRoutingModule } from './captacoes-routing.module';
import { SharedModule } from '@app/dashboard/shared/shared.module';
import { ServiceBase } from '@app/services/service-base.service';
import { HttpClient } from '@angular/common/http';
import { CaptacoesResolver } from '@app/resolvers/captacoes.resolver';
import { DirectivesModule } from '@app/dashboard/shared/directives';
import { CaptacoesComponent } from '@app/users-modules/suprimento/captacoes/captacoes.component';
import { TOPNAV_MENU } from '@app/commons';
import { DashboardModule } from '@app/dashboard';
import { ListComponent } from './list.component';

@NgModule({
    declarations: [CaptacoesComponent, CaptacoesComponent, ListComponent],
    imports: [SharedModule, DirectivesModule, CaptacoesRoutingModule, DashboardModule],
    providers: [
        CaptacoesResolver,
        { provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Captacoes') },
        {
            provide: TOPNAV_MENU,
            useValue: [
                { text: 'Pendentes', path: `/suprimentos/captacoes/pendentes` },
                { text: 'Abertas', path: `/suprimentos/captacoes/abertas` },
                { text: 'Finalizadas', path: `/suprimentos/captacoes/finalizadas` },
                { text: 'Canceladas', path: `/suprimentos/captacoes/canceladas` },
            ],
        },
    ],
})
export class CaptacoesModule {}
