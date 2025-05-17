import { Component,Input } from '@angular/core';
import { Events } from '../../models/events';
import { CommonModule } from '@angular/common';
import { format, FormatDateOptions } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarService } from '../calendar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-day',
  imports: [ CommonModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {
  @Input() events!: any;

  day!: any;

  constructor(private calendarService: CalendarService, public router: Router) {
   

  }

  cerrar() {
    
  }

  eliminarEvento(event: Events) {
  
    this.calendarService.deleteEvent(event).subscribe(
      (response) => {
        console.log('Evento eliminado:', response);
         this.router.navigate(['/admin/calendar']);
      }
    );
  }

  editarEvento(event: Events) {
      }

}
