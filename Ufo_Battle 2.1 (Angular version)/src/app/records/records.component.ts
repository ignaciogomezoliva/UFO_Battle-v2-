import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../shared/http.service';

import { record } from './record.model';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  logged: boolean = false;
  theRecords: record[] = [];
  thePRecords: record[] = [];
  username: string;
  token: string;
  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(private conex: HttpService) { }

  ngOnInit(): void {

    if (sessionStorage.getItem("user") != ""){
      this.logged = true;
      this.username = sessionStorage.getItem("user")!;
      this.token = sessionStorage.getItem("token")!;;
    }


    this.conex.getRecords().subscribe(
      (response) => {this.theRecords = response.body;}
    )

    if (this.logged){
      this.conex.getPRecords(this.username, this.token).subscribe(
        (response) => {this.thePRecords = response.body;}
      )
    }
  }

  ngOnDestroy(): void {
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription1.unsubscribe();
    }
  }

}
