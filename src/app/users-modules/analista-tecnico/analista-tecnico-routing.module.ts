import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@app/dashboard';
import { SidebarComponent } from '@app/dashboard/sidebar/sidebar.component';
import { MeuCadastroRoute, NotFoundRoute, RedirectRoute } from '@app/routes';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            RedirectRoute('analise-tecnica'),
            MeuCadastroRoute,
            {
                path: 'analise-tecnica',
                component: SidebarComponent,
                loadChildren: () => import('../../pages/analise-tecnica/analise-tecnica.module').then((m) => m.AnaliseTecnicaModule),
            },
            NotFoundRoute,
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AnalistaTecnicoRoutingModule {}
