import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@app/dashboard';
import {
    CaptacoesRoute,
    ConfiguracaoRoute,
    DemandasRoute,
    GerenciarUsuariosRoute,
    MeuCadastroRoute,
    GestaoPeDRoute,
    AnaliseTecnicaRoute,
    AnalisePedRoute,
    CronogramaConsolidadoRoute,
    NotFoundRoute,
    ProjetosRoute,
    PropostaFormalizacaoRoute,
    PropostaRefinamentoRoute,
    PropostaRiscosRoute,
    PropostaRelatorioDiretoriaRoute,
    PropostaSelecaoRoute,
    RedirectRoute,
} from '@app/routes/routes';
import { GestaoPeD } from '../shared/menus';

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
            PropostaRelatorioDiretoriaRoute,
            PropostaFormalizacaoRoute,
            ProjetosRoute,
            ConfiguracaoRoute,
            GestaoPeDRoute,
            AnaliseTecnicaRoute,
            AnalisePedRoute,
            CronogramaConsolidadoRoute,
            GerenciarUsuariosRoute,
            NotFoundRoute,
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
