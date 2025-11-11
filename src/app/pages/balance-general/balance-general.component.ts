import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-balance-general',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './balance-general.component.html',
  styleUrls: ['./balance-general.component.css']
})
export class BalanceGeneralComponent {
  // Encabezado
  titulo: string = 'Balance General';
  nombre: string = '';
  periodo: string = '';

  // Controles para mostrar/ocultar (si usas secciones colapsables)
  mostrarActivo = true;
  mostrarActivoC = true;
  mostrarActivoNC = true;
  mostrarPasivo = false;
  mostrarPasivoC = true;
  mostrarPasivoNC = true;
  mostrarCapital = false;

  // Lista completa de cuentas (según tu desglose)
  accounts: Cuenta[] = [
    // ===== ACTIVO - CIRCULANTE =====
    { nombre: 'Caja', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Bancos', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Inversiones temporales', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Clientes', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Documentos por cobrar (corto plazo)', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Deudores diversos', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Funcionarios y empleados (anticipos)', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Inventarios / Almacén de mercancías', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Anticipo a proveedores', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'IVA acreditable', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Intereses por cobrar', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Rentas pagadas por anticipado', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Seguros pagados por anticipado', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Otros gastos pagados por anticipado', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Activo Circulante Total', tipo: 'Activo Circulante', requiereInput: false, calculada: true, valor: 0 },

    // ===== ACTIVO - NO CIRCULANTE (TANGIBLE) =====
    { nombre: 'Terrenos', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Edificios', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Mobiliario y equipo de oficina', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Equipo de transporte', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Equipo de cómputo', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Maquinaria y equipo industrial', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    // cuenta correctiva (restará)
    { nombre: 'Depreciación acumulada', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },

    // ===== ACTIVO - NO CIRCULANTE (INTANGIBLE) =====
    { nombre: 'Marcas y patentes', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Derechos de autor', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Crédito mercantil (goodwill)', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Gastos de organización', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Amortización acumulada de intangibles', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },

    // ===== OTROS ACTIVOS NO CIRCULANTES =====
    { nombre: 'Depósitos en garantía', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Inversiones permanentes en acciones', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Documentos por cobrar a largo plazo', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Activo No Circulante Total', tipo: 'Activo No Circulante', requiereInput: false, calculada: true, valor: 0 },

    // ===== TOTAL ACTIVO =====
    { nombre: 'Activo Total', tipo: 'Activo', requiereInput: false, calculada: true, valor: 0 },

    // ===== PASIVO - CIRCULANTE =====
    { nombre: 'Proveedores', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Documentos por pagar (corto plazo)', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Acreedores diversos', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Anticipo de clientes', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'IVA trasladado', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'IVA por pagar', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Impuestos por pagar (ISR, IMSS, etc.)', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Sueldos y salarios por pagar', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Intereses por pagar', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Rentas cobradas por anticipado', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Dividendos por pagar', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Total Pasivo Circulante', tipo: 'Pasivo Circulante', requiereInput: false, calculada: true, valor: 0 },

    // ===== PASIVO - NO CIRCULANTE =====
    { nombre: 'Documentos por pagar a largo plazo', tipo: 'Pasivo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Préstamos bancarios a largo plazo', tipo: 'Pasivo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Hipotecas por pagar', tipo: 'Pasivo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Bonos por pagar', tipo: 'Pasivo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Provisiones a largo plazo', tipo: 'Pasivo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Obligaciones laborales a largo plazo', tipo: 'Pasivo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Total Pasivo No Circulante', tipo: 'Pasivo No Circulante', requiereInput: false, calculada: true, valor: 0 },

    // ===== TOTAL PASIVO =====
    { nombre: 'Pasivo Total', tipo: 'Pasivo', requiereInput: false, calculada: true, valor: 0 },

    // ===== CAPITAL CONTABLE =====
    { nombre: 'Capital social', tipo: 'Capital', requiereInput: true, valor: 0 },
    { nombre: 'Aportaciones adicionales de capital', tipo: 'Capital', requiereInput: true, valor: 0 },
    { nombre: 'Reserva legal', tipo: 'Capital', requiereInput: true, valor: 0 },
    { nombre: 'Resultados de ejercicios anteriores', tipo: 'Capital', requiereInput: true, valor: 0 },
    { nombre: 'Utilidad o pérdida del ejercicio', tipo: 'Capital', requiereInput: true, valor: 0 },
    { nombre: 'Revaluación de activos', tipo: 'Capital', requiereInput: true, valor: 0 },
    { nombre: 'Capital Total', tipo: 'Capital', requiereInput: false, calculada: true, valor: 0 },

    // ===== RESULTADO FINAL =====
    { nombre: 'Pasivo + Capital', tipo: 'Resultado', requiereInput: false, calculada: true, valor: 0 }
  ];

  // Métodos para usar desde el template (evita usar arrow funcs en el HTML)
  getAccountsByType(tipo: string): Cuenta[] {
    return this.accounts.filter(acc => acc.tipo === tipo);
  }

  getValor(nombre: string): number {
    return this.accounts.find(acc => acc.nombre === nombre)?.valor || 0;
  }

  private setValor(nombre: string, valor: number) {
    const c = this.accounts.find(acc => acc.nombre === nombre);
    if (c) c.valor = Number(valor) || 0;
  }

  // Suma de cuentas por tipo (excluye cuentas calculadas)
  private sumByType(tipo: string, excludeNames: string[] = []): number {
    return this.accounts
      .filter(a => a.tipo === tipo && !a.calculada && excludeNames.indexOf(a.nombre) === -1)
      .reduce((s, a) => s + (Number(a.valor) || 0), 0);
  }

  // Lógica para calcular totales (subgrupos y totales finales)
  updateCalculatedAccounts(): void {
    // ---- Activo Circulante ----
    const activoCirculante = this.sumByType('Activo Circulante');
    this.setValor('Activo Circulante Total', activoCirculante);

    // ---- Activo No Circulante ----
    // excluimos las cuentas correctivas (depreciación/amortización) del sumado y luego las restamos
    const exclActNC = ['Depreciación acumulada', 'Amortización acumulada de intangibles'];
    const activoNoCirculanteBase = this.sumByType('Activo No Circulante', exclActNC);
    const depres = this.getValor('Depreciación acumulada');
    const amort = this.getValor('Amortización acumulada de intangibles');
    const activoNoCirculante = activoNoCirculanteBase - depres - amort;
    this.setValor('Activo No Circulante Total', activoNoCirculante);

    // ---- Activo Total ----
    const activoTotal = activoCirculante + activoNoCirculante;
    this.setValor('Activo Total', activoTotal);

    // ---- Pasivos ----
    const pasivoCirculante = this.sumByType('Pasivo Circulante');
    this.setValor('Total Pasivo Circulante', pasivoCirculante);

    const pasivoNoCirculante = this.sumByType('Pasivo No Circulante');
    this.setValor('Total Pasivo No Circulante', pasivoNoCirculante);

    const pasivoTotal = pasivoCirculante + pasivoNoCirculante;
    this.setValor('Pasivo Total', pasivoTotal);

    // ---- Capital ----
    const capitalTotal = this.sumByType('Capital');
    this.setValor('Capital Total', capitalTotal);

    // ---- Resultado final (Pasivo + Capital) ----
    this.setValor('Pasivo + Capital', pasivoTotal + capitalTotal);
  }
}

// Interface
export interface Cuenta {
  nombre: string;
  tipo: string;
  valor: number;
  requiereInput: boolean;
  calculada?: boolean;
}
