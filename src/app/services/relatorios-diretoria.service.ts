import { ServiceBase } from '@app/services/service-base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class RelatoriosDiretoriaService extends ServiceBase<any> {
    constructor(http: HttpClient) {
        super(http, 'Sistema/RelatoriosDiretoria');
    }

    getRelatorioDiretoriaProposta(captacaoId) {
        return this.http.get<any>(`Proposta/00000000-0000-0000-0000-000000000000/RelatorioDiretoria?captacaoId=${captacaoId}`).toPromise();
    }
}
