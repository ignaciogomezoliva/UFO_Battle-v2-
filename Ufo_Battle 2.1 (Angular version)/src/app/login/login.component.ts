import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  token: string;
  private subscription: Subscription;

  constructor(private conex: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  loginform = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  sendit(data: FormGroup){
    if (data.get('username')?.hasError('required') || data.get('password')?.hasError('required') )
      alert("You must fill all the gaps");
    else{
      this.username = data.get('username')!.value;
      this.password = data.get('password')!.value;
      this.subscription = this.conex.login(this.username, this.password).subscribe(
        response => {this.token = response.headers.get('authorization'); alert("Login succesful!"); sessionStorage.setItem("user", this.username); sessionStorage.setItem("token", this.token);this.router.navigateByUrl("/start");},
        error => {alert("Failed login... " + error);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
