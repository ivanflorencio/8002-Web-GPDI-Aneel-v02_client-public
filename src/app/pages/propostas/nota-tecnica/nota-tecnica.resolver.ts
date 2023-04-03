import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RelatoriosDiretoriaService } from '@app/services';
import { NotasTecnicasService } from '@app/services/notas-tecnicas.service';

@Injectable()
class RelatoriosDiretoriaShortcodesResolver implements Resolve<Array<any>> {
    constructor(protected service: RelatoriosDiretoriaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
        return this.service.obter('Shortcodes');
    }
}

@Injectable()
class PropostaNotaTecnicaResolver implements Resolve<Array<any>> {
    constructor(protected service: NotasTecnicasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
        return this.service.getNotaTecnicaProposta(route.params.id);
    }
}

export default { shortcodes: RelatoriosDiretoriaShortcodesResolver, relatorios: PropostaNotaTecnicaResolver };
