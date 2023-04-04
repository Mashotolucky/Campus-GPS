// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


const BaseUrl = 'http://10.10.2.155:3100';
// const Backend = 'https://gifted-windbreaker-hen.cyclic.app/api/campusgps/';
// const devbaseUrl = 'https://gifted-windbreaker-hen.cyclic.app/api/campusgps/';

const Backend = 'http://localhost:4000/api/campusgps/';
const devbaseUrl = 'http://localhost:4000/api/campusgps/';

export const environment = {
  production: false,
  baseUrl:`${BaseUrl}`,
  backend:`${Backend}`,
  devbaseUrl,
  mapbox: {
    accessToken: 'pk.eyJ1IjoibWFzaG90bzk5IiwiYSI6ImNsZXJ0MXMwbzB2cmE0OXAyd2M5eWhxcjcifQ.Gle9kH_3dlxQHgSJSxryCg',
  },
  tomtom: {
    key: 'POQwSkANG2wVgN1qMbook38s5EMkN7pG',
  },
  ors: {
    ors_key: '5b3ce3597851110001cf6248902d0c88cc3d4b6bb01f78e04dc39e7e'
  }
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
