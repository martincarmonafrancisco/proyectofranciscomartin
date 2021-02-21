import { Component, OnInit, Input } from "@angular/core";
import { Producto } from "../producto";
import { ProductoService } from "../producto.service";
import { MessageService } from "../message.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-producto-detail",
  templateUrl: "./producto-detail.component.html",
  styleUrls: ["./producto-detail.component.css"]
})
export class ProductoDetailComponent implements OnInit {
  // @Input() and @Output() allow Angular to share data between the parent context and child directives or components
  producto: Producto;
  // productosApi = null;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getProducto();
  }
  save(_precio: string): void {
    const doc = {
      id: this.producto._id,
      nombre: this.producto._nombre,
      caducidad: new Date(this.producto._caducidad),
      precio: parseInt(_precio),
      tipo: this.producto._tipo,
      cantidad: this.producto._cantidad,
      supermercado: this.producto._supermercado
    };
    this.productoService.updateProducto(doc).subscribe(() => this.goBack());
  }
  /*
  Para recuperar el documento por el Id reicibido como parámetro
  */
  getProducto(): void {
    const nombre = this.route.snapshot.paramMap.get("nombre");
    this.messageService.add(
      `ProductosComponent: Selected producto=${nombre}`
    );
    this.productoService.getProducto(nombre).subscribe(producto => {
      const productoTmp: any = producto;
      this.producto = productoTmp[0];
    });
  }
  /*getProducto(): void {
    let nombre = this.route.snapshot.paramMap.get("nombre");
    this.productoService.getProducto(nombre).subscribe(e => {
      this.productosApi = e;
      let productos: Array<Producto> = new Array();
      for (let producto of this.productosApi[0].productos) {
        let p = new Producto(
          producto._nombre,
          producto._precio,
          producto._cantidad,
          producto._caducidad,
          producto._tipo,
          producto._id
        );
        productos.push(p);
      }
      this.producto = new Producto(
        this.productosApi[0]._id,
        this.productosApi[0]._nombre,
        this.productosApi[0]._precio,
        this.productosApi[0]._cantidad,
        this.productosApi[0]._caducidad,
        this.productosApi[0]._tipo
      );
    });
  }
}*/
  goBack(): void {
    this.location.back();
  }
}
