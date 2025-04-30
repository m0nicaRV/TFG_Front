import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit {
  loginForm!: FormGroup;
  errors:any=null;

  constructor(public router: Router, public fb: FormBuilder, public authService:AuthService,  private token: TokenService, private authState:AuthStateService) { 
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(){}
  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe(
      (result)=>{
        this.responseHandler(result);
      },
      (error)=>{
        this.errors=error.error;
      },
      ()=>{
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['/']);
      }
    );
  }
  responseHandler(data:any){
    this.token.handleData(data.access_token);
  }

}