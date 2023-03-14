/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioDiretoriaRoutingModule } from './relatorio-diretoria-routing.module';
import { PropostaRelatorioDiretoriaComponent } from './relatorio-diretoria.component';
import { ServiceBase } from '@app/services/service-base.service';
import { HttpClient } from '@angular/common/http';
import { RelatoriosDiretoriaResolver } from '@app/resolvers/relatorios-diretoria.resolver';
import { RelatorioDiretoriaResolver } from '@app/resolvers/relatorio-diretoria.resolver';
import { CoreModule } from '@app/core';
import resolvers from './relatorio-diretoria.resolver';

@NgModule({
    declarations: [PropostaRelatorioDiretoriaComponent],
    imports: [CommonModule, CoreModule, RelatorioDiretoriaRoutingModule],
    providers: [
        RelatoriosDiretoriaResolver,
        RelatorioDiretoriaResolver,
        resolvers.shortcodes,
        resolvers.relatorios,
        {
            provide: ServiceBase,
            deps: [HttpClient],
            useFactory: (httpClient) => new ServiceBase(httpClient, 'Sistema/RelatoriosDiretoria'),
        },
    ],
})
export class RelatoriosDiretoriaModule {}
