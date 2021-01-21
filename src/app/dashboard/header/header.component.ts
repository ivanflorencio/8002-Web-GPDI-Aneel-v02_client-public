import {Component, Inject, OnInit, Optional} from '@angular/core';
import {CURRENT_USER, HEADER_MENU, MenuItem, ROOT_URL, User} from '@app/commons';
import {AppService} from '@app/services/app.service';
import {AuthService} from '@app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: Array<MenuItem>;

  get avatar() {

    return this.auth.user.fotoPerfil ? `url(${this.auth.user.fotoPerfil})` : '';
  }

  get empresa() {
    if (this.currentUser) {
      return this.currentUser.empresa || this.currentUser.razaoSocial || '';
    }
    return '';
  }

  constructor(
    @Optional() @Inject(HEADER_MENU) menu,
    @Inject(CURRENT_USER) public currentUser: User,
    @Inject(ROOT_URL) public home_url: string,
    protected app: AppService,
    protected auth: AuthService
  ) {
    this.menu = menu;
  }

  openCadastro() {
    this.app.router.navigate([this.home_url, 'meu-cadastro']).then();
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.currentUser = this.auth.user;
  }

}
