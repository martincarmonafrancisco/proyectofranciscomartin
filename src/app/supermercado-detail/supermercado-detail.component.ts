import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Supermercado } from "../supermercado";
import { Producto } from "../producto";
import { SupermercadoService } from "../supermercado.service";
import { Location } from "@angular/common";
import { MessageService } from "../message.service";

@Component({
  selector: "app-supermercado-detail",
  templateUrl: "./supermercado-detail.component.html",
  styleUrls: ["./supermercado-detail.component.css"]
})
export class SupermercadoDetailComponent implements OnInit {
  supermercado: Supermercado;
  supermercadoApi = null;

  //supermercadoApi = null;
  constructor(
    private route: ActivatedRoute,
    private supermercadoService: SupermercadoService,
    private location: Location,
    private messageService: MessageService
  ) {}

ngOnInit() {
    this.getSupermercado();
  }

  getSupermercado(): void {
    let nombre = this.route.snapshot.paramMap.get("_nombre");
    this.supermercadoService.getSupermercado(nombre).subscribe(s => {
      this.supermercadoApi = s;
      let productos: Array<Producto> = new Array();
      for (let producto of this.supermercadoApi[0].productos) {
        let p = new Producto(
          producto._id,
          producto._nombre,
          producto._precio,
          producto._cantidad,
          producto._caducidad,
          producto._tipo,
          producto._supermercado
        );
        productos.push(p);
      }
      this.supermercado = new Supermercado(
        this.supermercadoApi[0]._id,
        this.supermercadoApi[0]._nombre,
        this.supermercadoApi[0]._municipio,
        this.supermercadoApi[0]._direccion,
        this.supermercadoApi[0]._numtelefono,
        productos
      );
    });
  }
  /*getSupermercado(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.messageService.add(
      `SupermercadosComponent: Selected producto nombre=${id}`
    );
    this.supermercadoService.getSupermercado(id).subscribe(supermercado => {
      const supermercadoTmp: any = supermercado;
      this.supermercado = supermercadoTmp[0];
    });
  }*/
  add(
    id: string,
    nombre: string,
    precio: string,
    cantidad: string,
    caducidad: string,
    tipo: string
  ): void {
    const idV = id;
    const nombreV = nombre.trim();
    const precioV = parseInt(precio);
    const cantidadV = parseInt(cantidad);
    const _caducidadV = new Date(caducidad);
    const tipoV = tipo;
    if (!nombre) {
      return;
    }
    const newDoc: any = {
      id: idV,
      nombre: nombreV,
      precio: precioV,
      cantidad: cantidadV,
      caducidad: _caducidadV,
      tipo: tipoV,
      supermercado: this.supermercado._nombre
    };
    this.supermercadoService.nuevoProductoPost(newDoc).subscribe(producto => {
      const productoTmp: any = newDoc;
      this.supermercado._productos.push(productoTmp);
    });
  }
  save(_municipio: string): void {
    const doc = {
      id: this.supermercado._id,
      nombre: this.supermercado._nombre,
      municipio: this.supermercado._municipio,
      direccion: this.supermercado._direccion,
      numtelefono: this.supermercado._numtelefono
    };
    this.supermercadoService.updateSupermercado(doc).subscribe(() => this.goBack());
  }
  /*save(_municipio: string): void {
    const doc = {
      id: this.supermercado._id,
      nombre: this.supermercado._nombre,
      municipio: this.supermercado._municipio,
      direccion: this.supermercado._direccion,
      numtelefono: this.supermercado._numtelefono
    };
    this.supermercadoService.updateSupermercado(doc).subscribe(() => this.goBack());
  }*/
  goBack(): void {
    this.location.back();
  }
}
