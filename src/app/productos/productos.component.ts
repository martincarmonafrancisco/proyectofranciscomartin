import { Component, OnInit } from "@angular/core";
import { Producto } from "../producto";
import { ProductoService } from "../producto.service";
import { MessageService } from "../message.service";

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.css"]
})
export class ProductosComponent implements OnInit {
  productos: Producto[];
  productosApi = null;
  productoTmp: any;

  constructor(
    private productoService: ProductoService,
    private messageService: MessageService
  ) {}

  /*getMisDatos() {
    this.productoService.getMisDatos().subscribe(productos => {
      this.productosApi = productos;
      for (let producto of this.productosApi) {
        let n = new Producto(
          producto._id,
          producto._nombre,
          producto._precio,
          producto._cantidad,
          producto._caducidad,
          producto._tipo
        );
        this.productos.push(n);
      }
    });
  }*/
  /*getProductosApi() {
    this.messageService.add("Usted está viendo un listado de los productos");
    this.productoService.getProductosApi().subscribe(productos => {
      this.productosApi = productos;
      this.productos = this.productosApi;
    });
  }
*/
  getProductosApi() {
    this.messageService.add("Mostrando Productos");
    this.productoService.getProductosApi().subscribe(productos => {
      this.productosApi = productos;
      this.productos = this.productosApi;
      this.productoTmp = this.productos.map((x: Producto) => {
        return new Producto(
          x._id,
          x._nombre,
          x._caducidad,
          x._cantidad,
          x._precio,
          x._tipo,
          x._supermercado
        );
      });
    });
  }

  delete(producto: Producto): void {
   this.productos = this.productos.filter(h => h !== producto);
    this.productoService.deleteProducto(producto).subscribe();
    console.log(producto)
  }

  /*add1(
    id: string,
    nombre: string,
    fecha_n: string,
    modelo_m: string,
    num_carrera: string,
    num_victoria: string,
    num_podio: string,
    num_pole: string,
    escuderia: string,
    url: string
  ): void {
    const idm = parseInt(id);
    const nombrem = nombre.trim();
    const fecha_nm = new Date(fecha_n);
    const modelo_mm = modelo_m.trim();
    const num_carreram = parseInt(num_carrera);
    const num_victoriam = parseInt(num_victoria);
    const num_podiom = parseInt(num_podio);
    const num_polem = parseInt(num_pole);
    const escuderiam = escuderia.trim();
    const urlm = url.trim();

    const newDoc: any = {
      id: idm,
      nombre: nombrem,
      fecha_n: fecha_nm,
      modelo_m: modelo_mm,
      num_carrera: num_carreram,
      num_victoria: num_victoriam,
      num_podio: num_podiom,
      num_pole: num_polem,
      escuderia: escuderiam,
      url: urlm
    };

    this.productoService.addProducto(newDoc).subscribe(producto => {
      this.productos = newDoc;
      this.productos.push(this.productoTmp);
    });
  }*/
  add(
    id: string,
    nombre: string,
    precio: string,
    cantidad: string,
    caducidad: string,
    tipo: string,
    supermercado: string
  ): void {
    const idV = id;
    const nombreV = nombre.trim();
    const precioV = parseInt(precio);
    const cantidadV = parseInt(cantidad);
    const caducidadV = new Date(caducidad);
    const tipoV = tipo;
    const supermercadoV = supermercado;
    if (!nombre) {
      return;
    }
    const newDoc: any = {
      id: idV,
      nombre: nombreV,
      precio: precioV,
      cantidad: cantidadV,
      caducidad: caducidadV,
      tipo: tipoV,
      supermercado: supermercadoV
    };
    this.productoService.nuevoProductoPost(newDoc).subscribe(producto => {
      this.productoTmp = producto;
      this.productos.push(this.productoTmp);
    });
  }

  ngOnInit() {
    this.getProductosApi();
  }
}
