import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { MatSelectChange } from '@angular/material/select'
import { PerspectiveService } from '../perspective.service';
import { FunctionDataService } from '../function-data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less']
})

/**
 *  issues / to-do:
 *  - window resize / canvas resize
 *  - function select styling - consistent / override ng
 *  
 * 
 * */

export class GraphComponent implements OnInit {

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  funcs;
  selFunc;


  // DI our services
  constructor(
    private perspCalc: PerspectiveService,
    private funcList: FunctionDataService
  ) { }


  ngOnInit() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.ctx.lineWidth = 0.2;  // empirical
    //this.resize();  // ?????
    this.funcs = this.funcList.getFunctionList();
    this.selFunc = this.funcs[0];
    this.render();
  }


  // user changed the selected function
  onFunctionChange(event: MatSelectChange) {
    this.render();
  }

  // pen color slider
  slideHSLHue = 200; // blue-cyan
  drawColor = 'hsl(' + this.slideHSLHue + ', 100%, 50%)';
  onHSLColorChange(event: MatSliderChange) {
    // we'll need +1 - see expl above
    this.slideHSLHue = event.value;
    this.drawColor = 'hsl(' + this.slideHSLHue + ', 100%, 50%)';
    this.render();
  }


  // background grayscale color
  // (changing the background does not require a re-render!)
  slideBKGLum = 18; 
  slideBKGColor = 'hsl(0, 0%, ' + this.slideBKGLum + '%)';
  foreColorLum = (this.slideBKGLum + 50) % 100;
  foreColor = 'hsl(0, 0%, ' + this.foreColorLum + '%)';

  onBKGColorChange(event: MatSliderChange) {

    // this should not be necessary - because slideBKGLum is already
    // bound to the slider - but without this, the bkg color
    // only updates after slider mouseup.  This line allows us
    // to instantaneously/continuously update the bkg color
    // as the slider is moved.  
    this.slideBKGLum = event.value;

    // this, I have to do - because we need to recalc the actual
    // hsl color (which is a composed string) from the numeric
    // "L" value which the slider is giving us.
    this.slideBKGColor = 'hsl(0, 0%, ' + this.slideBKGLum + '%)';
    this.foreColorLum = (this.slideBKGLum + 50) % 100;
    this.foreColor = 'hsl(0, 0%, ' + this.foreColorLum + '%)';
  }


  // time slider - time value (0 to 2*pi)
  slideTime = 1.2;
  onTimeChange(event: MatSliderChange) {
    this.slideTime = event.value;
    this.render();
  }


  // zoom slider - map zoom slider 0-100 --> zoom factor .1 to 100
  slideZoom = 25;
  zoomValue = (10 ** (this.slideZoom / 33 - 1));
  onZoomChange(event: MatSliderChange) {
    this.slideZoom = event.value;
    this.zoomValue = (10 ** (this.slideZoom / 33 - 1));
    this.render();
  }


  
  // draw the graph when any of the above change.
  private render() {

    const width = this.canvas.width;
    const height = this.canvas.height;

    let
      begLine = false,
      cx = 0,
      cy = 0,

      time = this.slideTime,
      surface = this.selFunc.fnSurface,
      POVfunc = this.selFunc.fnViewer,
      TGTfunc = this.selFunc.fnTarget,
      zoom = this.zoomValue;


    // clear canvas and set pen color
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.strokeStyle = this.drawColor;

    // viewer and target locations can be parametric in (t) - evaluate 
    // their locations and stuff into the perspective engine
    this.perspCalc.setViewer(POVfunc(time));
    this.perspCalc.setTarget(TGTfunc(time));


    let addPoint = (point: number[]) => {
      
      // calculate X-Y screen loc for point in space
      // returns pageXY[x,y] where (x,y) in range [-1,+1]
      let pageXY: number[] = this.perspCalc.getXYPageCoords(point, zoom);
      
      // scale to canvas size, and xlate to screen coords
      cx = Math.floor(width * (pageXY[0] + 1) / 2);
      cy = Math.floor(height * (1 - pageXY[1]) / 2);

      // check to see that point should hit screen (canvas) area
      if (cx > 0 && cx < width && cy > 0 && cy < height) {
        if (begLine) {
          this.ctx.beginPath();
          this.ctx.moveTo(cx, cy);
          begLine = false;
        } else {
          this.ctx.lineTo(cx, cy);
        }
      }
    }

    // draw it!

    let xyRng = {
      xmin: -15, xmax: 15,
      ymin: -15, ymax: 15,
      majStep: .4, minStep: .08
    };

    for (let x: number = xyRng.xmin; x <= xyRng.xmax; x += xyRng.majStep) {
      begLine = true;
      for (let y = xyRng.ymin; y <= xyRng.ymax; y += xyRng.minStep) {
        addPoint([x, y, surface(x, y, time)]);
      }
      this.ctx.stroke();
    }

    for (let y: number = xyRng.ymin; y <= xyRng.ymax; y += xyRng.majStep) {
      begLine = true;
      for (let x: number = xyRng.xmin; x <= xyRng.xmax; x += xyRng.minStep) {
        addPoint([x, y, surface(x, y, time)]);
      }
      this.ctx.stroke();
    }

  }

}