import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { ProductoService } from "../producto.service";
import { Producto } from "../producto";

@Component({
  selector: "app-grafico01",
  templateUrl: "./grafico01.component.html",
  styleUrls: ["./grafico01.component.css"]
})
export class Grafico01Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  productos: Producto[];
  productosApi = null;
  productoTmp: any;

  chartOptions: Highcharts.Options = {
    title: {
      text: "Gráfico de barras",
      style: {
        color: "#"
      }
    },
    chart: {
      type: "column"
    },
    xAxis: {
      categories: [],
      title: {
        text: "Productos"
      }
    },
    yAxis: {
      accessibility: {},
      title: {
        text: "Precios en € (IVA incluido)"
      }
    },

    series: [
      {
        type: "column",
        data: [],
        name: "Precio en € (IVA incluido)"
      },
      {
        type: "column",
        data: [],
        name: "Precio en € (IVA incluido) x UNIDAD"
      }
    ],
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030"
      }
    }
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    //  this.getHeroesApi();
    this.getMisDatos();
  }

  /*
Estructura:
{
id: "5",
name: "Bode.",
salary: 84909,
}
  */

  /* getMisDatos() {
    this.productoService.getProductosApi().subscribe(
      result => {
        const misDatos: any = result;
        const dataSeries = misDatos.map((x: Producto) => x._precio);
        const dataCategorias = misDatos.map((x: any) => x._nombre);
        this.chartOptions.series[0]["data"] = dataSeries;
        this.chartOptions.xAxis["categories"] = dataCategorias;
        Highcharts.chart("miGrafico01", this.chartOptions);
      },
      error => console.log(error)
    );
  }*/
  getMisDatos() {
    this.productoService.getProductosApi().subscribe(
      result => {
        const misDatos: Array<Producto> = [];
        let api = null;
        api = result;
        for (let x of api) {
          let p = new Producto(
            x._id,
            x._nombre,
            x._caducidad,
            x._precio,
            x._cantidad,
            x._tipo,
            x._supermercado
          );
          misDatos.push(p);
        }
        const dataSeries = misDatos.map((x: Producto) => x.iva());
        const dataSeries1 = misDatos.map((x: Producto) => x.iva2());
        const dataCategorias = misDatos.map((x: Producto) => x._nombre);
        this.chartOptions.series[0]["data"] = dataSeries;
        this.chartOptions.series[1]["data"] = dataSeries1;
        this.chartOptions.xAxis["categories"] = dataCategorias;
        Highcharts.chart("miGrafico01", this.chartOptions);
      },
      error => console.log(error)
    );
  }
  /*getMisDatos1() {
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
      }
       const dataSeries = productos.map((x: Producto) => x.iva());
        const dataCategorias = productos.map((x: Producto) => x._nombre);
        this.chartOptions.series[0]["data"] = dataSeries;
        this.chartOptions.xAxis["categories"] = dataCategorias;
        Highcharts.chart("miGrafico01", this.chartOptions);
      },
    )
}*/
}
