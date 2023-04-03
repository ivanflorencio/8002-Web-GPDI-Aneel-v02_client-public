/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotaTecnicaRoutingModule } from './nota-tecnica-routing.module';
import { PropostaNotaTecnicaComponent } from './nota-tecnica.component';
import { ServiceBase } from '@app/services/service-base.service';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from '@app/core';
import resolvers from './nota-tecnica.resolver';
import { NotasTecnicasResolver } from '@app/resolvers/notas-tecnicas.resolver';
import { NotaTecnicaResolver } from '@app/resolvers/nota-tecnica.resolver';

@NgModule({
    declarations: [PropostaNotaTecnicaComponent],
    imports: [CommonModule, CoreModule, NotaTecnicaRoutingModule],
    providers: [
        NotasTecnicasResolver,
        NotaTecnicaResolver,
        resolvers.shortcodes,
        resolvers.relatorios,
        {
            provide: ServiceBase,
            deps: [HttpClient],
            useFactory: (httpClient) => new ServiceBase(httpClient, 'Proposta/NotaTecnica'),
        },
    ],
})
export class NotaTecnicaModule {}
