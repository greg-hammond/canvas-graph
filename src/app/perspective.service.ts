import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


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

  // calculate x, y picture plane coordinates for given point.
  // center screen/viewport = [0, 0]
  // plus-x direction to right
  // plus-y direction is up
  // removed all references to zoom, sizing, shaping/framing.  just calculate the coords.
  getPicPlaneCoords(point: number[]) {  

    let

      i: number = this.pv[0] - point[0],
      j: number = this.pv[1] - point[1],
      k: number = this.pv[2] - point[2],
      factor: number = this.R / this.D / (this.a * i + this.b * j + this.c * k),

      // ppx = factor * R * (i*b - j*a);     
      ppx: number = factor * (i * this.b - j * this.a),

      // ppy = factor * (c*a*i + c*b*j - k*D*D);
      ppy: number = factor * (this.c * this.a * i + this.c * this.b * j - k * this.D * this.D)/ this.R;

    return [ppx, ppy];
  }


}
