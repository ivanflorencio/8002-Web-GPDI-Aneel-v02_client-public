import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalisePedRoutingModule } from './analise-ped-routing.module';
import { AnalisePedComponent } from '@app/pages/analise-ped/analise-ped.component';
import { CoreModule } from '@app/core';
import { ParecerPedFormComponent } from './parecer-ped-form/parecer-ped-form.component';
import { AnalisePedDetalhesComponent } from './analise-ped-detalhes/analise-ped-detalhes.component';

@NgModule({
    declarations: [AnalisePedComponent, ParecerPedFormComponent, AnalisePedDetalhesComponent],
    imports: [CommonModule, CoreModule, AnalisePedRoutingModule],
})
export class AnalisePedModule {}
