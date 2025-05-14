import { Component, SimpleChanges } from '@angular/core';
import{getISOWeek, startOfISOWeek, endOfISOWeek} from 'date-fns';
import { Input } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'
import  {CalendarService} from '../calendar.service';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { calendar } from '../../environments/environments';

@Component({
  selector: 'app-semana',
  imports: [DatePickerModule, CommonModule, FormsModule],
  templateUrl: './semana.component.html',
  styleUrl: './semana.component.css'
})
export class SemanaComponent {
  weekNumber!: Date;
  diasSemana:  { key: number; fecha: Date; events: any[] }[] = [];
  month!: string;
  rangeDates: Date[] = [];


  constructor(private calendarService: CalendarService) {}

  dataPick(){
    this.month = format(this.rangeDates[0], 'MMMM', { locale: es });
    console.log('Selected date:', this.rangeDates);    
    this.rangeDates [0]= (startOfISOWeek(this.rangeDates[0]));
    this.rangeDates [1]= (endOfISOWeek(this.rangeDates[0]));
    calendar.day=this.rangeDates[0];
    this.semana(this.rangeDates[0]);
    }

  semana(dia:Date){
    this.diasSemana=this.calendarService.calcularSemana(startOfISOWeek(dia));
    this.month = format(dia, 'MMMM', { locale: es });
  }

  next(suma:number){
    const dia =this.rangeDates[0];

    dia.setDate(dia.getDate() + suma);
    this.semana(dia);
    this.rangeDates[0] = this.diasSemana[0].fecha;
    this.rangeDates[1] = this.diasSemana[6].fecha;
    console.log('Selected date:', this.rangeDates);

  }


  ngOnInit() {
    this.rangeDates[0] = calendar.day;
    this.dataPick();
  }

  

}
