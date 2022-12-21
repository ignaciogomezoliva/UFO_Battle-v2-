import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  number = "1";
  time = "60";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  save(){
    sessionStorage.setItem("number", this.number);
    sessionStorage.setItem("time", this.time);
    this.router.navigateByUrl("/play");
  }

}
