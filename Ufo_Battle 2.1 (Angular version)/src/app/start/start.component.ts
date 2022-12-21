import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {
  unlogged: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    sessionStorage.setItem("number", "1");
    sessionStorage.setItem("time", "60");
    sessionStorage.setItem("score", "0");
    if (sessionStorage.getItem("user") != "")
      this.unlogged = false;
  }

  play() {
    this.router.navigateByUrl("/play");
  }

  login() {
    this.router.navigateByUrl("/login");
  }

  register() {
    this.router.navigateByUrl("/register");
  }

  logout(){
    sessionStorage.setItem("user", "");
    sessionStorage.setItem("token", "");
    window.location.reload();
  }

}
