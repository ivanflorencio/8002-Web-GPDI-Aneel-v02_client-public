import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CaptacoesService } from '@app/users-modules/gestor/services/captacoes.service';

@Injectable()
export class CaptacoesResolver implements Resolve<Array<any>> {
    constructor(protected service: CaptacoesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<any>> | Promise<Array<any>> | Array<any> {
        return this.service.obter(route.url[0].path);
    }
}
