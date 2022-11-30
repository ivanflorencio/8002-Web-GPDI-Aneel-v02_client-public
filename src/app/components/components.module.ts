import { NgModule } from '@angular/core';
import { ViewContratoComponent } from '@app/components/view-contrato/view-contrato.component';
import { CoreModule } from '@app/core';
import { CronogramaFinanceiroComponent } from '@app/components/cronograma-financeiro/cronograma-financeiro.component';

@NgModule({
    declarations: [ViewContratoComponent, CronogramaFinanceiroComponent],
    imports: [CoreModule],
    exports: [ViewContratoComponent, CronogramaFinanceiroComponent],
})
export class ComponentsModule {}
