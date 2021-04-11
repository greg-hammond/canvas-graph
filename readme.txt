
4/11/21
pulled from origin - github had 8 updates.  i had to undo my package*.json changes from before, in order to pull. 
actually worked fine!

i wanted to do a build so I could run this as a static project.  Build ran fine. 

when I run /dist/index.html as standalone file, I get my old friend CORS errors.
So I run it using live server.  
This also didn't work, because index.html specified a base href of "/".
When I changed this to ".", then it ran smoothly :-)





--------------------------------------------------------------

rust never sleeps.
this project is borked due to stale crap and version incompatibilities.
simply killing things and running npm install or npm update or ng update apparently is not going to get it done.

So instead I will:

kill all of node_modules.
kill package-lock.json.

scrape all package.json modules then delete them.

then re-install them.
peer dependencies will automatically get pulled in, so only manually install the core stuff.
go one at a time.
it mentioned manually installing peer dependencies.  do them as npm suggests.



dependencies:

done:

    "@angular/animations": "~9.0.2",
    "@angular/cdk": "~9.0.1",
    "@angular/common": "~9.0.2",
    "@angular/compiler": "~9.0.2",

    "@angular/core": "~9.0.2",
    "@angular/forms": "~9.0.2",
    "@angular/material": "^9.0.1",

    "@angular/platform-browser": "~9.0.2",
    "@angular/platform-browser-dynamic": "~9.0.2",
    "@angular/router": "~9.0.2",

    "rxjs": "~6.5.4",
    "tslib": "^1.10.0",
    "zone.js": "~0.10.2"


===================================



dev dependencies:

done
    "protractor": "~5.4.0",
    "ts-node": "~7.0.0",
    "tslint": "~5.15.0",
    "typescript": "~3.7.5"

    "@angular/cli": "~9.0.3",
    "@angular-devkit/build-angular": "~0.900.3",
    "@angular/compiler-cli": "~9.0.2",
    "@angular/language-service": "~9.0.2",

    "@types/jasmine": "~3.3.8",
    "@types/jasminewd2": "~2.0.3",
    "@types/node": "^12.11.1",

    "angular-cli-ghpages": "^0.6.0",

    "codelyzer": "^5.1.2",

remaining:


ignore these unless requested as peer dependency.
jasmine-core is NOT in the npm registry !!!!!
    "jasmine-core": "~3.4.0",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "~4.1.0",
    "karma-chrome-launcher": "~2.2.0",
    "karma-coverage-istanbul-reporter": "~2.0.1",
    "karma-jasmine": "~2.0.1",
    "karma-jasmine-html-reporter": "^1.4.0",


===-.-=-.-=-.-=-.-=-.-=-.-=-.-=


unbelievable -- after all of this.... it WORKED again.

ng serve --open

