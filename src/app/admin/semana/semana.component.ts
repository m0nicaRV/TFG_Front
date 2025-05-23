import { Component, SimpleChanges } from '@angular/core';
import {
  getISOWeek,
  startOfISOWeek,
  endOfISOWeek,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { Input } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarService } from '../../service/calendar.service';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Events } from '../../models/events';
import { DayComponent } from '../day/day.component';
import { DialogModule } from 'primeng/dialog';



@Component({
  selector: 'app-semana',
  imports: [DialogModule,DatePickerModule, CommonModule, FormsModule, DayComponent],
  templateUrl: './semana.component.html',
  styleUrl: './semana.component.css',
})
export class SemanaComponent {
  @Input() day: Date = new Date();
  weekNumber!: Date;
  diasSemana: { key: number; fecha: Date; events: any[] , visible:boolean}[] = [];
  month!: string;
  rangeDates: Date[] = [];
  events: Events[] = [];

  constructor(private calendarService: CalendarService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['day']) {
      this.rangeDates[0] = changes['day'].currentValue;
      this.semana(this.rangeDates[0]);
    }
  }

  dataPick() {
    this.month = format(this.rangeDates[0], 'MMMM', { locale: es });
    this.rangeDates[0] = startOfISOWeek(this.rangeDates[0]);
    this.rangeDates[1] = endOfISOWeek(this.rangeDates[0]);
    this.semana(this.rangeDates[0]);
  }

  semana(dia: Date) {
    this.diasSemana = this.calendarService.calcularSemana(startOfISOWeek(dia));
    this.month = format(dia, 'MMMM', { locale: es });
    this.getEvents();
  }



  ngOnInit() {
    this.rangeDates= [startOfISOWeek(this.day), endOfISOWeek(this.day)];
    
    
  }

  getEvents() {
    this.calendarService
      .events(startOfISOWeek(this.day), endOfISOWeek(this.day))
      .subscribe(
        (data: any) => {
          console.log('Eventos de la semana:', data);
          this.events = data.items;
          this.getEventItems();
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
  }

  getEventItems() {
    this.diasSemana.forEach((dia) => {
      dia.events = this.events.filter((event: any) => {
        const eventDate = new Date(event.start.dateTime);
        return eventDate.toDateString() === dia.fecha.toDateString();
      });
    });
  }



      toggleDia(dia: any, open: boolean) {
        this.getEvents();
        dia.visible = open;
    }
}
