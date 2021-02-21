import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";
import { HttpClient } from "@angular/common/http";
import { Producto } from "./producto";

/*
Los componentes consumen servicios; es decir, puede inyectar un servicio en un componente, dándole acceso al componente a ese servicio.

Una aplicación real buscará héroes de un servidor remoto, que es una operación inherentemente asincrónica.

En este tutorial, HeroService.getHeroes() devolverá un Observable porque eventualmente usará el método angular HttpClient.get para buscar a los héroes y HttpClient.get() devuelve un Observable.

observable
Un productor de múltiples valores, que empuja a suscriptores. Se utiliza para el manejo de eventos asíncronos en todo Angular. Ejecutas un observable suscribiéndote con su método subscribe(), pasando devoluciones de llamada para notificaciones de nuevos valores, errores o finalización.
*/

@Injectable({
  providedIn: "root"
})
export class ProductoService {
  private url2 = "https://restapialmacen.herokuapp.com/producto";
  private url3 = "https://restapialmacen.herokuapp.com/producto/actualiza";
  private url4 = "https://restapialmacen.herokuapp.com/producto/nuevoP";
  private url5 = "https://restapialmacen.herokuapp.com/producto/borrar";

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getProductosApi() {
    this.messageService.add("Cargamos los documentos");
    return this.http.get(this.url2);
  }

  /**update**/
  updateProducto(doc: any) {
    console.log("en update");
    console.log(doc);
    const url2Id = `${this.url3}/${doc.nombre}`;
    return this.http.post(url2Id, doc);
  }

  /** DELETE*/
  deleteProducto(producto: Producto) {
    const url5 = `https://restapialmacen.herokuapp.com/producto/borrar/${producto._nombre}`;
    return this.http.get(url5);
  }
  /** POST **/
  nuevoProductoPost(doc: any) {
    return this.http.post(this.url4, doc);
  }

  /*Producto por su nombre */
  getProducto(nombre: string) {
    const url2 = `https://restapialmacen.herokuapp.com/producto/${nombre}`;
    return this.http.get(url2);
  }
}
