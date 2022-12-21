export class Missile {
  conf = {
    rLimit: window.innerWidth,
    uLimit: window.innerHeight - 400 //Evita que se suba sobre el menú y el título
  };

  hpos: number;
  vpos: number;
  id: string;
  pid: any;
  element: HTMLElement;
  width: number = 70;
  hstep: number = 10;
  vstep: number = 10;
  launchedMissile: boolean;

  constructor(id: string, pid: number){
    this.id = id;
    this.element = document.getElementById(id) as HTMLElement;
    this.hpos = parseInt(this.element.style.left);
    this.vpos = parseInt(this.element.style.bottom);
  }

  moveHorizontal(step: number) {
      this.hpos = this.hpos + step;
      this.element.style.left = this.hpos + 'px';
  }

  newMissile() {
    this.vpos = 0;
    this.element.style.bottom = this.vpos + 'px';
    this.launchedMissile = false;
  }

  trigger() {
    if (this.vpos > this.conf.uLimit) {
      clearInterval(this.pid);
      this.newMissile();
      let aux = parseInt(sessionStorage.getItem("score")!);
      aux -= 25;
      sessionStorage.setItem("score", aux.toString());
    } else {
      this.vpos = this.vpos + this.vstep;
    }
    this.element.style.bottom = this.vpos + 'px';
  }
}

