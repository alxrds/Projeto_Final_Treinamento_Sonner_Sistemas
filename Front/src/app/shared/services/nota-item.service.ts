import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class NotaItemService {

  private urlApi = 'http://localhost:8080/produtos';

  constructor(private httpClient: HttpClient) {}

  getNotaItems(){
    return this.httpClient.get<any>(this.urlApi);
  }

}
