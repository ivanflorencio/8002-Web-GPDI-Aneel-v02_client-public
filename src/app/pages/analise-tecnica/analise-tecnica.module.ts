import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnaliseTecnicaRoutingModule } from './analise-tecnica-routing.module';
import { AnaliseTecnicaComponent } from '@app/pages/analise-tecnica/analise-tecnica.component';
import { CoreModule } from '@app/core';
import { CriterioAvaliacaoFormComponent } from './criterio-avaliacao-form/criterio-avaliacao-form.component';
import { ParecerFormComponent } from './parecer-form/parecer-form.component';
import { AnaliseTecnicaDetalhesComponent } from './analise-tecnica-detalhes/analise-tecnica-detalhes.component';

@NgModule({
    declarations: [AnaliseTecnicaComponent, CriterioAvaliacaoFormComponent, ParecerFormComponent, AnaliseTecnicaDetalhesComponent],
    imports: [CommonModule, CoreModule, AnaliseTecnicaRoutingModule],
})
export class AnaliseTecnicaModule {}
