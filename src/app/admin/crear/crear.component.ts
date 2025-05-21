import { Component, Inject, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
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
import { dateValidator } from '../../validators/date';


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
  @Output() formSubmitted = new EventEmitter<any>();
  @Input() cita : Cita | null = null;
  filterUser: User[] = [];
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
    },{
      validators: dateValidator('start', 'end'),
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
       extendsProperties: {
              private: {
                cita_id: 0,
              }
        }
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
          if(this.cita?.id){
             event.extendsProperties.private.cita_id = this.cita.id;
          }
          this.eventCalendar(event);
        },
        (error) => {
          console.error('Error al aceptar el evento:', error);
        });
    }else{
      this.eventCalendar(event);
    }
  }

  eventCalendar(event : any){
    this.calendarService.createEvent(event).subscribe(
      (response) => {
        console.log('Evento creado:', response); 
         this.eventForm.reset();
        this.formSubmitted.emit();
      },
      (error) => {
        console.error('Error al crear el evento:', error);
      }
    );
  }
  
  showDialog() {}


  search(event: any) {
   let users : any=[]
    const query = event.query;
    for(let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        console.log()
        users.push(user);
      }
    }
    this.filterUser = users;
    console.log('Usuariosfiltrados :', this.filterUser);
  }
}
