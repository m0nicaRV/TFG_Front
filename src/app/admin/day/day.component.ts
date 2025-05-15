import { Component, Inject } from '@angular/core';
import { Events } from '../../models/events';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { format, FormatDateOptions } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-day',
  imports: [MatDialogModule, CommonModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {
  events!: any ;
  day!: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {events: Events[], dia:Date},public dialogRef: MatDialogRef<DayComponent>) {
    this.events = data.events;
   this.day = format(data.dia, 'd \' de \' MMMM \' del \' yyyy', { locale: es });
    console.log('Eventos:', this.events);

  }

  cerrar() {
    this.dialogRef.close();
  }

  eliminarEvento(event: Events) {
    
  }

  editarEvento(event: Events) {
      }

}
