import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


/**
 * 
 *  functions[] - array of function objects
 * 
 *  each function = {
 *      name: display name
 *      fnSurface: (x,y,t) => return z = f(x,y,t)
 *      fnViewer: (t) => return point [x,y,z]
 *      fnTarget: (t) => return point [x,y,z]
 *  }
 * 
 */

 export class FunctionDataService {

  constructor() { }


  public getFunctionList() {

    return [

      {
        name: 'cool wave',
        fnSurface: (x: number, y: number, t: number): number => {
          let dist = Math.pow((x * x + y * y), .5);
          return 0.5 * dist * Math.sin(dist / 3 + 3 * t) * Math.cos(x / 3 + 3 * t) * Math.sin(y / 2);
        },
        fnViewer: (t: number): number[] => ([
          30 * Math.cos(t/2),
          30 * Math.sin(t/2),
          20
          //30 * Math.sin(t)
        ]),
        fnTarget: (t: number): number[] => ([
          0,
          0,
          -10
        ])
      }


      ,{
        name: 'basic',
        fnSurface: (x: number, y: number, t: number): number => {
          return x + y;
        },
        fnViewer: (t: number): number[] => ([
          5,
          5,
          5
        ]),
        fnTarget: (t: number): number[] => ([
          0,
          0,
          0
        ])
      }


      ,{
        name: 'black hole',
        fnSurface: (x: number, y: number, t: number): number => {
          return -200 / (1 + Math.sqrt((x * x + y * y) * 15));
        },
        fnViewer: (t: number): number[] => ([
          -10 + 3 * t,
          -20 + 4 * t,
          -3 + t
        ]),
        fnTarget: (t: number): number[] => ([
          0,
          0,
          -10
        ])
      }


      
    ];

  }

}
