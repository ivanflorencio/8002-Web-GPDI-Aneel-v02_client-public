import { ServiceBase } from '@app/services/service-base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NotasTecnicasService extends ServiceBase<any> {
    constructor(http: HttpClient) {
        super(http, 'Sistema/NotasTecnicas');
    }

    getNotaTecnicaProposta(captacaoId) {
        return this.http.get<any>(`Proposta/NotaTecnica/${captacaoId}`).toPromise();
    }
}
