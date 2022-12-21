import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent{
  username: string;
  email: string;
  password: string;
  private subscription: Subscription;

  registerform = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.minLength(2), Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(4)]),
    rpassword: new FormControl('',[Validators.required, Validators.minLength(4)])
  });

  sendit(data: FormGroup){
    if (data.get('username')?.hasError('required') ||
        data.get('email')?.hasError('required') ||
        data.get('password')?.hasError('required') ||
        data.get('rpassword')?.hasError('required'))
          alert("You must fill all the gaps!");
    else if (data.get('password')!.value != data.get('rpassword')!.value){
      alert("Repeated password must be the same!");
    }
    else{
      this.username = data.get('username')!.value;
      this.email = data.get('email')!.value;
      this.password = data.get('password')!.value;
      this.subscription = this.conex.register(this.username, this.email, this.password).subscribe(
        response => {alert("Register succesful!"); this.router.navigateByUrl("/start");},
        error => {alert("Failed register...");
      });
    }
  }

  checkUsername(data: FormGroup):void {
    this.conex.exists(data.get('username')?.value).subscribe(
      (response) => {alert("Username already exists!");},
      (error) => {console.log("Username available")})
      }

  constructor(private conex: HttpService, private router: Router) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();

    }
  }

}
