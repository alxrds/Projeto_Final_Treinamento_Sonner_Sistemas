import { Nota } from "./nota";
import { Produto } from "./produto";

export class ItemNota {

  id!: number;
  nota!: Nota;
  produto!: Produto;
  quantidade!: number;
  valorTotal!: number;

}
