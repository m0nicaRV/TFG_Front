import { Component, OnInit , OnDestroy} from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { CitaService } from '../../citas/cita.service';
import {Cita} from '../../models/cita';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FloatLabel } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { SemanaComponent } from '../semana/semana.component';
import {SelectButton} from 'primeng/selectbutton';
import { MesComponent } from '../mes/mes.component';
import { endOfISOWeek, startOfISOWeek } from 'date-fns';



@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MesComponent ,SelectButton,CommonModule, DatePickerModule, FloatLabel, FormsModule, SemanaComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  today: Date ;
  citas: Cita[] = [];
  events: any[] = [];
  options: string[] = ['Semana', 'Mes'];
  value: string = this.options[0];
  rangeDates: Date[] = [];

  constructor(private route:Router,private citaService: CitaService, private googleCalendarService: CalendarService) { 
      this.today = new Date();
  }


  dataPick(){
    console.log('Selected date:', this.rangeDates);
      this.rangeDates [0]= (startOfISOWeek(this.rangeDates[0]));
      this.rangeDates [1]= (endOfISOWeek(this.rangeDates[0]));
  }


    ngOnInit() {
      this.citaService.index().subscribe(
        (data: any) => {
          this.citas = data;
          console.log(this.citas);

        },
        (error) => {
          console.error('Error fetching citas:', error);
        }
      );
      this.googleCalendarService.init();
    }

  public signOut(){
    this.googleCalendarService.resetAuthToken();
    this.route.navigate(['/']);
  }

  public getEvents() {
    /*this.googleCalendarService.events().subscribe(
      (data: any) => {
        console.log('Events:', data);
        this.events = data.items;

        
      },
      (error) => {
        console.error('Error fetching events:', error);
        
      }
    );*/
  }

  onSubmit() {
  
  }

   

  

  
}
