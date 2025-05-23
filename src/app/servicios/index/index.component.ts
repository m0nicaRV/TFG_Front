import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../service/servicio.service';
import {Servicio} from '../../models/servicio';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-index',
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  servicios: Servicio[] = [];
  public environment = environment;
  

  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {
    
    this.servicioService.getAll().subscribe(
      (data:any) => {
        this.servicios = data;
        console.log('IndexComponent initialized');
      },
      (error) => {
        console.error('Error fetching servicios:', error);
      }
    );
  }



}
