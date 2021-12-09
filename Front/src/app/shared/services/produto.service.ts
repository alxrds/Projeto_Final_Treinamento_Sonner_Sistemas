import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  constructor(private http: HttpClient) { }

  private urlApi = 'http://localhost:8080/produtos/';

  public getProdutos(){
    return this.http.get<Produto[]>(this.urlApi);
  }

  public addProdutos(produto: any){
    return this.http.post<Produto[]>(this.urlApi, produto);
  }

  public editProdutos(produto:any, id: number){
    return this.http.put<Produto[]>( this.urlApi + id, produto);
  }

  public deleteProdutos(id: number){
    return this.http.delete<Produto[]>(this.urlApi + id);
  }

}
