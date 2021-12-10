import {  NgModule, Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { ProdutoService } from "../../shared/services/produto.service";
import { Produto } from "../../shared/models/produto";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  constructor(private produtoService: ProdutoService) { }

  produtos: Produto[] = [];

  ngOnInit() {
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

  public async onEditChange(event: any) {
    this.produtoService.editProdutos(event.data, event.key).subscribe(res => {
      this.ngOnInit();
    });
  }

  public async onRemoveChange(event: any) {
    this.produtoService.deleteProdutos(event.key).subscribe(res => {
      this.ngOnInit();
    });
  }

  public async onCreateChange(event: any) {
    event.data.id = null;
    this.produtoService.addProdutos(event.data).subscribe(res => {
      this.ngOnInit();
    });
  }
}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxButtonModule
  ],
  declarations: [ProdutosComponent],
  bootstrap: [ProdutosComponent],
})
export class ProdutosModule { }
