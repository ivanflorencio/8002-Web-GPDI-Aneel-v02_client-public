import { Component, OnInit } from '@angular/core';

import { AppService } from '@app/services/app.service';
import { TableComponentActions, TableComponentCols, TableComponentFilter } from '@app/core/components/table/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pagination } from '@app/commons/common';
import { ActivatedRoute } from '@angular/router';
import { TabelasFormComponent } from '@app/pages/configuracoes/tabelas/tabela-form/tabelas-form.component';
import { ServiceBase } from '@app/services/service-base.service';

@Component({
    selector: 'app-tabelas',
    templateUrl: './tabelas.component.html',
    styleUrls: ['./tabelas.component.scss'],
})
export class TabelasComponent implements OnInit {
    tabelaValorHora: any;
    loading = false;
    hidePagination = false;

    cols: TableComponentCols = [
        {
            field: 'id',
            title: 'Id',
            order: true,
        },
        {
            field: 'nome',
            title: 'Nome Tabela',
            order: true,
        },
    ];

    buttons: TableComponentActions = [
        {
            action: './#${id}',
            isLink: true,
            text: 'EDITAR',
            icon: 'ta-edit',
            className: 'btn btn-primary',
        },
    ];

    filters: Array<TableComponentFilter> = [];

    tabelasValorHora: Pagination<any> = {
        perPage: 0,
        page: 0,
        totalItems: 0,
        data: [],
        totalPages: 0,
    };

    data: any;

    constructor(
        protected app: AppService,
        protected service: ServiceBase<any>,
        protected modal: NgbModal,
        protected route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data) => {
            if (data.tabelasValorHora) {
                this.data = data.tabelasValorHora;
            }
        });

        this.route.fragment.subscribe((fragment) => {
            const id = parseFloat(fragment);
            if (Number.isSafeInteger(id)) {
                this.service.obter(id).then((tabelaValorHora) => {
                    this.setTabelaValorHora(tabelaValorHora);
                });
            }
        });
    }

    setTabelaValorHora(tabelaValorHora) {
        this.tabelaValorHora = tabelaValorHora;
        if (this.tabelaValorHora) {
            this.openForm(this.tabelaValorHora).then();
        }
    }

    async openForm(tabelaValorHora?: any) {
        const ref = this.modal.open(TabelasFormComponent, { backdrop: false, size: 'lg' });
        const form = ref.componentInstance as TabelasFormComponent;
        if (tabelaValorHora) {
            form.tabelaValorHora = tabelaValorHora;
        }
        try {
            if (await ref.result) {
                this.data = await this.service.obter();
            }
        } catch (e) {
            console.error(e);
        } finally {
            await this.app.router.navigateByUrl('/configuracoes/tabelas', { fragment: '' });
        }
    }
}
