import { Component,Input, Output } from '@angular/core';
import { Events } from '../../models/events';
import { CommonModule } from '@angular/common';
import { format, FormatDateOptions } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarService } from '../calendar.service';
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

  constructor(private calendarService: CalendarService, public router: Router) {
    this.day = new Date();
   

  }

  eliminarEvento(event: Events) {
    this.events = this.events.filter((e: any) => e.id !== event);
  
    this.calendarService.deleteEvent(event).subscribe(
      (response) => {
        console.log('Evento eliminado:', response);
      }
    );
  }

  editarEvento() {
    console.log(this.editar);
    this.editar=!this.editar;
  }


}
