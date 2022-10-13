import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { NewpassComponent } from './newpass/newpass.component';

const searchParams = new URLSearchParams(new URL(document.URL).search);

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: 'forget', component: ForgetPassComponent },
            { path: 'newpass', component: NewpassComponent },
            {
                path: 'nova-senha',
                component: NewpassComponent,
                data: { email: searchParams.get('email'), token: searchParams.get('token') },
            },
            { path: '**', component: LoginComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
