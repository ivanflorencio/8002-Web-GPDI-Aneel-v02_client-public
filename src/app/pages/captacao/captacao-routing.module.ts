import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaptacaoComponent } from '@app/pages/captacao/captacao.component';
import { CaptacoesResolver } from '@app/resolvers/captacoes.resolver';
import { ListComponent } from '@app/pages/captacao/list/list.component';
import { CaptacaoButtons, CaptacaoCols } from '@app/pages/captacao/commons';
import { RedirectByRoleComponent, RolePaths } from '@app/dashboard/shared/components';
import { UserRole } from '@app/commons';

const rolePaths: RolePaths = [
    { path: 'pendente', priority: 10, role: [UserRole.Administrador, UserRole.User] },
    { path: 'elaborar', priority: 10, role: UserRole.Suprimento },
];

const routes: Routes = [
    {
        path: '',
        component: CaptacaoComponent,
        children: [
            {
                path: '',
                //redirectTo: 'pendente',
                component: RedirectByRoleComponent,
                data: {
                    rolePaths,
                },
                pathMatch: 'full',
            },
            {
                path: 'pendente',
                component: ListComponent,
                resolve: {
                    captacoes: CaptacoesResolver,
                },
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                data: {
                    captacaoTable: {
                        cols: CaptacaoCols.Pendente,
                        buttons: CaptacaoButtons.Pendente,
                        status: 'Pendentes',
                    },
                },
            },
            {
                path: 'elaboracao',
                component: ListComponent,
                resolve: {
                    captacoes: CaptacoesResolver,
                },
                data: {
                    captacaoTable: {
                        cols: CaptacaoCols.EmElaboracao,
                        buttons: [],
                        status: 'Elaboracao',
                    },
                },
            },
            {
                path: 'elaborar',
                component: ListComponent,
                resolve: {
                    captacoes: CaptacoesResolver,
                },
                data: {
                    captacaoTable: {
                        cols: CaptacaoCols.EmElaboracao,
                        buttons: CaptacaoButtons.EmElaboracao,
                        status: 'ElaboracaoPendente',
                    },
                },
            },
            {
                path: 'aberta',
                component: ListComponent,
                resolve: {
                    captacoes: CaptacoesResolver,
                },
                data: {
                    captacaoTable: {
                        cols: CaptacaoCols.Aberta,
                        buttons: CaptacaoButtons.Aberta,
                        status: 'Abertas',
                    },
                },
            },
            {
                path: 'encerrada',
                component: ListComponent,
                resolve: {
                    captacoes: CaptacoesResolver,
                },
                data: {
                    captacaoTable: {
                        cols: CaptacaoCols.Encerrada,
                        buttons: CaptacaoButtons.Encerrada,
                        status: 'Encerradas',
                    },
                },
            },
            {
                path: 'cancelada',
                component: ListComponent,
                resolve: {
                    captacoes: CaptacoesResolver,
                },
                data: {
                    captacaoTable: {
                        cols: CaptacaoCols.Cancelada,
                        buttons: CaptacaoButtons.Cancelada,
                        status: 'Canceladas',
                    },
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CaptacaoRoutingModule {}
