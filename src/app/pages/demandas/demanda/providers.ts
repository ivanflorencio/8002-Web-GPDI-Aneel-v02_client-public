/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Demanda } from '@app/commons/demandas';
import { EQUIPE_PED, EquipePeD, MenuItem, SIDEBAR_MENU, UserRole } from '@app/commons';
import { DemandaEtapaStatus } from '@app/pages/demandas/commons';
import { FactoryProvider, InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, DemandasService } from '@app/services';
import { BehaviorSubject } from 'rxjs';

function menu(demanda: Demanda, user, equipe: EquipePeD): Array<MenuItem> {
    if (user.role === UserRole.Administrador) {
        return menuCriador(
            [
                ...menuAprovadores([], demanda),
                { text: 'Central Administrativa', icon: 'ta-central-admin', path: 'central-administrativa' },
                { text: 'Logs', icon: 'ta-log', path: 'logs' },
            ],
            demanda
        );
    }

    switch (user.id) {
        case equipe.diretor.id:
        case equipe.coordenador.id:
        case equipe.gerente.id:
        case demanda.revisorId:
        case demanda.superiorDiretoId:
            const _menu = user.id === demanda.criadorId ? menuCriador([], demanda) : [];
            return menuAprovadores(_menu, demanda);
        case demanda.criadorId:
            return menuCriador(
                demanda.especificacaoTecnicaFileId ? [{ text: 'Documento e Aprovações', icon: 'ta-projeto', path: 'aprovacao' }] : [],
                demanda
            );
        default:
            return [];
    }
}

function menuCriador(_menu: Array<any>, demanda: Demanda) {
    return [
        { text: 'Definição Pessoas Processo Validação', icon: 'ta-user-id', path: 'equipe-validacao' },
        { text: 'Especificação Técnica', icon: 'ta-capacete', path: 'formulario/especificacao-tecnica' },

        ..._menu,
    ];
}

function menuAprovadores(_menu: Array<any>, demanda: Demanda) {
    if (demanda.status !== DemandaEtapaStatus.ReprovadaPermanente) {
        if (demanda.especificacaoTecnicaFileId) {
            return [..._menu, { text: 'Processo Aprovação Demanda', icon: 'ta-projeto', path: 'aprovacao' }];
        }
        return _menu;
    }
    return [{ text: 'Hístórico Demanda', icon: 'ta-projeto', path: 'historico' }, ..._menu];
}

export const DEMANDA = new InjectionToken<Demanda>('Demanda');

export const DemandaProvider: FactoryProvider = {
    provide: DEMANDA,
    deps: [ActivatedRoute],
    useFactory: (route: ActivatedRoute) => route.snapshot.data.demanda,
};
export const DemandaMenuProvider: FactoryProvider = {
    provide: SIDEBAR_MENU,
    deps: [DemandasService, AuthService, EQUIPE_PED],
    useFactory: (service: DemandasService, auth: AuthService, equipe: EquipePeD) => {
        const behavior = new BehaviorSubject([]);
        service.demanda.subscribe((d) => {
            const _menu = menu(d, auth.getUser(), equipe);
            behavior.next(_menu);
        });
        return behavior;
    },
};
