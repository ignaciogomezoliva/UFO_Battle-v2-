import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  penalty1: number;
  penalty2: number;
  calc: number;
  logged: boolean;
  pressed: boolean = false;
  private subscription: Subscription;

  constructor(private conex: HttpService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("user") != "")
      this.logged = true;

    let aux = sessionStorage.getItem("number");

    this.penalty1 = parseInt(sessionStorage.getItem("time")!) / 60;

    if (aux === "1")
        this.penalty2 = 0;
    else
        this.penalty2 = (parseInt(aux!) - 1) * 50;

    this.calc = parseInt(sessionStorage.getItem("score")!) / this.penalty1 - this.penalty2;

    sessionStorage.setItem("score", this.calc.toString());
  }

  storeIt(){
    console.log("Pulsado");
    this.subscription = this.conex.storeScore(sessionStorage.getItem("token")!, this.calc, parseInt(sessionStorage.getItem("number")!), parseInt(sessionStorage.getItem("time")!)).subscribe(
      response => {alert("Score stored succesful!"); this.pressed = true;},
      error => {alert("Storing failed...")}
    );
  }

  notStore() {
    this.pressed = true;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
