import { Component, OnInit } from '@angular/core';
import { AnalisesService } from '@app/services/analises.service';

import { AppService } from '@app/services/app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-parecer-form',
    templateUrl: './parecer-form.component.html',
    styleUrls: ['./parecer-form.component.scss'],
})
export class ParecerFormComponent implements OnInit {
    propostaId = 0;

    constructor(protected app: AppService, protected service: AnalisesService, public activeModal: NgbActiveModal) {}

    ngOnInit() {}

    async onSubmit() {}
}
