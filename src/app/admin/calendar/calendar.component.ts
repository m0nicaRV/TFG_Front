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
import { endOfISOWeek, format, startOfISOWeek } from 'date-fns';
import { addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { CrearComponent } from '../crear/crear.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MesComponent ,SelectButton,CommonModule, DatePickerModule, FormsModule, SemanaComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  citas: Cita[] = [];
  events: any[] = [];
  options: string[] = ['Semana', 'Mes'];
  value: string = this.options[0];
  rangeDates: Date[] = [];
  suma:number=7;
  month!: string;

  constructor(public dialog:MatDialog,private route:Router,private citaService: CitaService, private googleCalendarService: CalendarService) { 
      this.rangeDates[0] = new Date();
  }


  changeSuma(){
    if(this.value=='Semana'){
      this.suma=7;
    }else{
      this.suma=30;
    }
   this.dataPick();
  }

  next(suma:number){
    this.rangeDates[0]= addDays(this.rangeDates[0],suma);
    this.rangeDates=[(startOfISOWeek(this.rangeDates[0])), (endOfISOWeek(this.rangeDates[0]))];
  }

  dataPick(){
    this.month= format(this.rangeDates[0], 'MMMM', { locale: es });
    this.rangeDates=[(startOfISOWeek(this.rangeDates[0])), (endOfISOWeek(this.rangeDates[0]))];


  }

  

    ngOnInit() {
      this.dataPick();
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

  crearEvento() {
          const dialogRef = this.dialog.open(CrearComponent, {
            width: '700px',
            height: '500px',
            data: { },
          });
    }

 

  onSubmit() {
  
  }

   

  

  
}
