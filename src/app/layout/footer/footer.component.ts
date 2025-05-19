import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {configuracion } from '../../environments/environments';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {


    direccion :string = configuracion.direccion;
    telefono = configuracion.telefono;
    email = configuracion.email;
    titulo = configuracion.titulo;
    instagram = configuracion.instagram;
  

}
