import { ClienteService } from './../../shared/services/cliente.service';
import { Cliente } from 'src/app/shared/models/cliente';
import { NgModule, Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxDataGridModule, DxSelectBoxModule, DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    const promise = this.clienteService.getClientes().toPromise();
    return promise.then(
      (response: any) => {
        this.clientes = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public async onEditChange(event: any) {
    this.clienteService.editCliente(event.data, event.key).subscribe(res => {
      this.ngOnInit();
    });
  }

  public async onRemoveChange(event: any) {
    this.clienteService.deleteCliente(event.key).subscribe(res => {
      this.ngOnInit();
    });
  }

  public async onCreateChange(event: any) {
    event.data.id = null;
    this.clienteService.addCliente(event.data).subscribe(res => {
      this.ngOnInit();
    });
  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxButtonModule,
    DxSelectBoxModule,
  ],
  declarations: [ClientesComponent],
  bootstrap: [ClientesComponent],
})
export class ClientesModule { }
