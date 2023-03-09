// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


const BaseUrl = 'http://10.10.2.155:3100';
const Backend = 'http://10.10.2.155:3100';
const devbaseUrl = 'http://localhost:4000/api/campusgps/';

export const environment = {
  production: false,
  baseUrl:`${BaseUrl}`,
  backend:`${Backend}`,
  devbaseUrl
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
