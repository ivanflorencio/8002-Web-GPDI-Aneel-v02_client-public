/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Provider } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/services';
import { UserRole } from '@app/commons';

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild {
    static To(role: string[], providerAs): Provider {
        return {
            provide: providerAs,
            deps: [AuthService, Router],
            useFactory: (auth: AuthService, router: Router) => new RoleGuard(auth, router, role),
        };
    }

    constructor(private auth: AuthService, protected router: Router, protected roles: string[]) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.roles.indexOf(this.auth.getUser()?.role) >= 0) {
            return true;
        }
        return this.router.navigate(['/']);
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }
}

export const IsAdmin = RoleGuard.To([UserRole.Administrador], 'isAdmin');
export const IsGestor = RoleGuard.To([UserRole.Administrador, UserRole.User], 'isGestor');
export const IsSuprimento = RoleGuard.To([UserRole.Administrador, UserRole.Suprimento, UserRole.User], 'isSuprimento');
export const IsAnalistaTecnico = RoleGuard.To([UserRole.Administrador, UserRole.AnalistaTecnico, UserRole.User], 'isAnalistaTecnico');
export const IsFornecedor = RoleGuard.To([UserRole.Fornecedor], 'isFornecedor');
export const IsColaborador = RoleGuard.To(
    [UserRole.Administrador, UserRole.User, UserRole.Colaborador, UserRole.Suprimento],
    'isColaborador'
);
