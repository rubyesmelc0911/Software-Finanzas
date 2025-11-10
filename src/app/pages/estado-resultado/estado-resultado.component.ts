import { CommonModule, NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
 import jsPDF from 'jspdf';
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
  { nombre: 'Participación de los Trabajadores (PTU)', tipo: 'Gasto', requiereInput: true, valor: 0 },
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
  //Ingresos, AQUI VAN LOS VALORES QUE INGRESA EL USUARIO PARA QUE USES EN TUS CALCULOS
  const ventasNetas = this.accounts.find(acc => acc.nombre === 'Ventas Netas')?.valor || 0;
  const devolucionSVentas = this.accounts.find(acc => acc.nombre === 'Devoluciones sobre Ventas')?.valor || 0;
  const descuentoSVentas = this.accounts.find(acc => acc.nombre === 'Descuentos sobre Ventas')?.valor || 0;
  const otrosIngresos = this.accounts.find(acc=> acc.nombre=='Otros Ingresos')?.valor || 0;
  const otrosGastos = this.accounts.find(acc=> acc.nombre=='Otros Gastos')?.valor || 0;
  const impuestoSobreRenta = this.accounts.find(acc=> acc.nombre=='Impuesto sobre la Renta')?.valor || 0;
  const ptu = this.accounts.find(acc=> acc.nombre=='Participación de los Trabajadores (PTU)')?.valor || 0;
  //Costos
  const costoVentas = this.accounts.find(acc => acc.nombre === 'Costo de Ventas')?.valor || 0;
  //Gastos
  const gastosVenta = this.accounts.find(acc => acc.nombre === 'Gastos de Venta')?.valor || 0;
  const gastosAdministracion = this.accounts.find(acc => acc.nombre === 'Gastos de Administración')?.valor || 0;


  //agregando los resultados a las propiedades del arreglo, AQUI VAN LOS CALCULADOS POR EL PROGRAMA
  const ingresosTotales = this.accounts.find(acc=> acc.nombre === 'Ingresos Totales');
  if(ingresosTotales){ ingresosTotales.valor = ventasNetas - devolucionSVentas - descuentoSVentas;}

  const utilidadBruta = this.accounts.find(acc=> acc.nombre === 'Utilidad Bruta');
  if(utilidadBruta && ingresosTotales){ utilidadBruta.valor = ingresosTotales.valor - costoVentas;}

  const gastosOperacion = this.accounts.find(acc=> acc.nombre === 'Gastos de Operación Totales');
  if(gastosOperacion){ gastosOperacion.valor = gastosVenta + gastosAdministracion;}

  const utilidadOperacion = this.accounts.find(acc=> acc.nombre === 'Utilidad de Operación');
  if(utilidadOperacion && utilidadBruta && gastosOperacion){ utilidadOperacion.valor = utilidadBruta.valor - gastosOperacion.valor;}

  const utilidadAntesImpuestos = this.accounts.find(acc=> acc.nombre === 'Utilidad antes de Impuestos');
  if(utilidadAntesImpuestos && utilidadOperacion){ utilidadAntesImpuestos.valor = utilidadOperacion.valor + otrosIngresos - otrosGastos ;}

  const impuestosTotales = this.accounts.find(acc=> acc.nombre === 'Impuestos Totales');
  if(impuestosTotales){ impuestosTotales.valor = impuestoSobreRenta + ptu;}

  const utilidadNeta = this.accounts.find(acc=> acc.nombre === 'Utilidad Neta');
  if(utilidadNeta && utilidadAntesImpuestos && impuestosTotales){ utilidadNeta.valor = utilidadAntesImpuestos.valor - impuestosTotales.valor;}

}

generatePDF(){
 const doc = new jsPDF();

  // 🎨 Colors and Fonts
  const pink = "#FB2576";
  const purple = "#150050";
  const lightPurple = "#C9A7EB";
  const lineHeight = 10;
  let y = 20;

  //  HEADER
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(purple);
  doc.text(this.titulo || "Estado de Resultados", 105, y, { align: "center" });

  y += lineHeight;
  doc.setFontSize(14);
  doc.setTextColor(pink);
  doc.text(this.nombre || "Nombre de la Empresa", 105, y, { align: "center" });

  y += lineHeight;
  doc.setFontSize(12);
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
    doc.setFontSize(14);
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
    doc.setFontSize(12);
    doc.setTextColor("#333");

    items.forEach(item => {
      doc.text(item.nombre, 25, y);
      doc.text(item.valor.toLocaleString("es-MX", { style: "currency", currency: "MXN" }), 180, y, { align: "right" });
      y += lineHeight - 2;
    });

    y += 6;
  };

  // 💰 Group accounts
  const ingresos = this.accounts.filter(a => a.tipo === "Ingreso");
  const costos = this.accounts.filter(a => a.tipo === "Costo");
  const resultados = this.accounts.filter(a => a.tipo === "Resultado");

  // ✨ Draw each section
  drawSection("Ingresos", ingresos, "#D63384");
  drawSection("Costos", costos, "#9333EA");
  drawSection("Resultados", resultados, "#2563EB");

  //  Footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor("#888");


  // 💾 Save the PDF
  const filename = `ER_${this.nombre || "Empresa"}_${this.periodo || "Periodo"}.pdf`;
  doc.save(filename);
}

}
export interface Cuenta{
  nombre: string;
  tipo: string;
  valor: number;
  requiereInput: boolean;
  calculada?: boolean;
}
