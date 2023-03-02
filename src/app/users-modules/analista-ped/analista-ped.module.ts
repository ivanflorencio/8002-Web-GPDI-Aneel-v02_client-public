import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalistaPedRoutingModule } from './analista-ped-routing.module';
import { DashboardModule } from '@app/dashboard';
import { HEADER_MENU, ROOT_URL, SIDEBAR_MENU } from '@app/commons';
import { SidebarComponent } from '@app/dashboard/sidebar/sidebar.component';

@NgModule({
    declarations: [],
    imports: [CommonModule, DashboardModule, AnalistaPedRoutingModule],
    providers: [
        {
            provide: HEADER_MENU,
            useValue: [{ text: 'Meu Cadastro', icon: 'ta-user-o', path: '/meu-cadastro' }],
        },
        {
            provide: SIDEBAR_MENU,
            useValue: [{ subtitle: 'Projetos', text: 'Análise P&D', icon: 'ta-extrato', path: '/analise-ped' }],
        },
        {
            provide: ROOT_URL,
            useValue: `/`,
        },
    ],
})
export class AnalistaPedModule {}
