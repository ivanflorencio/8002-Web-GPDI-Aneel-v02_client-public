import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Empresa, ResultadoResponse, User, AppValidators} from '@app/commons';
import {Observable, Observer} from 'rxjs';
import {ActivatedRouteSnapshot, ActivatedRoute, Router} from '@angular/router';
import {AppService} from '@app/services/app.service';
import {UsersService} from '@app/services/users.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;

  empresas: Observable<Array<Empresa>>;

  resultado: ResultadoResponse;

  user: User;

  constructor(protected app: AppService, protected usersService: UsersService, protected route: ActivatedRoute) {
  }

  @ViewChild(LoadingComponent, {static: true}) loading: LoadingComponent;

  ngOnInit() {
    // @todo Resolver
    this.getUser();
  }

  protected getUser() {
    this.loading.show();
    this.usersService.byId(this.route.snapshot.params.id).subscribe(user => {
      this.user = user;
      this.loading.hide();
    });
  }

  submit(value: any) {
    return this.usersService.edit(value);
  }

  async onSubmited(value: ResultadoResponse) {

    try {
      if (value.sucesso) {
        await this.app.router.navigate(['/admin', 'gerenciar-usuarios'], {
          queryParams: {
            message: 'user-gestor-updated'
          }
        });
      }
    } catch (e) {
      console.error(e);
    }

  }
}
