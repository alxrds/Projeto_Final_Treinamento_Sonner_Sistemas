import { Component, NgModule, OnInit} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { Nota } from "../../shared/models/nota";
import { NotaService } from "../../shared/services/nota.service";
import { ItemNota } from "../../shared/models/item-nota";
import { Cliente } from "../../shared/models/cliente";
import { ClienteService } from "../../shared/services/cliente.service";
import { ProdutoService } from "../../shared/services/produto.service";
import {
  DxDataGridModule,
  DxButtonModule,
  DxTemplateModule,
  DxSelectBoxModule,
  DxNumberBoxModule, DxSpeedDialActionModule, DxTextBoxModule
} from 'devextreme-angular';
import { Produto } from "../../shared/models/produto";

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})

export class NotasComponent implements OnInit {

  notas: Nota[] = [];
  itemsNota: ItemNota[] = [];
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  codigo!: string;
  descricao!: string;
  numItem: number = 1;
  idProduto!: number;
  idCliente!: any;
  idNota!: number;
  precoUnitario!: number;
  quantidade!: number;
  addCliente!: any;
  addItens!: any;
  editItems!: any;
  clienteSelecionado: boolean = false;
  tituloPopUp!: string;
  nomeCliente!: string;
  editCliente!: any;
  editPopUp: boolean = false;


  constructor(
    private notaService: NotaService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
  ) {
    this.mostraClientes();
    this.mostraProdutos();
  }

  ngOnInit() {
    this.mostraNotas();
  }

  public async mostraNotas(){
    this.notas = await this.notaService.getNotas().toPromise();
  }

  public async mostraClientes() {
    const promise = this.clienteService.getClientes().toPromise();
    return promise.then(
      (response: any) => {
        this.clientes = response;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  public async mostraProdutos() {
    const promise = this.produtoService.getProdutos().toPromise();
    return promise.then(
      (response: any) => {
        this.produtos = response;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  public codigoNome(item: any) {
    return item && item.codigo + ' - ' + item.nome;
  }

  public codigoDescricao(item: any) {
    return item && item.codigo + ' - ' + item.descricao;
  }

  public onProdutoValues(event: any){
    this.idProduto = event.value.id;
    this.codigo = event.value.codigo;
    this.descricao = event.value.descricao;
    this.precoUnitario = event.value.precoUnitario;
  }

  public onClienteValues(event:any){
    this.idCliente = event.value.id
    this.addCliente = new Cliente();
    this.addCliente.id = this.idCliente;
    this.clienteSelecionado = true;
  }

  public onQuantidadeValues(event:any){
    this.quantidade = event.value
  }

  public limparCampos(){
    this.itemsNota = [];
    this.mostraNotas();
  }

  public initNew(){
    this.editPopUp = false;
    this.tituloPopUp = "Adicionar Nota";
  }

  public async addItem(event: any) {
    if(!this.quantidade || this.quantidade === null || this.quantidade === undefined || this.quantidade === 0){
      this.quantidade = 1;
    }
    this.addItens = new ItemNota();
    this.addItens.produto = new Produto();
    this.addItens.produto.id = this.idProduto;
    this.addItens.produto.codigo = this.codigo;
    this.addItens.produto.descricao = this.descricao;
    this.addItens.produto.precoUnitario = this.precoUnitario;
    this.addItens.item = this.numItem++
    this.addItens.quantidade = this.quantidade;
    this.addItens.valorTotal = this.quantidade * this.precoUnitario;
    this.itemsNota.push(this.addItens);
  }

  public onCreate(event: any){
    if(this.editPopUp){
      let idNotaEdit: number = this.notas.length - 1;
      debugger
      this.notaService.editNotas(this.notas[idNotaEdit], this.idNota).subscribe(res => {
        alert("Nota Editada com Sucesso");
        this.limparCampos();
      });
    }

    if(event.changes[0].type == "insert" && !this.editPopUp){
      let criaNota = new Nota();
      criaNota.cliente = this.addCliente;
      criaNota.items = this.itemsNota;
      this.notas.push(criaNota);
      let notaQueEuQuero: number = this.notas.length - 1;
      let notaQueEstaAtrapalhando: number = notaQueEuQuero - 1;
      delete this.notas[notaQueEstaAtrapalhando];
      this.notaService.addNota(this.notas[notaQueEuQuero]).subscribe(res => {
        alert("Nota Adicionada com Sucesso");
        this.limparCampos();
      });
    }

    if(event.changes[0].type == "remove" && !this.editPopUp){
      debugger
      this.notaService.deleteNotas(event.changes[0].key.id).subscribe(res => {
        alert(`Nota Excluída ${event.changes[0].key.id} com Sucesso`);
        this.limparCampos();
      });
    }

  }

  public onUpdate(event: any){
    debugger
    this.editPopUp = true;
    this.tituloPopUp = "Editar Nota";
    this.clienteSelecionado = true;
    this.nomeCliente = event.data.cliente.nome;
    this.editCliente = new Cliente();
    this.editCliente.id = event.data.cliente.id;
    this.clienteSelecionado = true;

    for (let i : number = 0; i < event.data.items.length; i++) {
      this.editItems = new ItemNota();
      this.editItems.produto = new Produto();
      this.editItems.produto.id = event.data.items[i].id;
      this.editItems.produto.codigo = event.data.items[i].produto.codigo;
      this.editItems.produto.descricao = event.data.items[i].produto.descricao;
      this.editItems.produto.precoUnitario = event.data.items[i].produto.precoUnitario;
      this.editItems.item = event.data.items[i].item++
      this.editItems.quantidade = event.data.items[i].quantidade;
      this.editItems.valorTotal = event.data.items[i].quantidade * event.data.items[i].produto.precoUnitario;
      this.itemsNota.push(this.editItems);
    }

    this.idNota = event.data.id;
    let editaNota = new Nota();
    editaNota.id = this.idNota;
    editaNota.cliente = this.editCliente;
    editaNota.items = this.itemsNota;
    this.notas.push(editaNota);

  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxButtonModule,
    DxTemplateModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxSpeedDialActionModule,
    DxTextBoxModule
  ],
  declarations: [NotasComponent],
  bootstrap: [NotasComponent]
})
export class NotasModule { }
