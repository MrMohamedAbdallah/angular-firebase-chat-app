import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService) {

    // Define "loginForm"
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

   }

  ngOnInit() {

  }


  // Check if the control is invalid
  isInvalid(name: string){
    return this.loginForm.controls[name].invalid && this.loginForm.controls[name].touched; 
  }

  // Check if the control has an error
  hasError(name: string, error: string){
    if(this.loginForm.controls[name].errors){
      return this.loginForm.controls[name].errors[error];
    }
    return false;
  }


  // On login submit event
  login(){
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password);
  }

  // Login with Google
  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }

  // Login with Google
  loginWithGithub(){
    this.authService.loginWithGithub();
  }

}
