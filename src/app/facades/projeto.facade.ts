import { ProjetosService } from '../projetos/projetos.service';
import { Projeto, Empresa, ProjetoStatus, RegistroREFP, ProrrogarProjetoRequest } from '@app/models';
import { throwError, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { GenericFacade } from './generic.facade';
import { EmpresaProjetoFacade } from './empresa.facade';
import { RecursoHumanoFacade } from './recurso-humano.facade';


abstract class ProjetoModule {
    constructor(protected id: number, protected service: ProjetosService) { }
}

class ProjetoTema extends ProjetoModule {
    get() {
        return this.service.getTema(this.id);
    }
}
class ProjetoEtapas extends ProjetoModule {
    get() {
        return this.service.getEtapas(this.id);
    }
}
class ProjetoProdutos extends ProjetoModule {
    get() {
        return this.service.getProdutos(this.id);
    }
}
class ProjetoEmpresas extends ProjetoModule {
    get() {
        return this.service.getEmpresas(this.id)
            .pipe(map(empresas => empresas.map(e => new EmpresaProjetoFacade(e))));
    }
}

class ProjetoRH extends ProjetoModule {
    get() {
        return this.service.getRH(this.id).pipe()
            .pipe(map(rh => rh.map(r => new RecursoHumanoFacade(r))));

    }
    getAlocacao() {
        return this.service.getAlocacaoRH(this.id);
    }
}
class ProjetoRM extends ProjetoModule {
    get() {
        return this.service.getRecursoMaterial(this.id);
    }
    getAlocacao() {
        return this.service.getAlocacaoRM(this.id);
    }
}
class ProjetoREFP extends ProjetoModule {
    registrosAprovados() {
        return this.service.listarRegistrosAprovados(this.id);
    }
    registrosReprovados() {
        return this.service.listarRegistrosReprovados(this.id);
    }
    registrosPendentes() {
        return this.service.listarRegistrosPendentes(this.id);
    }
    aprovarRegistro(id: number) {
        return this.service.editarRegistroREFP({
            id,
            status: 'Aprovado',
            obsInternas: []
        });
    }
    reprovarRegistro(id: number, motivo: string) {
        if (motivo.trim().length === 0) {
            return throwError("O motivo não pode ser vazio");
        }

        return this.service.editarRegistroREFP({
            id,
            status: 'Reprovado',
            obsInternas: [{
                texto: motivo
            }]
        });
    }
    reenviarAprovacaoRegistro(registro: RegistroREFP, respostas: string) {

        if (respostas.trim().length === 0) {
            return throwError("A resposta não pode ser vazia");
        }

        const requestData = Object.assign({}, registro, {
            status: 'Pendente',
            obsInternas: [{
                texto: respostas
            }]
        });

        return this.service.editarRegistroREFP(requestData);
    }

    removerRegistro(id: number) {
        return this.service.removerRegistroREFP(id);
    }
}

export class ProjetoFacade extends GenericFacade<Projeto> implements Projeto {
    created: string;
    id: number;
    titulo: string;
    tipo: number;
    dataInicio?: any;
    codigo?: any;
    tituloDesc: string;
    numero: string;
    catalogEmpresaId: number;
    catalogEmpresa?: Empresa;
    catalogStatusId: number;
    catalogStatus?: ProjetoStatus;
    catalogSegmentoId?: any;
    catalogSegmento?: any;
    avaliacaoInicial?: any;
    compartResultados?: any;
    compartResultadosValor?: any;
    motivacao?: any;
    originalidade?: any;
    aplicabilidade?: any;
    relevancia?: any;
    razoabilidade?: any;
    pesquisas?: any;
    produtos?: any;
    recursosHumanos?: any;
    alocacoesRh?: any;
    recursosMateriais?: any;
    alocacoesRm?: any;
    etapas?: any;
    tema?: any;
    usersProjeto?: any;
    empresas?: any;

    relations: {
        tema: ProjetoTema;
        etapas: ProjetoEtapas;
        produtos: ProjetoProdutos;
        empresas: ProjetoEmpresas;
        recursosHumanos: ProjetoRH;
        recursosMateriais: ProjetoRM;
        REFP: ProjetoREFP;
    };

    onUpdate = new Subject<{ prop: string; value: any; prev: any }>();
    onSave = new Subject<Projeto>();

    constructor(protected _projeto: Projeto, protected _service: ProjetosService) {
        super(_projeto);
        this.relations = {
            tema: new ProjetoTema(this.id, this._service),
            etapas: new ProjetoEtapas(this.id, this._service),
            produtos: new ProjetoProdutos(this.id, this._service),
            empresas: new ProjetoEmpresas(this.id, this._service),
            recursosHumanos: new ProjetoRH(this.id, this._service),
            recursosMateriais: new ProjetoRM(this.id, this._service),
            REFP: new ProjetoREFP(this.id, this._service),
        };
    }

    save() {
        const projeto = Object.assign({}, this._projeto);
        if (this.id) {
            return this._service.editar(projeto).pipe(tap(r => this.onSave.next(projeto)));
        } else {
            return this._service.criarProjeto(projeto).pipe(tap(r => this.onSave.next(projeto)));
        }
    }
    delete() {
        if (this.id) {
            return this._service.removerProjeto(this.id);
        }
    }
    toRequest() {
        return Object.assign({}, this._projeto);
    }

    prorrogar(prorrogacao: ProrrogarProjetoRequest) {
        return this._service.prorrogarProjeto(prorrogacao);
    }
    getOrcamentoEmpresas() {
        return this._service.getOrcamentoEmpresas(this.aplicabilidade.id);
    }
    getOrcamentoEtapas() {
        return this._service.getOrcamentoEtapas(this.id);
    }
    obterXmls() {
        return this._service.obterXmls(this.id);
    }
    obterLogDuto() {
        return this._service.obterLogDuto(this.id);
    }
    gerarXmlProjetoPed(versao: number) {
        return this._service.gerarXmlProjetoPed(this.id, versao);
    }
    gerarXmlInteresseExecucao(versao: number) {
        return this._service.gerarXmlInteresseExecucao(this.id, versao);
    }
    gerarXmlInicioExecucao(versao: number) {
        return this._service.gerarXmlInicioExecucao(this.id, versao);
    }
    gerarXmlProrrogacao(versao: number) {
        return this._service.gerarXmlProrrogacao(this.id, versao);
    }
    downloadXml(id) {
        return this._service.downloadXML(this.id, id);
    }
    orcamentoGerarCSV() {
        return this._service.exportarExtratoEmpresas(this.id);
    }
    extratoGerarCSV() {
        return this._service.exportarExtratoREFP(this.id);
    }

}
