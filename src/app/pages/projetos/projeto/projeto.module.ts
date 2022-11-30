import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetoRoutingModule } from './projeto-routing.module';
import { ProjetoComponent } from './projeto.component';
import { DashboardModule } from '@app/dashboard';
import { TesteComponent } from './components/teste/teste.component';
import { ProjetoService } from '@app/pages/projetos/projeto/services/projeto.service';
import { ProjetoResolver, ProjetoStatusResolver } from '@app/pages/projetos/projeto/resolvers/projeto.resolver';
import { PipesModule } from '@app/core/pipes';
import { NovoRegistroResolver } from '@app/pages/projetos/projeto/resolvers/novo-registro.resolver';
import { RegistroResolver, RegistrosResolver } from '@app/pages/projetos/projeto/resolvers/registros.resolver';
import { ExtratoFinanceiroComponent } from './extrato-financeiro/extrato-financeiro.component';
import { ExtratoFinanceiroResolver } from '@app/pages/projetos/projeto/resolvers/extrato-financeiro.resolver';
import { ComponentsModule } from '@app/core/components';
import { ComponentsModule as AppComponentsModule } from '@app/components';
import { ScreensModule } from '@app/core/screens/screens.module';
import { HomeComponent } from './home/home.component';
import { IsResponsavelProvider } from '@app/pages/projetos/projeto/projeto';
import { RelatorioResolver } from './resolvers/relatorio.resolver';
import { CoreModule } from '@app/core';
import { CronogramaProjetoComponent } from './cronograma-projeto/cronograma-projeto.component';
import { CronogramaProjetoResolver } from './resolvers/cronograma-projeto.resolver';

@NgModule({
    declarations: [ProjetoComponent, TesteComponent, ExtratoFinanceiroComponent, HomeComponent, CronogramaProjetoComponent],
    imports: [
        CommonModule,
        ProjetoRoutingModule,
        DashboardModule,
        PipesModule,
        ScreensModule,
        ComponentsModule,
        CoreModule,
        AppComponentsModule,
        ComponentsModule,
    ],
    providers: [
        IsResponsavelProvider,
        ProjetoService,
        ProjetoResolver,
        RegistrosResolver,
        RegistroResolver,
        NovoRegistroResolver,
        ExtratoFinanceiroResolver,
        CronogramaProjetoResolver,
        RelatorioResolver,
        ProjetoStatusResolver.Status('Execucao', 'projetoExecucao'),
        ProjetoStatusResolver.Status('Finalizado', 'projetoFinalizado'),
    ],
})
export class ProjetoModule {}
