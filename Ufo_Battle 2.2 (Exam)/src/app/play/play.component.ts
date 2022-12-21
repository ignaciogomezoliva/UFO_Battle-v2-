import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Missile } from './models/missile.model';
import { Ufo } from './models/ufo.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  seconds = 0;
  score = 0;
  nUfo: number;
  setOfUfos: Ufo[] = [];
  hit: string = "";
  missile: Missile;
  timeCount: any;
  scoreCount: any;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.seconds = parseInt(sessionStorage.getItem("time")!);
    this.nUfo = parseInt(sessionStorage.getItem("number")!);

    this.timeCount = setInterval(() => {
      this.countTime();
    }, 1000);

    this.scoreCount = setInterval(() => {
      this.score = parseInt(sessionStorage.getItem("score")!);
    }, 25)

    for (let i=0; i< this.nUfo; i++){
      this.createTag('ufo'+i, i);
    }

    for (let i=0; i < this.nUfo; i++){
      this.setOfUfos.push(new Ufo('ufo'+i, i));
    }

    for (let i=0; i < this.nUfo; i++){
      this.setOfUfos[i].pid = setInterval(() =>{
        this.setOfUfos[i].move();
        this.checkForAHit(this.setOfUfos[i], this.missile);
      }, 25)
    }
    this.createMTag();
    this.missile = new Missile("missile", 0);
  }

  countTime(){
    this.seconds--;
    if (this.seconds === 0) {
      sessionStorage.setItem("score", this.score.toString());
      window.location.replace("/score");
    }
  }

  createTag(name: string, number:number){
    let newImg = this.renderer.createElement('img');
    this.renderer.setAttribute(newImg,'id', name);
    this.renderer.setAttribute(newImg,'class', 'setOfUfos');
    this.renderer.setAttribute(newImg,'src','assets/imgs/ufo.png');
    this.renderer.setStyle(newImg, "width", "70px");

    //Posición inicial de cada ufo
    let rLimit = window.innerWidth - 70, //ancho de la nave
    uLimit = window.innerHeight - 70, //altura de la nave
    newleft = Math.random()*rLimit,
    newbottom = uLimit - (350 + number * 70); //Limite para que no se suban unos encima de otros

    this.renderer.setStyle(newImg, "left", newleft + 'px');
    this.renderer.setStyle(newImg, "bottom", newbottom + 'px');

    this.renderer.appendChild(this.el.nativeElement, newImg);

  }

  createMTag(){
    let newImg = this.renderer.createElement('img');
    this.renderer.setAttribute(newImg,'id', "missile");
    this.renderer.setAttribute(newImg,'class', 'missile');
    this.renderer.setAttribute(newImg,'src','assets/imgs/missile.png');
    this.renderer.setStyle(newImg, "width", "40px");
    this.renderer.setStyle(newImg, "height", "70px");

    this.renderer.setStyle(newImg, "left", 50 + 'px');
    this.renderer.setStyle(newImg, "bottom", 10 + 'px');

    this.renderer.appendChild(this.el.nativeElement, newImg);

  }

  ngOnDestroy(): void {
    for (let i=0; i < this.nUfo; i++){
      clearInterval(this.setOfUfos[i].pid)
    }
    clearInterval(this.timeCount);
    clearInterval(this.scoreCount);
  }

  @HostListener('document:keydown', ['$event'])
  keypressed(theEvent: KeyboardEvent) {
    switch (theEvent.key) {
      case 'ArrowRight': this.missile.moveHorizontal(this.missile.hstep);
                         break;
      case 'ArrowLeft':  this.missile.moveHorizontal((-1) * this.missile.hstep);
                         break;
      case ' ':          if (!this.missile.launchedMissile) {
                              this.missile.launchedMissile = true;
                              this.missile.pid = window.setInterval(() => {this.missile.trigger(); }, 15);
                         }
                         break;
      }
  }

  checkForAHit (ufo: Ufo, missile: Missile) {
    let theufo = document.getElementById(ufo.id) as HTMLElement;
    let themissile = document.getElementById(missile.id) as HTMLElement;
    let hpos_ufo = parseInt(theufo.style.left),
        vpos_ufo = parseInt(theufo.style.bottom),
        width_ufo = parseInt(theufo.style.width),
        vpos_m = parseInt(themissile.style.bottom),
        hpos_m = parseInt(themissile.style.left),
        width_m = parseInt(themissile.style.width),
        height_m = parseInt(themissile.style.height);

    if((vpos_m + height_m >= vpos_ufo - 10) && (hpos_m >= hpos_ufo - 10) && (hpos_m <= hpos_ufo + width_ufo + 10)){
            this.hit = ufo.id;
        }

    if (this.hit != ""){
      clearInterval(this.missile.pid);
      this.missile.newMissile();
      this.missile.launchedMissile = false;
      let aux = parseInt(sessionStorage.getItem("score")!);
      aux += 100;
      sessionStorage.setItem("score", aux.toString());
      theufo.setAttribute("src", "assets/imgs/explosion.gif");
      setTimeout( () => {theufo.setAttribute("src", "assets/imgs/ufo.png");}, 500)
      this.hit = "";
      }

  }

}
