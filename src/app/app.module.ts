import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import * as moment from 'moment';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeBr from '@angular/common/locales/pt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, AppEntranceComponent } from './app.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SharedModule } from '@app/core/shared';
import { ComponentsModule } from '@app/core/components';
import { AuthGuard } from '@app/guards';
import { IsAdmin, IsColaborador, IsFornecedor, IsGestor, IsSuprimento, IsAnalistaTecnico } from '@app/guards/role.guard';
import { ScreensModule } from '@app/core/screens/screens.module';

registerLocaleData(localeBr, 'pt');
moment.locale('pt-br');

@NgModule({
    declarations: [AppComponent, AppEntranceComponent, NotFoundComponent],
    imports: [BrowserModule, HttpClientModule, SharedModule, ScreensModule, ComponentsModule, AppRoutingModule, FontAwesomeModule],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
        { provide: 'logged', useClass: AuthGuard },
        IsAdmin,
        IsGestor,
        IsSuprimento,
        IsAnalistaTecnico,
        IsFornecedor,
        IsColaborador,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
