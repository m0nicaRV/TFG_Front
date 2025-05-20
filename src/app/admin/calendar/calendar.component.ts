import { Component, OnInit , OnDestroy} from '@angular/core';
import { CitaService } from '../../citas/cita.service';
import {Cita} from '../../models/cita';
import { CalendarService } from '../calendar.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { SemanaComponent } from '../semana/semana.component';
import {SelectButton} from 'primeng/selectbutton';
import { MesComponent } from '../mes/mes.component';
import { endOfISOWeek, format, startOfISOWeek } from 'date-fns';
import { addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { CrearComponent } from '../crear/crear.component';
import { DialogModule } from 'primeng/dialog';
import { AuthStateService } from '../../shared/auth-state.service';



@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MesComponent, SelectButton, CommonModule, DatePickerModule, FormsModule, SemanaComponent, DialogModule, CrearComponent],
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
  visibleEvento: boolean = false;

  constructor( public authState: AuthStateService,private route:Router,private citaService: CitaService, private googleCalendarService: CalendarService) { 
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

  
    getCitas(){
      this.citaService.index().subscribe(
        (data: any) => {
            data.forEach((cita: Cita) => {
            cita.visible = false;
          });
          this.citas = data;
          console.log('Citas:',data);

        },
        (error) => {
          console.error('Error fetching citas:', error);
        }
      );
      
    }
    reload(){
      this.dataPick();
      this.getCitas();
    }

    ngOnInit() {
      this.reload();

      this.googleCalendarService.init();
    }

  public signOut(){
    this.googleCalendarService.resetAuthToken();
    this.route.navigate(['/']);
  }

  crearEvento() {
         this.visibleEvento = true;
    }

  toggleEvent( cita: Cita) {
    cita.visible= !cita.visible;

  }

  onSubmit() {
  
  }

   

  

  
}
