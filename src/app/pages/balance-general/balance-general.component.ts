import { CommonModule, NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
    { nombre: 'Inventarios / Almacén de mercancías', tipo: 'Activo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Anticipo a proveedores', tipo: 'Activo Circulante', requiereInput: false, valor: 0 },
    { nombre: 'Activo Circulante Total', tipo: 'Activo Circulante', requiereInput: false, calculada: true, valor: 0 },

    // ===== ACTIVO - NO CIRCULANTE (TANGIBLE) =====
    { nombre: 'Terrenos', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Edificios', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Mobiliario y equipo de oficina', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Equipo de transporte', tipo: 'Activo No Circulante', requiereInput: false, valor: 0 },
    { nombre: 'Equipo de cómputo', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Depositos en garantía', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    // cuenta correctiva (restará)
    { nombre: 'Depreciación acumulada', tipo: 'Activo No Circulante', requiereInput: false, valor: 0 },

    // ===== ACTIVO - NO CIRCULANTE (INTANGIBLE) =====
    { nombre: 'Gastos de organización', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },

    // ===== OTROS ACTIVOS NO CIRCULANTES =====
    { nombre: 'Papelería y Utiles', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Documentos por cobrar a largo plazo', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Gastos de instalación', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Primas de seguros', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Gastos en mercadotecnia', tipo: 'Activo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Activo No Circulante Total', tipo: 'Activo No Circulante', requiereInput: false, calculada: true, valor: 0 },

    // ===== TOTAL ACTIVO =====
    { nombre: 'Activo Total', tipo: 'Activo', requiereInput: false, calculada: true, valor: 0 },

    // ===== PASIVO - CIRCULANTE =====
    { nombre: 'Proveedores', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Documentos por pagar (corto plazo)', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Acreedores diversos', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Anticipo de clientes', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Impuestos por pagar (ISR, IMSS, etc.)', tipo: 'Pasivo Circulante', requiereInput: false, valor: 0 },
    { nombre: 'Sueldos y salarios por pagar', tipo: 'Pasivo Circulante', requiereInput: false, valor: 0 },
    { nombre: 'Intereses por pagar', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Rentas cobradas por anticipado', tipo: 'Pasivo Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Dividendos por pagar', tipo: 'Pasivo Circulante', requiereInput: false, valor: 0 },
    { nombre: 'Total Pasivo Circulante', tipo: 'Pasivo Circulante', requiereInput: false, calculada: true, valor: 0 },

    // ===== PASIVO - NO CIRCULANTE =====
    { nombre: 'Documentos por pagar a largo plazo', tipo: 'Pasivo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Préstamos bancarios a largo plazo', tipo: 'Pasivo No Circulante', requiereInput: false, valor: 0 },
    { nombre: 'Hipotecas por pagar', tipo: 'Pasivo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Intereses cobrados por anticipado', tipo: 'Pasivo No Circulante', requiereInput: true, valor: 0 },
    { nombre: 'Total Pasivo No Circulante', tipo: 'Pasivo No Circulante', requiereInput: false, calculada: true, valor: 0 },

    // ===== TOTAL PASIVO =====
    { nombre: 'Pasivo Total', tipo: 'Pasivo', requiereInput: false, calculada: true, valor: 0 },

    // ===== CAPITAL CONTABLE =====
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

    // ---- Capital Contable----
    const capitalContable = activoTotal - pasivoTotal;
    this.setValor('Capital Total', capitalContable);

    // ---- Resultado final (Pasivo + Capital) ----
    this.setValor('Pasivo + Capital', pasivoTotal + capitalContable);
  }

  generatePDF(){
 const doc = new jsPDF({
  orientation: "p",
  unit: "mm",
  format: [210, 400],
});//tamaño del pdf

  // 🎨 Colors and Fonts
  const pink = "#FB2576";
  const purple = "#150050";
  const lightPurple = "#C9A7EB";
  const lineHeight = 7;// Espaciado entre las cuentas
  let y = 20;

  //  HEADER
  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(purple);
  doc.text(this.titulo || "Balance General", 105, y, { align: "center" });

  y += lineHeight;
  doc.setFontSize(12);
  doc.setTextColor(pink);
  doc.text(this.nombre || "Nombre de la Empresa", 105, y, { align: "center" });

  y += lineHeight;
  doc.setFontSize(10);
  doc.setTextColor("#555");
  doc.text(this.periodo || "Periodo no especificado", 105, y, { align: "center" });

  y += 10;

  //  Decorative line
  doc.setDrawColor(pink);
  doc.setLineWidth(1.5);
  doc.line(20, y, 190, y);
  y += 10;

  // 🗂️ Helper to draw sections
  const drawSection = (title: string, items: Cuenta[], color:string) => {
    if (!items.length) return;

    // Section title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(color);
    doc.text(title, 20, y);
    y += 8;

    // Rounded background box (optional, adds cuteness ✨)
    const startY = y - 3;
    const boxHeight = items.length * (lineHeight - 2) + 6;
    doc.setFillColor(255, 245, 255); // light pastel bg
    doc.roundedRect(18, startY, 175, boxHeight, 3, 3, "F");

    // Items
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#333");

    items.forEach(item => {
      doc.text(item.nombre, 25, y);
      doc.text(item.valor.toLocaleString("es-MX", { style: "currency", currency: "MXN" }), 180, y, { align: "right" });
      y += lineHeight - 2;
    });

    y += 6;
  };

        // 🧾 Agrupar por tipo
      const activosC = this.accounts.filter(a => a.tipo === 'Activo Circulante');
      const activosNC = this.accounts.filter(a => a.tipo === 'Activo No Circulante');
      const pasivosC = this.accounts.filter(a => a.tipo === 'Pasivo Circulante');
      const pasivosNC = this.accounts.filter(a => a.tipo === 'Pasivo No Circulante');
      const capital = this.accounts.filter(a => a.tipo === 'Capital');
      const totales = this.accounts.filter(a => a.tipo === 'Resultado' || a.tipo === 'Activo' || a.tipo === 'Pasivo')

// ✨ Dibujar cada bloque
      drawSection('Activo Circulante', activosC, '#2563EB');
      drawSection('Activo No Circulante', activosNC, '#2563EB');
      drawSection('Pasivo Circulante', pasivosC, '#9333EA');
      drawSection('Pasivo No Circulante', pasivosNC, '#9333EA');
      drawSection('Capital Contable', capital, '#D63384');
      drawSection('Totales', totales, '#000000');

  // 📝 Footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor("#888");
  doc.text(
    "Generado automáticamente por el sistema de Balance General",
    105, // centrado
    285,
    { align: "center" }
  );

  // 💾 Guardar el PDF
  const filename = `BG_${this.nombre || "Empresa"}_${this.periodo || "Periodo"}.pdf`;
  doc.save(filename);

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
