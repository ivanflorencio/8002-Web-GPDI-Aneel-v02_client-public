import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalistaTecnicoRoutingModule } from './analista-tecnico-routing.module';
import { DashboardModule } from '@app/dashboard';
import { HEADER_MENU, ROOT_URL, SIDEBAR_MENU } from '@app/commons';

@NgModule({
    declarations: [],
    imports: [CommonModule, DashboardModule, AnalistaTecnicoRoutingModule],
    providers: [
        {
            provide: HEADER_MENU,
            useValue: [{ text: 'Meu Cadastro44', icon: 'ta-user-o', path: '/meu-cadastro' }],
        },
        {
            provide: SIDEBAR_MENU,
            useValue: [{ subtitle: 'Projetos', text: 'Análise Técnica', icon: 'ta-extrato', path: '/analise-tecnica' }],
        },
        {
            provide: ROOT_URL,
            useValue: `/`,
        },
    ],
})
export class AnalistaTecnicoModule {}
