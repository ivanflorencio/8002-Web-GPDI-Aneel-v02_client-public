import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RelatoriosDiretoriaService } from '@app/services';

@Injectable()
export class NotasTecnicasResolver implements Resolve<any> {
    constructor(protected service: RelatoriosDiretoriaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.service.obter();
    }
}
