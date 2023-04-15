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

  BaseUrl = environment.production? environment.backend +'/map' : environment.devbaseUrl+'/map';

  liveLatLng: any;

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

  orsRouteMap(waypoints: {lat: number, lng: number}[]): Observable<any>{
    console.log(waypoints);

    let coordinates = '';

    // Build the coordinates string from the waypoints array
    waypoints.forEach((waypoint: any, index: any) => {
      const { lat, lng } = waypoint;
      coordinates += `${lng},${lat}`;
      if (index < waypoints.length - 1) {
        coordinates += '|'; // Add separator for all but the last coordinate
      }
    });

    console.log(coordinates);
    
    
    const ORS_API_KEY = environment.ors.ors_key; // Replace with your OpenRouteService API key
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&coordinates=${coordinates}`;

    return this.http.get(url)
  }

  getLocationByName(name: any): Observable<any>{
    console.log(name);
    
    return this.http.post(this.BaseUrl+'/location',name);
  }

  getLiveLocation(latLang: any){
    return latLang;
  }

  passLocation(): any{
    return this.liveLatLng;
  }

  getDistanceAPI(): Observable<any>{
    const url = "https://api.geoapify.com/v1/routematrix?apiKey=d853606affd141a2aee80f098d2edd4f";

    const raw = {"mode":"walk","sources":[{"location":[8.73784862216246,48.543061473317266]}],"targets":[{"location":[8.73784862216246,48.543061473317266]}]};

    return this.http.post(url,raw);
  }
}
