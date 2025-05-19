import { Component, Inject, Input } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { User } from '../../models/user';
import { AutoComplete } from 'primeng/autocomplete';
import { Cita } from '../../models/cita';
import {format } from 'date-fns';


@Component({
  selector: 'app-crear',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    DatePickerModule,
    FloatLabel,
    AutoComplete

  ],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css',
})
export class CrearComponent {
  
  @Input() cita : Cita | null = null;
  eventForm!: FormGroup;
  users: User[] = [];
  selectUser :User[] = [];
  constructor(
    
    private formBuilder: FormBuilder,
    private calendarService: CalendarService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      (response) => {
        this.users = response;
        console.log('Usuarios:', this.users);
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );

    this.eventForm = new FormGroup({
      summary: new FormControl('', [Validators.required]),
      date:new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    });

    if(this.cita !== null){
      this.eventForm.get('summary')?.setValue(this.cita.user?.name);

    }
  }

  createCalendarEvent() {

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
    console.log('fecha_inicio:', startDateTime);
    console.log('fecha_fin:', endDateTime);
    if(this.cita !== null){
      const eventApi = {
        fecha_inicio: format(startDateTime, 'yyyy-MM-dd HH:mm:ss'),
        fecha_fin: format(endDateTime, 'yyyy-MM-dd HH:mm:ss'),
      }
      this.calendarService.aceptEvent(this.cita.id, eventApi).subscribe(
        (response) => {
          console.log('Evento aceptado:', response);
        },
        (error) => {
          console.error('Error al aceptar el evento:', error);
        }
      );




    }

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
  showDialog() {}


  search(event: any) {
   this.selectUser=[]
    const query = event.query;
    for(let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user.name.toLowerCase().includes(query.toLowerCase())) {
        this.selectUser.push(user);
      }
    }
  }
}
