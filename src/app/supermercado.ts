import { Producto } from "./producto";
export class Supermercado {
  _id: string;
  _nombre: string;
  _municipio: string;
  _direccion: string;
  _numtelefono: number;
  _productos: Array<Producto>;

  constructor(
    id: string,
    nombre: string,
    municipio: string,
    direccion: string,
    numtelefono: number,
    productos: Array<Producto>
  ) {
    this._id = id;
    this._nombre = nombre;
    this._municipio = municipio;
    this._direccion = direccion;
    this._numtelefono = numtelefono;
    this._productos = productos;
  }
}
