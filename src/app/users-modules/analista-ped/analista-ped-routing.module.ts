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
            RedirectRoute('analise-ped'),
            MeuCadastroRoute,
            {
                path: 'analise-ped',
                component: SidebarComponent,
                loadChildren: () => import('../../pages/analise-ped/analise-ped.module').then((m) => m.AnalisePedModule),
            },
            NotFoundRoute,
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AnalistaPedRoutingModule {}
