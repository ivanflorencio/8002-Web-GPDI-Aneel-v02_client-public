import {Component, Inject, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {TableComponentCols, TableComponentActions, TableComponentFilter, TableActionEvent} from '@app/core/components/table/table';
import {CoExecutorFormComponent} from './co-executor-form/co-executor-form.component';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-co-executores',
  templateUrl: './co-executores.component.html',
  styleUrls: ['./co-executores.component.scss']
})
export class CoExecutoresComponent implements OnInit {

  coExecutores: Array<any>;
  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'id',
      title: 'ID',
      order: true,
    }, {
      field: 'razaoSocial',
      title: 'Nome ou Razão Social',
      order: true,
    },
    {
      field: 'cnpj',
      title: 'CNPJ',
      order: true,
      value: i => i.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
    }
  ];

  buttons: TableComponentActions;

  filters: Array<TableComponentFilter> = [];
  canEdit: boolean;

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public propostaCanEdit: BehaviorSubject<boolean>,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal,
  ) {
    this.buttons = [
      {
        action: './#${id}',
        isLink: true,
        text: this.canEdit ? 'EDITAR' : 'VISUALIZAR',
        icon: this.canEdit ? 'ta-edit' : 'ta-eye',
        className: 'btn btn-primary'
      }
    ];
  }

  async ngOnInit() {
    this.propostaCanEdit.subscribe(can => this.canEdit = can);
    this.route.data.subscribe(data => {
      this.coExecutores = data.coExecutores;
    });
    this.route.fragment.subscribe(f => {
      const id = parseFloat(f);
      if ((this.canEdit && f === 'novo') || !isNaN(id)) {
        this.modalCoExecutora(this.coExecutores.find(c => c.id === id));
      }
    });
  }

  async modalCoExecutora(coExecutor?) {
    const ref = this.modal.open(CoExecutorFormComponent, {size: 'lg'});
    const cmp = ref.componentInstance as CoExecutorFormComponent;
    cmp.coExecutor = coExecutor;
    try {
      await ref.result;
    } catch (e) {
      console.error(e);
    }
    await this.router.navigate(['./'], {relativeTo: this.route});
  }

}
