import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { ProjetoService } from '@app/pages/projetos/projeto/services/projeto.service';
import { ROOT_URL } from '@app/commons';
import { ExtratoEmpresa } from '@app/pages/projetos/projeto/extrato-financeiro/extrato-financeiro';

@Injectable()
export class CronogramaProjetoResolver implements Resolve<any> {
    constructor(@Inject(ROOT_URL) protected root_url, protected router: Router, protected service: ProjetoService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const projeto = this.service.getCurrentProjeto();
        if (projeto) {
            return this.service.getCronogramaProjeto(projeto.id);
        }
        await this.router.navigate([this.root_url, 'projetos']);
    }
}
