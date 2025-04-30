import { Component } from '@angular/core';

@Component({
  selector: 'app-view',
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  aceptadas: { fecha: string, servicio: string, inicio: string, fin: string }[] = [
    {
      fecha: new Date('2023-10-01').toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      servicio: 'Consulta General',
      inicio: '09:00',
      fin: '10:00'
    },
  ];
  anteriores: { fecha: string, servicio: string, inicio: string, fin: string }[] = [];
  pendientes: { fecha: string, servicio: string, inicio: string, fin: string }[] = [
    {
      fecha: new Date('2023-10-01').toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      servicio: 'Consulta General',
      inicio: '09:00',
      fin: '10:00'
    },
    {
      fecha: new Date('2023-10-01').toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      servicio: 'Consulta General',
      inicio: '09:00',
      fin: '10:00'
    },
    {
      fecha: new Date('2023-10-01').toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      servicio: 'Consulta General',
      inicio: '09:00',
      fin: '10:00'
    }
  ];


}
