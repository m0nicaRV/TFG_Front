import { Component } from '@angular/core';
import { CitaService } from '../../citas/cita.service';
import {Cita} from '../../models/cita';


@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  citas: Cita[] = [];
  constructor(private citaService: CitaService) { }

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

  googleCalendar(){
    this.citaService.googleCalendar().subscribe(
      (data: any) => {
        console.log(data);
      }
    );

  }

 
}
