import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;
  password: string;
  token: string;
  private subscription: Subscription;

  constructor(private conex: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem("token")!;
    this.username = sessionStorage.getItem("user")!;
  }

  registerform = new FormGroup({
    password: new FormControl('',[Validators.required, Validators.minLength(4)]),
    rpassword: new FormControl('',[Validators.required, Validators.minLength(4)])
  });

  sendit(data: FormGroup){
    if (data.get('password')?.hasError('required') ||
        data.get('rpassword')?.hasError('required'))
          alert("You must fill all the gaps!");
    else if (data.get('password')!.value != data.get('rpassword')!.value){
      alert("Repeated password must be the same!");
    }
    else{
      this.password = data.get('password')!.value;
      this.subscription = this.conex.updatePass(this.token, this.username, this.password).subscribe(
        response => {alert("Update succesful!"); this.router.navigateByUrl("/start");},
        error => {alert("Failed update...");
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
