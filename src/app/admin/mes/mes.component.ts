import { Component, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { endOfMonth, getISOWeek, startOfISOWeek, startOfMonth } from 'date-fns';
import { SemanaComponent } from '../semana/semana.component';
import { CalendarService } from '../calendar.service';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mes',
  imports: [DatePickerModule, CommonModule, FormsModule, ],
  templateUrl: './mes.component.html',
  styleUrl: './mes.component.css'
})
export class MesComponent {

  diasMes: Date[][]= [];
  
constructor(private calendarService: CalendarService) {}
  ngOnChanges(changes: SimpleChanges) {
    if(changes['today'] && changes['today'].currentValue){
      this.today = changes['today'].currentValue;
      this.diasMes = [];
      this.calcularMes(this.today);
     
    }
  }

  calcularMes(dia: Date) {
    const primerDia = new Date(startOfMonth(dia));
    const ultimoDia = new Date(endOfMonth(dia));
    let semana = [];
    for(let i=getISOWeek(primerDia); i<=getISOWeek(ultimoDia); i++){
      semana = this.calendarService.calcularSemana(startOfISOWeek(primerDia));
      console.log('Semana:', semana);
      this.diasMes.push(semana);
        //console.log(startOfISOWeek(primerDia));
        primerDia.setDate(primerDia.getDate() + 7);
      }

  }

  next() {}

  prev() {}

  ngOnInit() {
    
  }
  






}
