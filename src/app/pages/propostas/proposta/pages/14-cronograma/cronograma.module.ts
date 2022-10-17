import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { CronogramaRoutingModule } from './cronograma-routing.module';
import { CronogramaComponent } from './cronograma.component';
import { CrudDataResolver, CrudItemResolver } from '@app/pages/propostas/proposta/resolvers';
import { PropostaServiceBase } from '@app/pages/propostas/proposta/services/proposta-service-base.service';

@NgModule({
    declarations: [CronogramaComponent],
    imports: [SharedModule, CronogramaRoutingModule],
    providers: [CrudItemResolver, CrudDataResolver, PropostaServiceBase.fromAppend('Cronograma')],
})
export class CronogramaModule {}
