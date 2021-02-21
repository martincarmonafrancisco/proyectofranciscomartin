import { Component, OnInit } from "@angular/core";
import { Supermercado } from "../supermercado";
import { SupermercadoService } from "../supermercado.service";
import { MessageService } from "../message.service";
import { Producto } from "../producto";

@Component({
  selector: "app-supermercados",
  templateUrl: "./supermercados.component.html",
  styleUrls: ["./supermercados.component.css"]
})
export class SupermercadosComponent implements OnInit {
  supermercados: Array<Supermercado> = [];
  supermercadosApi = null;
  supermercadoTmp: any;
  constructor(
    private supermercadoService: SupermercadoService,
    private messageService: MessageService
  ) {}

  /* getSupermercadosApi() {
    this.messageService.add("Hola desde SupermercadosApi");
    this.supermercadoService.getSupermercadosApi().subscribe(supermercados => {
      this.supermercadosApi = supermercados;
      this.supermercados = this.supermercadosApi;
      this.supermercadoTmp = this.supermercados.map((x: Supermercado) => {
        return new Supermercado(
          x._id,
          x._nombre,
          x._municipio,
          x._direccion,
          x._numtelefono,
          x._productos
        );
      });
    });
  }
*/
  getSupermercadosApi() {
    this.supermercadoService.getSupermercadosApi().subscribe(supermercados => {
      this.supermercadosApi = supermercados;
      for (let supermercado of this.supermercadosApi) {
        let productos: Array<Producto> = new Array();
        for (let producto of supermercado.productos) {
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
        let s = new Supermercado(
          supermercado._id,
          supermercado._nombre,
          supermercado._municipio,
          supermercado._direccion,
          supermercado._numtelefono,
          productos
        );
        this.supermercados.push(s);
      }
    });
  }
  add(
    id: string,
    nombre: string,
    municipio: string,
    direccion: string,
    numtelefono: string
    // productos: Producto
  ): void {
    const idV = id;
    const nombreV = nombre.trim();
    const municipioV = municipio;
    const direccionV = direccion;
    const numtelefonoV = parseInt(numtelefono);
    //const _productosV = new Date(caducidad);

    if (!nombre) {
      return;
    }
    const newDoc: any = {
      id: idV,
      nombre: nombreV,
      municipio: municipioV,
      direccion: direccionV,
      numtelefono: numtelefonoV
    };
    this.supermercadoService
      .nuevoSupermercadoPost(newDoc)
      .subscribe(supermercado => {
        this.supermercadoTmp = supermercado;
        this.supermercados.push(this.supermercadoTmp);
      });
  }
   delete(supermercado: Supermercado): void {
   this.supermercados = this.supermercados.filter(h => h !== supermercado);
    this.supermercadoService.deleteSupermercado(supermercado).subscribe();
    console.log(supermercado)
  }
  ngOnInit() {
    this.getSupermercadosApi();
  }
}
