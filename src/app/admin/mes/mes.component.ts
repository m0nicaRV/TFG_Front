import { Component, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { endOfMonth, getISOWeek, startOfISOWeek, startOfMonth } from 'date-fns';
import { CalendarService } from '../calendar.service';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addMonths } from 'date-fns';
import { calendar } from '../../environments/environments';




@Component({
  selector: 'app-mes',
  imports: [DatePickerModule, CommonModule, FormsModule, ],
  templateUrl: './mes.component.html',
  styleUrl: './mes.component.css'
})
export class MesComponent {
  selectedMonth : Date =  calendar.day; 
  events :any []=[];

  diasMes!: {semana : {key:number , fecha:Date ; events: any[]}[]}[];
  
constructor(private calendarService: CalendarService) {}

    datePick(){
    this.diasMes = [];
    const primerDia = new Date(startOfMonth(this.selectedMonth));
    const ultimoDia = new Date(endOfMonth(this.selectedMonth));
    calendar.day=primerDia;
    this.getEvents();
    let semana = [];
    for(let i=getISOWeek(primerDia); i<=getISOWeek(ultimoDia); i++){
        semana = this.calendarService.calcularSemana(startOfISOWeek(primerDia));
        console.log('Semana:', semana);
        this.diasMes.push({ semana: semana });
        //console.log(startOfISOWeek(primerDia));
        primerDia.setDate(primerDia.getDate() + 7);
      }
    }

    addEvents() {

    }

  next(suma:number) {
    this.selectedMonth=addMonths(this.selectedMonth,suma);
    this.datePick();
  }
  ngOnInit() {
    this.datePick();
  }

  getEvents(){
    this.calendarService.events(startOfMonth(calendar.day), endOfMonth(calendar.day)).subscribe(
      (data: any) => {
        console.log('Events:', data);
        this.events = data.items;
      },
      (error) => {
        console.error('Error fetching events:', error); 
      }
    );

    }

  }
  







