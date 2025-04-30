import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../servicio.service';
import {Servicio} from '../../models/servicio';

@Component({
  selector: 'app-index',
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  servicios: Servicio[] = [];
  

  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {
    
    this.servicioService.getAll().subscribe(
      (data:any) => {
        this.servicios = data;
        console.log('IndexComponent initialized');
        console.log(this.servicios);
      },
      (error) => {
        console.error('Error fetching servicios:', error);
      }
    );
  }



}
