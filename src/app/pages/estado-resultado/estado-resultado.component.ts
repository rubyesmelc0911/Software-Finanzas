import { CommonModule, NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-estado-resultado',
  imports: [CommonModule, FormsModule],
  templateUrl: './estado-resultado.component.html',
  styleUrl: './estado-resultado.component.css'
})


export class EstadoResultadoComponent {
  selectedAccounts: any[]= [];
  nombre: string ="";
  titulo: string = "Estado de Resultados";
  periodo: string = "";

  accounts: Cuenta[] = [
  // 1️⃣ INGRESOS
  { nombre: 'Ventas Netas', tipo: 'Ingreso', requiereInput: true, valor: 0 },
  { nombre: 'Devoluciones sobre Ventas', tipo: 'Ingreso', requiereInput: true, valor: 0 },
  { nombre: 'Descuentos sobre Ventas', tipo: 'Ingreso', requiereInput: true,valor: 0 },
  { nombre: 'Ingresos Totales', tipo: 'Resultado', requiereInput: false, calculada: true,valor: 0 },

  // 2️⃣ COSTOS
  { nombre: 'Costo de Ventas', tipo: 'Costo', requiereInput: true,valor: 0 },
  { nombre: 'Utilidad Bruta', tipo: 'Resultado', requiereInput: false, calculada: true,valor: 0 },

  // 3️⃣ GASTOS DE OPERACIÓN
  { nombre: 'Gastos de Venta', tipo: 'Gasto', requiereInput: true,valor: 0 },
  { nombre: 'Gastos de Administración', tipo: 'Gasto', requiereInput: true,valor: 0 },
  { nombre: 'Gastos de Operación Totales', tipo: 'Resultado', requiereInput: false, calculada: true, valor: 0 },
  { nombre: 'Utilidad de Operación', tipo: 'Resultado', requiereInput: false, calculada: true, valor: 0 },

  // 4️⃣ OTROS INGRESOS Y GASTOS
  { nombre: 'Otros Ingresos', tipo: 'Ingreso', requiereInput: true, valor: 0 },
  { nombre: 'Otros Gastos', tipo: 'Gasto', requiereInput: true, valor: 0 },
  { nombre: 'Utilidad antes de Impuestos', tipo: 'Resultado', requiereInput: false, calculada: true, valor: 0 },

  // 5️⃣ IMPUESTOS
  { nombre: 'Impuesto sobre la Renta', tipo: 'Gasto', requiereInput: true, valor: 0 },
  { nombre: 'Participación de los Trabajadores en las Utilidades (PTU)', tipo: 'Gasto', requiereInput: true, valor: 0 },
  { nombre: 'Impuestos Totales', tipo: 'Resultado', requiereInput: false, calculada: true, valor: 0 },

  // 6️⃣ RESULTADO FINAL
  { nombre: 'Utilidad Neta', tipo: 'Resultado', requiereInput: false, calculada: true, valor: 0 }
];

  toggleAccount(cuenta: Cuenta) {
  const exists = this.selectedAccounts.find(acc => acc.nombre === cuenta.nombre);
  if (exists) {
    this.selectedAccounts = this.selectedAccounts.filter(acc => acc.nombre !== cuenta.nombre);
  } else {
    this.selectedAccounts.push({ ...cuenta, valor: 0 });
  }
}
updateCalculatedAccounts() {
  //Ingresos
  const ventasNetas = this.accounts.find(acc => acc.nombre === 'Ventas Netas')?.valor || 0;
  const devolucionSVentas = this.accounts.find(acc => acc.nombre === 'Devoluciones sobre Ventas')?.valor || 0;
  const descuentoSVentas = this.accounts.find(acc => acc.nombre === 'Descuentos sobre Ventas')?.valor || 0;

  //Costos
  const costoVentas = this.accounts.find(acc => acc.nombre === 'Costo de Ventas')?.valor || 0;

  //Gastos
  const gastosVenta = this.accounts.find(acc => acc.nombre === 'Ventas Netas')?.valor || 0;
  const gastosAdministracion = this.accounts.find(acc => acc.nombre === 'Devoluciones sobre Ventas')?.valor || 0;


  //agregando los resultados a las propiedades del arreglo
  const ingresosTotales = this.accounts.find(acc=> acc.nombre === 'Ingresos Totales');
  if(ingresosTotales){ ingresosTotales.valor = ventasNetas - devolucionSVentas - descuentoSVentas;}

  //const utilidadBruta = this.accounts.find(acc=> acc.nombre === 'Utilidad Bruta');
  //if(utilidadBruta && ingresosTotales.valor){ utilidadBruta.valor = ingresosTotales.valor - costoVentas;}

  const gastosTotales = this.accounts.find(acc=> acc.nombre === 'Ingresos Totales');
  if(ingresosTotales){ ingresosTotales.valor = ventasNetas - devolucionSVentas - descuentoSVentas;}


}

}
export interface Cuenta{
  nombre: string;
  tipo: string;
  valor: number;
  requiereInput: boolean;
  calculada?: boolean;
}
