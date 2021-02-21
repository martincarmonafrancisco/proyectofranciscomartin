import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";
import { HttpClient } from "@angular/common/http";
import { Supermercado } from "./supermercado";

@Injectable({ providedIn: "root" })
export class SupermercadoService {
  private url = "https://restapialmacen.herokuapp.com/supermercado/";
  private url1 =
    "https://restapialmacen.herokuapp.com/supermercado/supermercados";
  private url2 = "https://restapialmacen.herokuapp.com/supermercado/nuevoS";
  private url4 = "https://restapialmacen.herokuapp.com/producto/nuevoP";
  private url5 =
    "https://restapialmacen.herokuapp.com/supermercado/supermercados/actualiza";
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getSupermercadosApi() {
    this.messageService.add("Cargamos los documentos");
    return this.http.get(this.url1);
  }

  /** PUT: update the hero by ID on the server */
  updateSupermercado(doc: any) {
    console.log("en update");
    console.log(doc);
    const url2Id = `${this.url5}/${doc.nombre}`;
    return this.http.post(url2Id, doc);
  }
  
  //return this.http.put(url2Id, doc);

  /** DELETE*/
  deleteSupermercado(supermercado: Supermercado) {
    const url2Id = `https://restapialmacen.herokuapp.com/supermercado/supermercados/borrar/${
      supermercado._nombre
    }`;
    return this.http.delete(url2Id);
  }
  /** POST*/
  nuevoSupermercadoPost(doc: any) {
    return this.http.post(this.url2, doc);
  }
  nuevoProductoPost(doc: any) {
    return this.http.post(this.url4, doc);
  }
  /*Producto por su nombre */
  /* getSupermercado(nombre: string) {
    const url1 = `https://restapialmacen.herokuapp.com/supermercado/supermercados/${nombre}`;
    return this.http.get(url1);
  }*/
  getSupermercado(_nombre: string) {
    const url1id = `https://restapialmacen.herokuapp.com/supermercado/supermercados/${_nombre}`;
    return this.http.get(url1id);
  }
}
