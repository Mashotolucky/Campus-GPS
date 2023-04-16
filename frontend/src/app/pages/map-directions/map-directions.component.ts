import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import * as L from 'leaflet';
import  'leaflet-routing-machine';
// import 'leaflet-geometryutil';
import { getDistance } from 'geolib';


import { MapboxServiceService } from 'src/app/services/mapbox-service.service';

@Component({
  selector: 'app-map-directions',
  templateUrl: './map-directions.component.html',
  styleUrls: ['./map-directions.component.scss']
})
export class MapDirectionsComponent implements OnInit {

  map: any;
  marker: any;
  currentLocationMarker: any;
  routingControl: any;
  currentLatLng: any;

  arraylist: any;

  mapData: any;

  constructor(private mapService: MapboxServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    

    this.map = L.map('map').setView([-25.54050582, 28.096141], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);

    
    
    this.alternativeRoute();
    // this.mainRoute();

    const clickedCoords: { lat: any; lng: any; }[] = [];

    this.map.on('click', function(e: any) {
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        var clickedPoint = {
            lat: lat,
            lng: lng
        };
        clickedCoords.push(clickedPoint);
        console.log("Clicked coordinates:", clickedCoords);
    });

    this.distanceAPI();

  }

  addMaker(map: any, latlng: any): void{
    this.marker = L.marker([latlng.lat, latlng.lng]).addTo(map)
  }

  mainRoute():void {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      console.log('location name', name);
      const nameBody = {name: name}

      const routeArr: any[] = [];
      // Do something with the name parameter
      this.mapService.getLocationByName(nameBody)
      .subscribe(res => {
        console.log(res);
        
        this.mapData = res;
        console.log(this.mapData.mainroute.data);
        routeArr.push(this.mapData.mainroute.data.waypoints);

        // this.calculateDistance(latLngArray)
  
        const waypoints = routeArr[0];
        const latLngArray = waypoints.map(({ lat, lng }: { lat: number, lng: number }) => ({ lat, lng }));

        const location = this.mapData.mainroute.data.location[0];

        const latLng = {
          lat: location.lat,
          lng: location.lng
        };

        latLngArray.push(latLng);
        console.log(latLngArray);

        
        this.arraylist = latLngArray;
        
                
        this.addMaker(this.map, this.mapData.mainroute.data.location[0]);

        //  Get Current live location
        this.map.locate({setView: true});
        this.map.on('locationfound', (e: any) => {
          console.log(e.latlng);

          if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
      
              latLngArray.unshift({lat: lat, lng: lng});
              console.log(latLngArray);
              // Update the map with the new position
              // this.updateMap(lat, lng);
            });
          } else {
            console.log('Geolocation is not supported by this browser.');
          }

          

          this.makeRoute(latLngArray);
          this.calculateDistance(latLngArray);

          let radius = e.accuracy / 340 ;
          let circle = L.circle(e.latlng, {
            radius: radius,
            fillColor: 'blue',
            fillOpacity: 0.2,
            stroke: false
          }).addTo(this.map);
        });

        this.map.on('locationerror', (e: any) => {
          console.log(e.message);
        });

        this.map.on('load', (e: any) => {
          this.map.locate({watch: true, enableHighAccuracy: true});
        });

        this.map.on('locationfound', (e: any) => {
          console.log(e.latlng);

          latLngArray[0] = e.latlng;
          console.log(latLngArray);

          this.makeRoute(latLngArray);
          
          let radius = e.accuracy / 340;
          let circle = L.circle(e.latlng, {
            radius: radius,
            fillColor: 'blue',
            fillOpacity: 0.2,
            stroke: false
          }).addTo(this.map);

          this.map.on('locationupdate', (e: any) => {
            circle.setLatLng(e.latlng);
            circle.setRadius(e.accuracy / 2);

            // latLngArray[0] = e.latlng;
            // console.log(latLngArray);

            // this.makeRoute(latLngArray);

          });
        });

        this.map.on('locationerror', (e: any) => {
          console.log(e.message);
        });
      })
    });
  }

  //alternative route function --
  alternativeRoute(): void{
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      console.log('location name', name);
      const nameBody = {name: name}

      const routeArr: any[] = [];
      // Do something with the name parameter
      this.mapService.getLocationByName(nameBody)
      .subscribe(res => {
        console.log(res);
        
        this.mapData = res;
        console.log(this.mapData.alternative.data);
        routeArr.push(this.mapData.alternative.data.alternatives);

        // this.calculateDistance(latLngArray)

        const waypoints = routeArr[0];
        const latLngArray = waypoints.map(({ lat, lng }: { lat: number, lng: number }) => ({ lat, lng }));

        const location = this.mapData.alternative.data.location[0];

        const latLng = {
          lat: location.lat,
          lng: location.lng
        };

        latLngArray.push(latLng);
        console.log(latLngArray);

        
        this.arraylist = latLngArray;
        
                
        this.addMaker(this.map, this.mapData.alternative.data.location[0]);

        //  Get Current live location
        this.map.locate({setView: true});
        this.map.on('locationfound', (e: any) => {
          console.log(e.latlng);

          if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
      
              latLngArray.unshift({lat: lat, lng: lng});
              console.log(latLngArray);
              // Update the map with the new position
              // this.updateMap(lat, lng);
            });
          } else {
            console.log('Geolocation is not supported by this browser.');
          }

          

          this.makeRoute(latLngArray);
          this.calculateDistance(latLngArray);

          let radius = e.accuracy / 340 ;
          let circle = L.circle(e.latlng, {
            radius: radius,
            fillColor: 'blue',
            fillOpacity: 0.2,
            stroke: false
          }).addTo(this.map);
        });

        this.map.on('locationerror', (e: any) => {
          console.log(e.message);
        });

        this.map.on('load', (e: any) => {
          this.map.locate({watch: true, enableHighAccuracy: true});
        });

        this.map.on('locationfound', (e: any) => {
          console.log(e.latlng);

          latLngArray[0] = e.latlng;
          console.log(latLngArray);

          this.makeRoute(latLngArray);
          
          let radius = e.accuracy / 340;
          let circle = L.circle(e.latlng, {
            radius: radius,
            fillColor: 'blue',
            fillOpacity: 0.2,
            stroke: false
          }).addTo(this.map);

          this.map.on('locationupdate', (e: any) => {
            circle.setLatLng(e.latlng);
            circle.setRadius(e.accuracy / 2);

            // latLngArray[0] = e.latlng;
            // console.log(latLngArray);

            // this.makeRoute(latLngArray);

          });
        });

        this.map.on('locationerror', (e: any) => {
          console.log(e.message);
        });
      })
    });
  }

  makeRoute(route: any): void{
    let routePolyline = L.polyline(route, {color: 'red', weight: 2.5}).addTo(this.map);

  }

  distanceAPI(){
    this.mapService.getDistanceAPI()
    .subscribe(res =>{
      console.log('distance API',res);
      
    })
  }

  calculateDistance(wayponits: any){
    console.log(wayponits);
    
    const coord1 = { latitude: wayponits[0].lat, longitude: wayponits[0].lng }; // San Francisco
    const coord2 = { latitude: wayponits[1].lat, longitude: wayponits[1].lng };

    const distance = getDistance(coord1, coord2);

    console.log('Geo Distance',distance);
  }

}

