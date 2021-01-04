import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MeuCadastroRoutingModule} from './meu-cadastro-routing.module';
import {MeuCadastroComponent} from '@app/meu-cadastro/meu-cadastro.component';
import {UsersService} from '@app/services';
import {CoreModule} from '@app/core';


@NgModule({
  declarations: [MeuCadastroComponent],
  imports: [
    CommonModule,
    CoreModule,
    MeuCadastroRoutingModule
  ],
  providers: [UsersService]

})
export class MeuCadastroModule {
}
