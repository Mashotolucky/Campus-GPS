import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as mapboxgl from 'mapbox-gl';
// import MapboxDirections from '@mapbox/mapbox-sdk/services/directions';
// import { request } from 'http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapboxServiceService {

  private readonly API_ENDPOINT = 'https://api.mapbox.com/directions/v5/mapbox/driving';
  private readonly ACCESS_TOKEN = environment.mapbox.accessToken;

  constructor(private http: HttpClient) { }

  getDirections(origin: string, destination: string): Observable<any> {
    const url = `${this.API_ENDPOINT}/${origin};${destination}?access_token=${this.ACCESS_TOKEN}`;
    // const url = `https://api.mapbox.com/directions/v5/mapbox/driving/-122.42,37.78;-77.03,38.91?access_token=pk.eyJ1IjoibWFzaG90bzk5IiwiYSI6ImNsZXdrOG5jajBkazgzenF3YWlyMGRvdTgifQ.2MEljL4sOh0ISX1QNw6HJw&geometries=geojson`

    const params = {
      access_token: this.ACCESS_TOKEN,
      geometries: 'geojson'
    };
    return this.http.get(url);
  }
  
  tomtomDirections(): Observable<any>{

    const url = `https://api.tomtom.com/routing/1/calculateRoute/\
    52.50931,13.42936:52.50274,13.43872/json?
    &key=POQwSkANG2wVgN1qMbook38s5EMkN7pG`;

    return this.http.get(url);
  }

  orsRouteMap(markers: any): Observable<any>{
    console.log(markers);
    
    const ORS_API_KEY = environment.ors.ors_key; // Replace with your OpenRouteService API key
    const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${ORS_API_KEY}&start=${markers[0].lng},${markers[0].lat}&end=${markers[1].lng},${markers[1].lat}`;

    return this.http.get(url)
  }
}
