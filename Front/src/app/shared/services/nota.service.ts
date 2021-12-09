import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Nota } from "../models/nota";

@Injectable({
  providedIn: 'root'
})

export class NotaService {

  private urlApi = 'http://localhost:8080/notas/';

  constructor(private http: HttpClient) {}

  public getNotas(){
    return this.http.get<Nota[]>(this.urlApi);
  }

  public addNota(nota: any){
    return this.http.post<Nota[]>(this.urlApi, nota);
  }

  public editNotas(nota: any, id: number) {
    return this.http.put<Nota[]>(this.urlApi + id, nota);
  }

  public deleteNotas(id: number) {
    return this.http.delete<Nota[]>(this.urlApi + id);
  }

}
