import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { ServiceBase } from '@app/services/service-base.service';
import { HttpClient } from '@angular/common/http';
import { TabelasComponent } from '@app/pages/configuracoes/tabelas/tabelas.component';
import { TabelasRoutingModule } from '@app/pages/configuracoes/tabelas/tabelas-routing.module';
import { ListResolver } from '@app/resolvers/list.resolver';
import { ItemResolver } from '@app/resolvers/item.resolver';
import { TabelasFormComponent } from '@app/pages/configuracoes/tabelas/tabela-form/tabelas-form.component';

@NgModule({
    declarations: [TabelasComponent, TabelasFormComponent],
    imports: [CommonModule, SharedModule, TabelasRoutingModule],
    providers: [
        { provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Sistema/TabelasValorHora') },
        ListResolver,
        ItemResolver,
    ],
})
export class TabelasModule {}
