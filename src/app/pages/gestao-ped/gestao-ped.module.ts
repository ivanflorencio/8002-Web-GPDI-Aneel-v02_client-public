import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GestaoPeDRoutingModule } from "./gestao-ped-routing.module";
import { GestaoPeDComponent } from "@app/pages/gestao-ped/gestao-ped.component";
import { CoreModule } from "@app/core";

@NgModule({
  declarations: [GestaoPeDComponent],
  imports: [CommonModule, CoreModule, GestaoPeDRoutingModule],
})
export class GestaoPeDModule {}
