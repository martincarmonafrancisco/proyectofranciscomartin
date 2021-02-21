import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductosComponent } from "./productos/productos.component";
import { SupermercadosComponent } from "./supermercados/supermercados.component";
import { ProductoDetailComponent } from "./producto-detail/producto-detail.component";
import { Grafico01Component } from "./grafico01/grafico01.component";
import { Grafico02Component } from "./grafico02/grafico02.component";
import { Grafico03Component } from "./grafico03/grafico03.component";
import { SupermercadoDetailComponent } from "./supermercado-detail/supermercado-detail.component";

const routes: Routes = [
  { path: "productos", component: ProductosComponent },
  { path: "supermercados", component: SupermercadosComponent },
  { path: "grafico", component: Grafico01Component },
  { path: "detail/:nombre", component: ProductoDetailComponent },
  { path: "detail2/:_nombre", component: SupermercadoDetailComponent },
  //{ path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "graficolineas", component: Grafico02Component },
  { path: "graficoporcentaje", component: Grafico03Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
