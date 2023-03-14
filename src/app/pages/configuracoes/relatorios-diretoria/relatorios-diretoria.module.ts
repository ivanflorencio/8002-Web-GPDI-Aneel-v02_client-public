/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosDiretoriaRoutingModule } from './relatorios-diretoria-routing.module';
import { RelatoriosDiretoriaComponent } from '@app/pages/configuracoes/relatorios-diretoria/relatorios-diretoria.component';
import { RelatorioDiretoriaFormComponent } from '@app/pages/configuracoes/relatorios-diretoria/relatorio-diretoria-form/relatorio-diretoria-form.component';
import { ServiceBase } from '@app/services/service-base.service';
import { HttpClient } from '@angular/common/http';
import { RelatoriosDiretoriaResolver } from '@app/resolvers/relatorios-diretoria.resolver';
import { RelatorioDiretoriaResolver } from '@app/resolvers/relatorio-diretoria.resolver';
import { CoreModule } from '@app/core';
import { RelatoriosDiretoriaShortcodesResolver } from './relatorios-diretoria-shortcodes.resolver';

@NgModule({
    declarations: [RelatoriosDiretoriaComponent, RelatorioDiretoriaFormComponent],
    imports: [CommonModule, CoreModule, RelatoriosDiretoriaRoutingModule],
    providers: [
        RelatoriosDiretoriaResolver,
        RelatorioDiretoriaResolver,
        RelatoriosDiretoriaShortcodesResolver,
        {
            provide: ServiceBase,
            deps: [HttpClient],
            useFactory: (httpClient) => new ServiceBase(httpClient, 'Sistema/RelatoriosDiretoria'),
        },
    ],
})
export class RelatoriosDiretoriaModule {}
