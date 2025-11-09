import { CommonModule, NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-estado-resultado',
  imports: [CommonModule, FormsModule],
  templateUrl: './estado-resultado.component.html',
  styleUrl: './estado-resultado.component.css'
})


export class EstadoResultadoComponent {
  selectedAccounts: any[]= [];

  accounts: Cuenta[] = [
  { nombre: 'Ventas', tipo: 'Ingreso', requiereInput: true },
  { nombre: 'Costo de Ventas', tipo: 'Costo', requiereInput: true },
  { nombre: 'Utilidad Bruta', tipo: 'Resultado', requiereInput: false, calculada: true },
  { nombre: 'Gastos de Operación', tipo: 'Gasto', requiereInput: true },
  { nombre: 'Utilidad Neta', tipo: 'Resultado', requiereInput: false, calculada: true }
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
  const ventas = this.selectedAccounts.find(acc => acc.nombre === 'Ventas')?.valor || 0;
  const costo = this.selectedAccounts.find(acc => acc.nombre === 'Costo de Ventas')?.valor || 0;

  const utilidadBruta = this.selectedAccounts.find(acc => acc.nombre === 'Utilidad Bruta');
  if (utilidadBruta) {
    utilidadBruta.valor = ventas - costo;
  }
}

}
export interface Cuenta{
  nombre: string;
  tipo: string;
  valor?: number;
  requiereInput: boolean;
  calculada?: boolean;
}
