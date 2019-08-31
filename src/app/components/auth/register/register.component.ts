import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService) {

    // Define "registerForm"
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      password_confirm: new FormControl("", [
        Validators.required,
        this.passwordConfirm.bind(this)
      ])
    });
  }

  ngOnInit() {}

  // Check if the control is invalid
  isInvalid(name: string) {
    return (
      this.registerForm.controls[name].invalid &&
      this.registerForm.controls[name].touched
    );
  }

  // Check if the control has an error
  hasError(name: string, error: string) {
    if (this.registerForm.controls[name].errors) {
      return this.registerForm.controls[name].errors[error];
    }
    return false;
  }


  // Password confirmation validator
  passwordConfirm(control: FormControl): {[key: string]: string} | null{
    if(!this.registerForm){
      return null;
    }

    
    if(control.value !== this.registerForm.value.password){
      return {'password_confirm': 'Passwords don\'t match'};
    }

    return null;
  }

  // On register event
  register(){
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    this.authService.register(email, password);
  }
  
  
  // Register with Google
  registerWithGoogle(){
    this.authService.loginWithGoogle();
  }

  // Register with Google
  registerWithGithub(){
    this.authService.loginWithGithub();
  }
  
  

}
