import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RelatoriosDiretoriaService, ServiceBase } from '@app/services';

@Injectable()
class RelatoriosDiretoriaShortcodesResolver implements Resolve<Array<any>> {
    constructor(protected service: RelatoriosDiretoriaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
        return this.service.obter('Shortcodes');
    }
}

@Injectable()
class PropostaRelatorioDiretoriaResolver implements Resolve<Array<any>> {
    constructor(protected service: RelatoriosDiretoriaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
        return this.service.getRelatorioDiretoriaProposta(route.params.id);
    }
}

export default { shortcodes: RelatoriosDiretoriaShortcodesResolver, relatorios: PropostaRelatorioDiretoriaResolver };
