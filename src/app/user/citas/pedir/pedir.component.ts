import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select' 
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-pedir',
  imports: [FormsModule, ReactiveFormsModule, AutoCompleteModule, FloatLabelModule, SelectModule, CommonModule],
  standalone: true,
  templateUrl: './pedir.component.html',
  styleUrls: ['./pedir.component.css']
})
export class PedirComponent {
  servicio:string = '';
  dolencia: string = '';
  value: string = '';
  items: String[] = ['option 1', 'option 2', 'option 3'];
  nombre: string = '';
  apellidos: string = '';
  forms: FormGroup;
  constructor(private fb: FormBuilder) {
    this.forms = this.fb.group({
      nombre: [''],
      apellidos: [''],
      email: [''],
      telefono: [''],
      fecha: [''],
      hora: [''],
      servicio: ['']
    });
  }
onSubmit() {
  console.log(this.dolencia);
  console.log(this.servicio);

  // Aquí puedes manejar el envío del formulario, como enviarlo a un servidor o procesarlo de alguna manera.
  // Por ejemplo, podrías usar un servicio para enviar los datos a una API.
  // this.myService.submitForm(this.forms.value).subscribe(response => {
  //   console.log('Formulario enviado con éxito', response);
  // });
}

}
