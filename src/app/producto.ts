export class Producto {
  _id: string;
  _nombre: string;
  _caducidad: Date;
  _precio: number;
  _tipo: string;
  _cantidad: number;
  _supermercado: string;

  public constructor(
    id: string,
    nombre: string,
    caducidad: Date,
    precio: number,
    cantidad: number,
    tipo: string,
    supermercado: string
  ) {
    this._id = id;
    this._nombre = nombre;
    this._caducidad = caducidad;
    this._precio = precio;
    this._cantidad = cantidad;
    this._tipo = tipo;
    this._supermercado = supermercado;
  }
  get id() {
    return this._id;
  }
  get nombre() {
    return this._nombre;
  }
  get caducidad() {
    return this._caducidad;
  }
  get precio() {
    return this._precio;
  }
  get cantidad() {
    return this._cantidad;
  }
  get tipo() {
    return this._tipo;
  }
  get supermercado() {
    return this._supermercado;
  }

  iva() {
    if (this._tipo == "alimentacion") {
      let precioiva: number =
        (this._precio * 0.21 + this._precio) * this._cantidad;
      return precioiva;
    } else {
      let precioiva1: number =
        (this._precio * 0.04 + this._precio) * this._cantidad;
      return precioiva1;
    }
  }
  iva2() {
    if (this._tipo == "alimentacion") {
      let precioiva: number = this._precio * 0.21 + this._precio;
      return precioiva;
    } else {
      let precioiva1: number = this._precio * 0.04 + this._precio;
      return precioiva1;
    }
  }

  dias() {
    let date: Date = new Date();
    let miliseconds: number =
      new Date(this._caducidad).getTime() - new Date(date).getTime();
    let dia = miliseconds / 86400000;
    let calc = Math.floor(dia);
    return calc;
  }

  tipos() {}
}
