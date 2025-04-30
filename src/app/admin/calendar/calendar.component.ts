import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  citas: { nombre: string, dolencia: string, times: { inicio: string; fin: string; semana: string }[] }[] = [
    {
      nombre: 'Juan Perez',
      dolencia: 'Dolor de cabeza',
      times: [
        { inicio: '09:00', fin: '10:00', semana: 'Lunes' },
        { inicio: '11:00', fin: '12:00', semana: 'Martes' }
      ]
    },
    {
      nombre: 'Ana Garcia',
      dolencia: 'Resfriado',
      times: [
        { inicio: '10:30', fin: '11:30', semana: 'Miércoles' },
        { inicio: '14:00', fin: '15:00', semana: 'Jueves' }
      ]
    },
    {
      nombre: 'Carlos Ruiz',
      dolencia: 'Dolor muscular',
      times: [
        { inicio: '08:00', fin: '09:00', semana: 'Viernes' },
        { inicio: '13:00', fin: '14:00', semana: 'Sábado' }
      ]
    },
    {
      nombre: 'María López',
      dolencia: 'Fiebre',
      times: [
        { inicio: '07:00', fin: '08:00', semana: 'Lunes' },
        { inicio: '12:00', fin: '13:00', semana: 'Miércoles' }
      ]
    }
  ];

}
