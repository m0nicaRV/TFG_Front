import { Component, Inject } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-crear',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,DatePickerModule

  ],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css',
})
export class CrearComponent {
  eventForm!: FormGroup;
  constructor(
    
    private formBuilder: FormBuilder,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      summary: new FormControl('', [Validators.required]),
      date:new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    });
  }

  createCalendarEvent() {
    const dateValue: Date = this.eventForm.get('date')?.value;
    const startTimeString: string = this.eventForm.get('start')?.value;
    const endTimeString: string = this.eventForm.get('end')?.value;
    console.log('Date:', startTimeString);

    

    const [startHours, startMinutes] = startTimeString.split(':').map(Number);
    const startDate = new Date(dateValue);
    startDate.setHours(startHours, startMinutes, 0, 0);

    const [endHours, endMinutes] = endTimeString.split(':').map(Number);
    const endDate = new Date(dateValue);
    endDate.setHours(endHours, endMinutes, 0, 0);

    const startDateTime = startDate.toISOString();
    const endDateTime = endDate.toISOString();

    const event = {
      summary: this.eventForm.get('summary')?.value,
      start: {
        dateTime: startDateTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDateTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    this.calendarService.createEvent(event).subscribe(
      (response) => {
        console.log('Evento creado:', response);
      },
      (error) => {
        console.error('Error al crear el evento:', error);
      }
    );

    this.cerrar();
  }

  cerrar() {
    
  }
}
