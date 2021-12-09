import { Cliente } from "./cliente";
import { ItemNota } from "./item-nota";

export class Nota {

  id!: number;
  numero!: number;
  dataNota!: Date;
  cliente!: Cliente;
  valorNota!: number;

  items!: ItemNota[];

}
