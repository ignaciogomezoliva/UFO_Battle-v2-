import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'ufoBattle';

  logged: boolean = false;

  ngOnInit(): void {
    if (sessionStorage.getItem("user") != "")
      this.logged = true;
  }

}
