import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnaliseTecnicaRoutingModule } from './analise-tecnica-routing.module';
import { AnaliseTecnicaComponent } from '@app/pages/analise-tecnica/analise-tecnica.component';
import { CoreModule } from '@app/core';
import { CriterioAvaliacaoFormComponent } from './criterio-avaliacao-form/criterio-avaliacao-form.component';

@NgModule({
    declarations: [AnaliseTecnicaComponent, CriterioAvaliacaoFormComponent],
    imports: [CommonModule, CoreModule, AnaliseTecnicaRoutingModule],
})
export class AnaliseTecnicaModule {}
