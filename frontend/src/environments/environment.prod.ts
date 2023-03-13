const BaseUrl = 'http://10.10.2.155:3100';
const Backend = '/api/campusgps/';
const devbaseUrl = 'http://localhost:4000/api/campusgps/';

export const environment = {
  production: true,
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
};
