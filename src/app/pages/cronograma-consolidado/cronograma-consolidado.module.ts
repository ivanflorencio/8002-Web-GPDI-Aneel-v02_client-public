import { NgModule } from '@angular/core';

import { CronogramaConsolidadoRoutingModule } from './cronograma-consolidado-routing.module';
import { CronogramaConsolidadoComponent } from './cronograma-consolidado.component';
import { ProjetoService } from '../projetos/projeto/services/projeto.service';
import { CronogramaConsolidadoResolver } from '@app/resolvers/cronograma-consolidado.resolver';
import { ComponentsModule } from '@app/components';

@NgModule({
    declarations: [CronogramaConsolidadoComponent],
    imports: [CronogramaConsolidadoRoutingModule, ComponentsModule],
    providers: [ProjetoService, CronogramaConsolidadoResolver],
})
export class CronogramaConsolidadoModule {}
