import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "@app/dashboard";
import {
  CaptacoesRoute,
  ConfiguracaoRoute,
  DemandasRoute,
  GerenciarUsuariosRoute,
  MeuCadastroRoute,
  GestaoPeDRoute,
  NotFoundRoute,
  ProjetosRoute,
  PropostaFormalizacaoRoute,
  PropostaRefinamentoRoute,
  PropostaRiscosRoute,
  PropostaSelecaoRoute,
  RedirectRoute,
} from "@app/routes/routes";
import { GestaoPeD } from "../shared/menus";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      RedirectRoute("demandas"),
      MeuCadastroRoute,
      DemandasRoute,
      CaptacoesRoute,
      PropostaSelecaoRoute,
      PropostaRefinamentoRoute,
      PropostaRiscosRoute,
      PropostaFormalizacaoRoute,
      ProjetosRoute,
      ConfiguracaoRoute,
      GestaoPeDRoute,
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
