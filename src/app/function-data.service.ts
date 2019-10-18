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
          return dist * Math.sin(dist / 2 + 3 * t) * Math.cos(x / 2 + 3 * t) * Math.sin(y / 2);
        },
        fnViewer: (t: number): number[] => ([
          20 * Math.cos(2 * t),
          20 * Math.sin(2 * t),
          30 * Math.sin(t)
        ]),
        fnTarget: (t: number): number[] => ([
          0,
          0,
          0
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
