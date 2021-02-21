import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { ProductoService } from "../producto.service";
import { Producto } from "../producto";

@Component({
  selector: "app-grafico03",
  templateUrl: "./grafico03.component.html",
  styleUrls: ["./grafico03.component.css"]
})
export class Grafico03Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  productos: Array<Producto> = [];
  productosApi = null;
  productoTmp: any;

  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie"
    },
    title: {
      text: "Precio por UNIDAD"
    },
    yAxis: {
      accessibility: {},
      title: {
        text: "Precio €"
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
  /*  tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },*/
    accessibility: {
      point: {
        valueSuffix: "%"
      }
    },
    colors: ["#63FF33", "#000000"],
    xAxis: {
      accessibility: {},
      title: {
        text: "Productos"
      }
    },
    series: [
      {
        name: "Precio unidad €",
        type: "bar",
        data: []
      }
    ],

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      backgroundColor: "#FF10"
    }
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.getMisDatos();
  }
  /*getMisDatos() {
    this.productoService.getProductosApi().subscribe(
      result => {
        const misDatos: Array<Producto> = [];
        let api = null;
        api = result;
        for (let n of api) {
          let p = new Producto(
            n._id,
            n._nombre,
            n._precio,
            n._cantidad,
            n._caducidad,
            n._tipo
          );
          misDatos.push(p);
        }
        const dataSeries = misDatos.map((x: Producto) => x._precio());
        const dataCategorias = misDatos.map((x: Producto) => x._nombre);
        this.chartOptions.series[0]["data"] = dataSeries;
        this.chartOptions.xAxis["categories"] = dataCategorias;
        Highcharts.chart("miGrafico03", this.chartOptions);
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
        const dataSeries = misDatos.map((x: Producto) => x.iva2());
        const dataCategorias = misDatos.map((x: Producto) => x._nombre);
        this.chartOptions.series[0]["data"] = dataSeries;
        this.chartOptions.xAxis["categories"] = dataCategorias;
        Highcharts.chart("miGrafico03", this.chartOptions);
      },
      error => console.log(error)
    );
  }
}
