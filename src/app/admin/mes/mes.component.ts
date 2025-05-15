import { Component, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { endOfMonth, getISOWeek, startOfISOWeek, startOfMonth } from 'date-fns';
import { CalendarService } from '../calendar.service';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addMonths } from 'date-fns';
import { Events } from '../../models/events';

@Component({
  selector: 'app-mes',
  imports: [DatePickerModule, CommonModule, FormsModule],
  templateUrl: './mes.component.html',
  styleUrl: './mes.component.css',
})
export class MesComponent {
  selectedMonth: Date = new Date();
  @Input() day: Date = new Date();
  events: Events[] = [];

  diasMes!: { semana: { key: number; fecha: Date; events: any[] }[] }[];

  constructor(private calendarService: CalendarService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['day']) {
      this.selectedMonth = changes['day'].currentValue;
      this.datePick();
    }
  }

  datePick() {
    this.diasMes = [];
    const primerDia = new Date(startOfMonth(this.selectedMonth));
    const ultimoDia = new Date(endOfMonth(this.selectedMonth));
    this.getEvents();
    let semana = [];
    for (let i = getISOWeek(primerDia); i <= getISOWeek(ultimoDia); i++) {
      semana = this.calendarService.calcularSemana(startOfISOWeek(primerDia));
      console.log('Semana:', semana);
      this.diasMes.push({ semana: semana });
      //console.log(startOfISOWeek(primerDia));
      primerDia.setDate(primerDia.getDate() + 7);
    }
  }

  addEvents() {}

  next(suma: number) {
    this.selectedMonth = addMonths(this.selectedMonth, suma);
    this.datePick();
  }
  ngOnInit() {
    this.datePick();
  }

  getEvents() {
    this.calendarService
      .events(startOfMonth(this.day), endOfMonth(this.day))
      .subscribe(
        (data: any) => {
          this.events = data.items;
          this.getEventItems();
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
  }

  getEventItems() {
    this.diasMes.forEach((semana) => {
      semana.semana.forEach((dia) => {
        dia.events = this.events.filter((event: any) => {
          const eventDate = new Date(event.start.dateTime);
          return eventDate.toDateString() === dia.fecha.toDateString();
        });
      });
    });
  }
}
