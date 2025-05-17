import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { Servicio } from '../../models/servicio'; 
import { CommonModule } from '@angular/common';
import { ServicioService } from '../servicio.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthStateService } from '../../shared/auth-state.service';

@Component({
  selector: 'app-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  servicioForm!: FormGroup;
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedImage!: any;

  constructor(
    public authState: AuthStateService,
    public servicioService: ServicioService
  ) {
   
  }

  ngOnInit(): void {
    this.servicioForm = new FormGroup({
          titulo:new FormControl('', [Validators.required]),
          tiempo:new FormControl('',[Validators.required]) ,
          descripcion:new FormControl('',[Validators.required]) , 
          foto: new FormControl('',[Validators.required])  
        });

  }

  onFileSelected(event: any): void {
    if(event.target.files.length > 0) {
      this.selectedImage =  event.srcElement.files[0];
    }
  }

  onSubmit(): void {



    if (this.servicioForm.valid) {
      this.loading = true;
      this.successMessage = null;
      this.errorMessage = null;


      const Servicio: FormData = new FormData();
      Servicio.append('titulo', this.servicioForm.get('titulo')?.value);
      Servicio.append('tiempo', this.servicioForm.get('tiempo')?.value);
      Servicio.append('descripcion', this.servicioForm.get('descripcion')?.value);
      Servicio.append('foto', this.selectedImage);
      console.log('Servicio:', Servicio);


      this.servicioService.create(Servicio).subscribe({
        next: (response) => {
          console.log('Servicio creado con éxito:', response);
          this.successMessage = 'Servicio creado con éxito.';
          this.servicioForm.reset();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al crear servicio:', error);
          this.errorMessage = 'Hubo un error al crear el servicio. Inténtalo de nuevo.';
          this.loading = false;
          if (error.error && error.error.error) {
             this.errorMessage = 'Error: ' + error.error.error;
          } else if (error.message) {
             this.errorMessage = 'Error: ' + error.message;
          }
        }
      });

    } else {
      this.servicioForm.markAllAsTouched();
      this.errorMessage = 'Por favor, completa los campos obligatorios correctamente.';
    }
  }

}
