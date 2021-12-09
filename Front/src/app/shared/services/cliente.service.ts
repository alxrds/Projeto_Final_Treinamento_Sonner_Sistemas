import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  constructor(private http: HttpClient) { }

  private urlApi = 'http://localhost:8080/clientes/';

  public getClientes(){
    return this.http.get<Cliente[]>(this.urlApi);
  }

  public addCliente(cliente: any) {
    return this.http.post<Cliente[]>(this.urlApi, cliente);
  }

  public editCliente(cliente: any, id: number){
    return this.http.put<Cliente[]>(this.urlApi + id, cliente);
  }

  public deleteCliente(id: number){
    return this.http.delete<Cliente[]>(this.urlApi + id);
  }

}
