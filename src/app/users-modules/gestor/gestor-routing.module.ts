import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@app/dashboard';
import {
    CaptacoesRoute,
    DemandasRoute,
    MeuCadastroRoute,
    NotFoundRoute,
    ProjetosRoute,
    PropostaFormalizacaoRoute,
    PropostaRefinamentoRoute,
    PropostaRiscosRoute,
    SuprimentoRoutes,
    AnalistaTecnicoRoutes,
    GestaoPeDRoute,
    CronogramaConsolidadoRoute,
    PropostaSelecaoRoute,
    RedirectRoute,
} from '@app/routes';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            RedirectRoute('demandas'),
            MeuCadastroRoute,
            DemandasRoute,
            CaptacoesRoute,
            {
                path: 'suprimentos/captacoes',
                loadChildren: () => import('../suprimento/captacoes/captacoes.module').then((m) => m.CaptacoesModule),
            },
            PropostaSelecaoRoute,
            PropostaRefinamentoRoute,
            PropostaRiscosRoute,
            PropostaFormalizacaoRoute,
            ProjetosRoute,
            GestaoPeDRoute,
            CronogramaConsolidadoRoute,
            NotFoundRoute,
            SuprimentoRoutes[0],
            AnalistaTecnicoRoutes[0],
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GestorRoutingModule {}
