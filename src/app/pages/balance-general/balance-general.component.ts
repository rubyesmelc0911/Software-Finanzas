import { CommonModule, NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-balance-general',
  imports: [CommonModule, FormsModule],
  templateUrl: './balance-general.component.html',
  styleUrls: ['./balance-general.component.css']
})
export class BalanceGeneralComponent {
  selectedAccounts: any[] = [];

  accounts: Cuenta[] = [
    // Activos
    { nombre: 'Activo Circulante', tipo: 'Activo', requiereInput: true },
    { nombre: 'Activo No Circulante', tipo: 'Activo', requiereInput: true },
    { nombre: 'Total Activo', tipo: 'Resultado', requiereInput: false, calculada: true },

    // Pasivos
    { nombre: 'Pasivo Circulante', tipo: 'Pasivo', requiereInput: true },
    { nombre: 'Pasivo No Circulante', tipo: 'Pasivo', requiereInput: true },
    { nombre: 'Total Pasivo', tipo: 'Resultado', requiereInput: false, calculada: true },

    // Capital
    { nombre: 'Capital Contable', tipo: 'Capital', requiereInput: false },
    { nombre: 'Total Pasivo + Capital', tipo: 'Resultado', requiereInput: false, calculada: true }
  ];

  toggleAccount(cuenta: Cuenta) {
    const exists = this.selectedAccounts.find(acc => acc.nombre === cuenta.nombre);
    if (exists) {
      this.selectedAccounts = this.selectedAccounts.filter(acc => acc.nombre !== cuenta.nombre);
    } else {
      this.selectedAccounts.push({ ...cuenta, valor: 0 });
    }
  }

  isSelected(cuenta: Cuenta): boolean {
    return this.selectedAccounts.some(acc => acc.nombre === cuenta.nombre);
  }

  updateCalculatedAccounts() {
    // Calculos

    // Activo total
    const activoCirculante = this.selectedAccounts.find(acc => acc.nombre === 'Activo Circulante')?.valor || 0;
    const activoNoCirculante = this.selectedAccounts.find(acc => acc.nombre === 'Activo No Circulante')?.valor || 0;
    const totalActivo = this.selectedAccounts.find(acc => acc.nombre === 'Total Activo');
    if (totalActivo) {
      totalActivo.valor = activoCirculante + activoNoCirculante;
    }

    // Pasivo total
    const pasivoCirculante = this.selectedAccounts.find(acc => acc.nombre === 'Pasivo Circulante')?.valor || 0;
    const pasivoNoCirculante = this.selectedAccounts.find(acc => acc.nombre === 'Pasivo No Circulante')?.valor || 0;
    const totalPasivo = this.selectedAccounts.find(acc => acc.nombre === 'Total Pasivo');
    if (totalPasivo) {
      totalPasivo.valor = pasivoCirculante + pasivoNoCirculante;
    }

    // Total Pasivo + Capital
    const capitalContable = this.selectedAccounts.find(acc => acc.nombre === 'Capital Contable')?.valor || 0;
    const totalPasivoCapital = this.selectedAccounts.find(acc => acc.nombre === 'Total Pasivo + Capital');
    if (totalPasivoCapital) {
      totalPasivoCapital.valor = (pasivoCirculante + pasivoNoCirculante) + capitalContable;
    }
  }
}

export interface Cuenta {
  nombre: string;
  tipo: string;
  valor?: number;
  requiereInput: boolean;
  calculada?: boolean;
}


