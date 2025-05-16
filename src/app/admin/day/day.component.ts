import { Component,Input } from '@angular/core';
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
  @Input() events!: any;

  day!: any;

  constructor() {
   

  }

  cerrar() {
    
  }

  eliminarEvento(event: Events) {
    
  }

  editarEvento(event: Events) {
      }

}
