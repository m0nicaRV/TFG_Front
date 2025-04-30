import { Component } from '@angular/core';
import { FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select' 
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';


@Component({
  selector: 'app-pedir',
  imports: [MultiSelectModule, FormsModule, ReactiveFormsModule, AutoCompleteModule, FloatLabelModule, SelectModule, CommonModule, DatePickerModule],
  standalone: true,
  templateUrl: './pedir.component.html',
  styleUrls: ['./pedir.component.css']
})
export class PedirComponent {
  servicio:string = '';
  dolencia: string = '';
  value: string = '';
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  items: String[] = ['option 1', 'option 2', 'option 3'];
  nums:number = 1;
  times: { inicio: typeof Date; fin: typeof Date; semana: string }[] = [];
  forms: FormGroup;

  constructor(private fb: FormBuilder) {
    this.forms = this.fb.group({
      dolencia: [''],
      fecha: [''],
      hora: [''],
      servicio: [''],
      times: new FormArray([
        this.fb.group({
          inicio: [''],
          fin: [''],
          semana: [''],
        }),
      ]),
    });
  }

  ngOnInit() {
    console.log(this.forms);
  }
onSubmit() {


}
addTime() {
  const timeFormGroup = this.fb.group({
    inicio: [''],
    fin: [''],
    semana: [''],
  });
  (this.forms.get('times') as FormArray).push(timeFormGroup);
  this.nums++;

}
removeTime(index: number) {
  (this.forms.get('times') as FormArray).removeAt(index);
  this.nums--;
}

}
