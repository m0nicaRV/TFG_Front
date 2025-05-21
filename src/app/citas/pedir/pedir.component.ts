import { Component } from '@angular/core';
import { FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select' 
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { ServicioService } from '../../servicios/servicio.service';
import { Servicio } from '../../models/servicio';
import { formatDate } from '@angular/common';
import { CitaService } from '../cita.service';
import { Router } from '@angular/router';
import { AuthStateService } from '../../shared/auth-state.service';
import { dateValidator } from '../../validators/date';



@Component({
  selector: 'app-pedir',
  imports: [ MultiSelectModule, FormsModule, ReactiveFormsModule, AutoCompleteModule, FloatLabelModule, SelectModule, CommonModule, DatePickerModule],
  standalone: true,
  templateUrl: './pedir.component.html',
  styleUrls: ['./pedir.component.css']
})
export class PedirComponent {
  servicios: Servicio[] = [];
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  items: string[] = [];
  nums:number = 1;
  times: any
  forms!: FormGroup;
  formsTime!: FormGroup;

  constructor(public authstate: AuthStateService,private router: Router, private fb: FormBuilder , private servicioService: ServicioService, private citaService: CitaService) {
   
  }

  ngOnInit() {

    this.servicioService.getAll().subscribe(
      (data:any) => {
        this.servicios = data;
      },
      (error) => {
        console.error('Error fetching servicios:', error);
      }
    );
    
   

    this.forms = this.fb.group({
      dolencia: [''],
      servicio: new FormControl('', [Validators.required]),
      disponibilidad:  new FormArray([
          this.fb.group({
            inicio: [''],
            fin: [''],
            semana: [''],
          },{
            validators: [Validators.required],
          }),
        ]),
    });
  



  }
onSubmit() {
  if(this.forms.valid){
      this.forms.value.disponibilidad.forEach((times: any) => {
        times.inicio = formatDate(times.inicio, 'HH:mm:ss', 'en-US');
        times.fin = formatDate(times.fin, 'HH:mm:ss', 'en-US');
        times.semana = times.semana.join(', ');
    });


    
  }
  this.citaService.create(this.forms.value).subscribe(
    (response) => {
      console.log('Cita created successfully:', response);
      this.router.navigate(['/']);;
    },
    (error) => {
      console.error('Error creating cita:', error);
    }
  )

}
addTime() {
  const timeFormGroup = this.fb.group({
    inicio: [''],
    fin: [''],
    semana: [''],
  });
  (this.forms.get('disponibilidad') as FormArray).push(timeFormGroup);
  this.nums++;

}
removeTime(index: number) {
  if(this.nums>1){
    (this.forms.get('disponibilidad') as FormArray).removeAt(index);
    this.nums--;
  }
}



}
