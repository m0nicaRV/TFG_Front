import { Component,Input, Output } from '@angular/core';
import { Events } from '../../models/events';
import { CommonModule } from '@angular/common';
import { format, FormatDateOptions } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarService } from '../../service/calendar.service';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { EditComponent } from '../edit/edit.component';


@Component({
  selector: 'app-day',
  imports: [ CommonModule, DialogModule, EditComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {
  @Input() events!: any;
  editar: boolean = false;

  day!: any;

  constructor(public calendarService: CalendarService, public router: Router) {
    this.day = new Date();
   

  }

  eliminarEvento(event: any) {
    console.log("evento a eliminar",event);
   if(event.extendedProperties && event.extendedProperties.private.cita_id >0){
        this.calendarService.eliminarCita(event.extendedProperties.private.cita_id).subscribe(
          (response) => {
            console.log('Cita eliminada:', response);
          } )
    }
  
    this.calendarService.deleteEvent(event.id).subscribe(
      (response) => {
        console.log('Evento eliminado:', response);
      }
    );
  }

  editarEvento() {
    this.editar=!this.editar;
  }


}
