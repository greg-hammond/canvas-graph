import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


/*
  setTarget([0, 0, 0]);
  setViewer([3, 4, 5]);
  getXYPageCoords([1, 1.333333333, 1.666666666], 1);


three things that aren't quite right:
 - limTAN. 
 - '0.8'
 - zoom
these all have to do with scale and shape.  they're an attempt to describe how we map physical
reality onto this mathematical construct.  Probably need a cleaner way to manage this - and it
should happen outside of this class.  
Maybe zoom is okay as-is...
*/

export class PerspectiveService {

  private a: number;
  private b: number;
  private c: number;
  private D: number;
  private R: number;
  private pv: number[];
  private pt: number[];

  constructor() {
    this.a = 0;
    this.b = 0;
    this.c = 0;
    this.D = 0;
    this.R = 0;
    this.pv = [0, 0, 0];
    this.pt = [0, 0, 0];

  }

  private dist(i: number, j: number) { return Math.sqrt(i * i + j * j) };
    
  private updateVars() {
    this.a = this.pv[0] - this.pt[0];     // x diff
    this.b = this.pv[1] - this.pt[1];     // y diff
    this.c = this.pv[2] - this.pt[2];     // z diff
    this.D = this.dist(this.a, this.b);   // dist in x-y plane
    this.R = this.dist(this.D, this.c);   // dist in 3-D space
  }

  setViewer(point: number[]) {
    this.pv = point;
    this.updateVars();
  }

  setTarget(point: number[]) {
    this.pt = point;
    this.updateVars();
  }

  getXYPageCoords(point: number[], zoom: number) {  

    let
      // ratio of pic plane half-width to v-t dist
      limTAN: number = 0.364,   
      i: number = this.pv[0] - point[0],
      j: number = this.pv[1] - point[1],
      k: number = this.pv[2] - point[2],
      factor: number = this.R / this.D / (this.a * i + this.b * j + this.c * k),

      // xpg = factor * R * (i*b - j*a);
      // divide actual xpg by xpg(max) = .364*R - so we return a relative value
      // ranging from -1 to +1 (and anything outside of that should not be plotted)
      xpg: number = zoom * factor * (i * this.b - j * this.a) / limTAN,

      // ypg = fctr * (c*a*i + c*b*j - k*D*D);
      // .8 is fudge.  means canvas height is 80% of width.
      ypg: number = zoom * .8 * factor * (this.c * this.a * i + this.c * this.b * j - k * this.D * this.D) / this.R / limTAN;

    return [xpg, ypg];
  }


}
