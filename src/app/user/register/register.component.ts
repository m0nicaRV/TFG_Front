import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dniValidator } from '../../validators/dni';
import { passwordMatchValidator } from '../../validators/password';




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
      name: new FormControl('',[Validators.required]),
      dni: new FormControl('', [Validators.required, dniValidator()]),
      email: new FormControl('',[Validators.required, Validators.email]),
      telefono: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('',[Validators.required, Validators.minLength(6)]),
    },{
    validators: passwordMatchValidator()
  });
  }

  ngOnInit(){}
  onSubmit(){
    console.log(this.registerForm.value);
    
    this.authService.register(this.registerForm.value).subscribe(
      (result) => {
        console.log("result:", result);
      },
      (error) => {
        this.errors = error.error;
        console.log("error:", this.errors);
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
    );
  }

}