import { Component, OnInit , OnDestroy} from '@angular/core';
import { CitaService } from '../../citas/cita.service';
import {Cita} from '../../models/cita';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  citas: Cita[] = [];
  googleApi: any;
  events: any[] = [];
  

  constructor(private route:Router,private citaService: CitaService, private googleCalendarService: CalendarService) { }

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


    if (this.googleCalendarService.getAuthToken()) {
        console.log('Token:', this.googleCalendarService.getAuthToken());
      } else {
        console.log('Initializing Google Token Client...'); // Añade esto
        this.googleApi = google.accounts.oauth2.initTokenClient({
          client_id: '901640707227-rkhpj544mg15h2avo64mf0juk4n510ut.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/calendar',
          callback: (response: any) => {
            console.log('Response:', response);
            this.googleCalendarService.setAuthToken(response.access_token);
            this.handleAuthResult(response);
          }
        });

        this.googleApi.requestAccessToken();
      }     
    
  }



  private handleAuthResult(response: any) {
    console.log('Auth Response:', response);
    if (response && response.access_token) {
      console.log('Access Token:', response.access_token);
    } else {
      console.error('Authentication failed:', response.error);
    }
  }

  public signOut(){
    this.googleCalendarService.resetAuthToken();
    this.route.navigate(['/']);
  }

  public getEvents() {
    this.googleCalendarService.events().subscribe(
      (data: any) => {
        console.log('Events:', data);
        this.events = data.items;

        
      },
      (error) => {
        console.error('Error fetching events:', error);
        
      }
    );
  }

   

  

  
}
