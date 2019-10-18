import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';

import { PerspectiveService } from '../perspective.service';
import { FunctionDataService } from '../function-data.service';

/*
canvas usage references/sources:
https://stackoverflow.com/questions/44426939/how-to-use-canvas-in-angular2
https://stackblitz.com/edit/canvas-example?file=app%2Fapp.component.ts
*/

// question (general) - how should components respond to window.resize.  what's the 'angular' way


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less']
})



export class GraphComponent implements OnInit, AfterViewInit {

  constructor(
    private perspective: PerspectiveService,
    private functionSvc: FunctionDataService

  ) { }

  @ViewChild('canvas', {static: false}) canvas: ElementRef;

  ctx: CanvasRenderingContext2D;

  width: number = 500;
  height: number = 500;
  begLine: boolean = false;
  cx: number = 0;
  cy: number = 0;




  ngOnInit() {
    // if not needed, remove, and remove from 'implements' and 'import' above
  
  }


  ngAfterViewInit() {

    // initialize the drawing context.
    this.ctx = this.canvas.nativeElement.getContext('2d');
    //this.resize();  // ?????
  }




//////////////// params stuff




// params = {


//   // color input range 0-360 (slider value)
//   // this will now operate exclusively off color slider, NOT timer slider or time value.
//   fnColor:	function(val)  	{
//     var hue = +val,
//         sat = "100%",
//         lum = "50%";
//     return 'hsl(' + hue + ',' + sat + ',' + lum + ')';
//   },

//   // for now, color, time, zoom values here must match what the slider/input element value specifies in their #.append() methods below
//   color: 'hsl(193, 100%, 50%)',
//   time: 0,
//   speed: 1,       // 0.1 to 10 x -- not implemented yet
//   zoom: 0.42,

//   needRender: false,

//   render: {

//     //type: 'polar',
//     //type: 'parametric',
//     type: 'rect',

//     lineWidth: 0.5,   // very nice.  1.0 looks coarse; 0.25 is too faint (?)

//     // applies to type=polar only
//     radMax: 20,
//     radStep: .2,

//     // applies to type=rect only
//     xmin: -15,
//     xmax: 15,
//     ymin: -15,
//     ymax: 15,
//     majStep: .4,
//     minStep: .08
//   }

// }; // end params



// put the below on ice. for now.




///////////////////  render stuff

// Render() {

//   // re-render the current function to the canvas.


//   if (!params.needRender) { return; }

//   params.needRender = false;

// 	var   time =      params.time * Math.PI / 180,
//         color =     params.color,
//         render =    params.render,
//         //func =      params.fnSurface,
//         func = selFunc.fnSurface,
//         x, y, z;

//   // evaluate current viewer and target locs, and stuff into perspective calculator
//   perspective.setViewer(selFunc.fnViewer(time));
//   perspective.setTarget(selFunc.fnTarget(time));


//   // set up drawing context vars
//   canvas.setVars(color);


//   var calcZ = function(func, x, y, time) {
//     return func(x, y, time);
//   };

//   var addPoint = function(point) {
//     var pageXY = perspective.getXYPageCoords(point, params.zoom);
//     canvas.addPoint(pageXY);
//   }


//   switch (render.type) {

//     case 'parametric':

//       // note - not parametric in t here!  although we can (should) utilize t
//       // to vary what we graph as time changes.
//       // input:  parametric parameter 0 to 1, with 'step' steps.
//       // output:  x,y,z

//       // ** this isn't hooked up yet - no xfunc/yfunc implementation added above yet **

//       canvas.startLine();
//       for (var i = 0; i <= 1; i += 1/step) {

//         // ugh, paradigm breaking up... I'd like one function to return x,y,z given 'i' input here.
//         // TBD.
//         x = render.xfunc(i);
//         y = render.yfunc(i);
//         z = render.zfunc(i);
//         addPoint([x,y,z]);
//       }
//       canvas.endLine();

//       break;


//     case 'polar':

//       var twopi = 2 * Math.PI;
//       for (var rad = render.radStep; rad <= render.radMax; rad += render.radStep) {
//         canvas.startLine();
//           for (var phi = 0; phi <= twopi + .01; phi += twopi/100) {
//               x = rad * Math.cos(phi);
//               y = rad * Math.sin(phi);
//               z = calcZ(func, x, y, time);
//               addPoint([x, y, z]);
//           }
//         canvas.endLine();
//       }

//       break;

//     case 'rect':

//   		for (x = render.xmin; x <= render.xmax; x += render.majStep) {
//   			canvas.startLine();
//   			for (y = render.ymin; y <= render.ymax; y += render.minStep) {
//           z = calcZ(func, x, y, time);
//           addPoint([x,y,z]);
//   			}
//   			canvas.endLine();
//   		}

//   		for (y = render.ymin; y <= render.ymax; y += render.majStep) {
//   			canvas.startLine();
//   			for (x = render.xmin; x <= render.xmax; x += render.minStep) {
//           z = calcZ(func, x, y, time);
//           addPoint([x,y,z]);
//   			}
//   			canvas.endLine();
//   		}
//       break;

//     default:
//       break;

// 	}  // end switch

// } // end Render()






















///////// canvas stuff /////////////
//   {

//   startLine () {
//     this.begLine = true;
//   }

//   endLine() {
//     this.ctx.stroke();
//   }


//   addPoint(pgCoords: number[]) {

//     this.cx = Math.floor(this.width * (pgCoords[0] + 1) / 2);
//     this.cy = Math.floor(this.height * (1 - pgCoords[1]) / 2);

//     if ( this.cx < 0 || this.cx > this.width || this.cy < 0 || this.cy > this.height ) {
//       return;   // bail - off screen.
//     }

//     if (this.begLine) {
//       this.ctx.beginPath();
//       this.ctx.moveTo(this.cx, this.cy);
//       this.begLine = false;
//     } else {
//       this.ctx.lineTo(this.cx, this.cy);
//     }
//   }

//   setVars(color: string) { 
//     this.ctx.clearRect(0, 0, this.width, this.height);  // clear the previous drawing
//     this.ctx.lineWidth = 0.5;
//     this.ctx.strokeStyle = color;
//   }



//   private resize() {
    
//       // let width = window.innerWidth - 20;
//       // let height = window.innerHeight - 20;
//       // this.canvas.width = width;
//       // canv.height = height;
//       // canv.style.width = width + 'px';
//       // canv.style.height = height + 'px';
//   }


//   // window.addEventListener('resize', resize, false);

// }



}
