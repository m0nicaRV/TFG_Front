import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class registerComponent implements OnInit {
  registerForm!: FormGroup;
  errors:any= null;

  constructor( public router: Router, public fb:FormBuilder, public authService:AuthService) { 
    this.registerForm = this.fb.group({
      name: [''],
      dni:[''],
      email: [''],
      telefono: [''],
      password: [''],
      password_confirmation: ['']
    });
  }

  ngOnInit(){}
  onSubmit(){
    console.log(this.registerForm.value);
    
    this.authService.register(this.registerForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
        console.log(this.errors);
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
    );
  }

}