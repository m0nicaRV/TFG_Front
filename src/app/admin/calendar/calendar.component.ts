import { Component, OnInit , OnDestroy} from '@angular/core';
import { CitaService } from '../../citas/cita.service';
import {Cita} from '../../models/cita';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  citas: Cita[] = [];
  

  constructor(private citaService: CitaService, private googleCalendarService: CalendarService) { }

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
  }

  
}
