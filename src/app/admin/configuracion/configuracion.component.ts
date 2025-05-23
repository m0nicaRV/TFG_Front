import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { configuracion as configuracionEnv } from '../../environments/environments';
import { Button } from 'primeng/button';
import { loginComponent } from '../../user/login/login.component';

@Component({
  selector: 'app-configuracion',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {
  configuracionForm!: FormGroup;
  configuracion = configuracionEnv;

  ngOnInit(): void {
    this.configuracionForm = new FormGroup({
      url_host: new FormControl(this.configuracion.url_host),
      direccion: new FormControl(this.configuracion.direccion),
      telefono: new FormControl(this.configuracion.telefono),
      email: new FormControl(this.configuracion.email),
      facebook: new FormControl(this.configuracion.facebook),
      instagram: new FormControl(this.configuracion.instagram),
      titulo: new FormControl(this.configuracion.titulo),
      
    });
  }


  onSubmit(): void {
    this.configuracion.url_host = this.configuracionForm.get('url_host')?.value;
    this.configuracion.direccion = this.configuracionForm.get('direccion')?.value;
    this.configuracion.telefono = this.configuracionForm.get('telefono')?.value;
    this.configuracion.email = this.configuracionForm.get('email')?.value;
    this.configuracion.facebook = this.configuracionForm.get('facebook')?.value;
    this.configuracion.instagram = this.configuracionForm.get('instagram')?.value;
    this.configuracion.titulo = this.configuracionForm.get('titulo')?.value;
  }
}
