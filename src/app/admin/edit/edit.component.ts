import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { DayComponent } from '../day/day.component';
import { CalendarService } from '../../service/calendar.service';
import { dateValidator } from '../../validators/date';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, FormsModule, DatePicker, FloatLabel, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  @Input() eventId!: string;
  citaId!: number;

  eventForm!: FormGroup;
  constructor(
    public calendarService: CalendarService,
    public formBuilder: FormBuilder,
  ) {
    this.eventForm = new FormGroup({
      summary: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    },{
      validators: [dateValidator('start', 'end')]
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
          if(event.extendedProperties){
              this.citaId = event.extendedProperties.private.cita_id;
          }else{
            this.citaId = 0;
          }
          
    });
    
  }
  

  EditCalendarEvent() {
    console.log('HOLAAAAAAAAAAAAAA');
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
      extendedProperties: {
        private: {
          cita_id: this.citaId,
        },
      },
    };
    if(this.citaId > 0){
       const eventApi = {
          fecha_inicio: format(startDateTime, 'yyyy-MM-dd HH:mm:ss'),
          fecha_fin: format(endDateTime, 'yyyy-MM-dd HH:mm:ss'),
      }
      this.calendarService.aceptEvent(this.citaId, eventApi).subscribe(
        (response) => {
            console.log('Evento Editado en la apii:', response);
            this.editEventGoogle(event);
        },
        (error) => {
           console.error('Error al aceptar el evento:', error);
        });
    }
    this.editEventGoogle(event);
  }

  editEventGoogle(event: any) { 
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
