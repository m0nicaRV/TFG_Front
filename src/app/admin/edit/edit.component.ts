import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePicker

 } from 'primeng/datepicker';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, FormsModule, DatePicker],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  eventForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {}

}
