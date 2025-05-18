import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { DayComponent } from '../day/day.component';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, FormsModule, DatePicker, FloatLabel, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  @Input() eventId!: string;

  eventForm!: FormGroup;
  constructor(
    private calendarService: CalendarService,
    private formBuilder: FormBuilder,
  ) {
    this.eventForm = new FormGroup({
      summary: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    });
  }




  ngOnInit(): void {

    this.calendarService.getEvent(this.eventId).subscribe((event) => {
      this.eventForm.patchValue({
        summary: event.summary,
        date: new Date( event.start.dateTime),
        start: new Date(event.start.dateTime) ,
        end: new Date(event.end.dateTime),
      });
    })
  }
  

  EditCalendarEvent() {
      const dateValue: Date = this.eventForm.get('date')?.value;
    const startTimeString: string = this.eventForm.get('start')?.value;
    const endTimeString: string = this.eventForm.get('end')?.value;
     
    
    const datestart= new Date(startTimeString).setDate(dateValue.getDate())
    const dateend= new Date(endTimeString).setDate(dateValue.getDate());

    const startDateTime = new Date(datestart).toISOString() ;
    const endDateTime = new Date(dateend).toISOString();

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

    this.calendarService.updateEvent(this.eventId,event).subscribe(
      (response) => {
        console.log('Evento creado:', response);
      },
      (error) => {
        console.error('Error al crear el evento:', error);
      }
    );


  }

}
