export class Ufo {
  hpos: number;
  id: string;
  pid: any;
  element: HTMLElement;
  width: number = 70;
  hstep: number = 5;

  constructor (id: string, pid: number) {
    this.id = id;
    this.element = document.getElementById(id) as HTMLElement;
    this.hpos = parseInt(this.element.style.left);
  }

  move () {
    let rightlimit = window.innerWidth, leftlimit = 0;

    if ((this.hpos+ this.width + 8) > rightlimit)
        this.hstep = -this.hstep;
    if (this.hpos < leftlimit)
        this.hstep = -this.hstep;

    this.hpos = this.hpos + this.hstep;

    this.element.style.left = this.hpos + 'px';
  }


}
