/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopnavComponent } from '@app/dashboard/topnav/topnav.component';
import { ProrrogarComponent } from '@app/pages/projetos/projeto/alterar-projeto/prorrogar/prorrogar.component';
import { RecursosHumanosComponent } from '@app/pages/projetos/projeto/alterar-projeto/recursos-humanos/recursos-humanos.component';
import { RecursosMateriaisComponent } from '@app/pages/projetos/projeto/alterar-projeto/recursos-materiais/recursos-materiais.component';

import { AlocacaoRecursosHumanosComponent } from '@app/pages/projetos/projeto/alterar-projeto/alocacao-recursos-humanos/alocacao-recursos-humanos.component';
import { AlocacaoRecursosMateriaisComponent } from '@app/pages/projetos/projeto/alterar-projeto/alocacao-recursos-materiais/alocacao-recursos-materiais.component';
import { EtapasComponent } from '@app/pages/projetos/projeto/alterar-projeto/etapas/etapas.component';

import { CategoriasContabeisResolver } from '@app/resolvers/categorias-contabeis.resolver';
import { EmpresasResolver } from '@app/pages/propostas/proposta/resolvers';

const routes: Routes = [
    {
        path: '',
        component: TopnavComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'prorrogar',
            },
            {
                path: 'prorrogar',
                component: ProrrogarComponent,
                resolve: {
                    produtos: 'projetoProdutos',
                },
            },
            {
                path: 'recursos-humanos',
                component: RecursosHumanosComponent,
                runGuardsAndResolvers: 'always',
                resolve: {
                    recursos: 'projetoRH',
                    recurso: 'projetoRH_Item',
                    empresas: 'projetoEmpresas',
                },
            },
            {
                path: 'recursos-materiais',
                component: RecursosMateriaisComponent,
                runGuardsAndResolvers: 'always',
                resolve: {
                    recursos: 'projetoRM',
                    recurso: 'projetoRM_Item',
                    categorias: CategoriasContabeisResolver,
                },
            },
            {
                path: 'alocacao-recursos-humanos',
                component: AlocacaoRecursosHumanosComponent,
                runGuardsAndResolvers: 'always',
                resolve: {
                    recursos: 'projetoRH',
                    recurso: 'projetoRH_Item',
                    empresas: 'projetoEmpresas',
                },
            },
            {
                path: 'alocacao-recursos-materiais',
                component: AlocacaoRecursosMateriaisComponent,
                runGuardsAndResolvers: 'always',
                resolve: {
                    recursos: 'projetoRM',
                    recurso: 'projetoRM_Item',
                    categorias: CategoriasContabeisResolver,
                },
            },
            {
                path: 'etapas',
                component: EtapasComponent,
                runGuardsAndResolvers: 'always',
                resolve: {
                    recursos: 'projetoRH',
                    recurso: 'projetoRH_Item',
                    empresas: 'projetoEmpresas',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AlterarProjetoRoutingModule {}
