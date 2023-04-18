import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import * as L from 'leaflet';
import  'leaflet-routing-machine';
import 'leaflet-providers';

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
    
    // this.testPoint();

    this.map = L.map('map').setView([-25.54050582, 28.096141], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);

    this.alternativeRoute();
    // this.mainRoute();
    // this.getFastestRoute();

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

  }
  // added marker to destination 
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

              this.makeRoute(latLngArray);
              
            });
          } else {
            console.log('Geolocation is not supported by this browser.');
          }

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

  calculateDistance(wayponits: any, alternatives: any){
    console.log(wayponits);
    console.log(alternatives);
    
    
    const mainCoord1 = { latitude: wayponits[0].lat, longitude: wayponits[0].lng }; 
    const mainCoord2 = { latitude: wayponits[1].lat, longitude: wayponits[1].lng };

    const mainDistance = getDistance(mainCoord1, mainCoord2);

    console.log('Main Distance',mainDistance);

    const altCoord1 = { latitude: alternatives[0].lat, longitude: alternatives[0].lng }; 
    const altCoord2 = { latitude: alternatives[1].lat, longitude: alternatives[1].lng };

    const altDistance = getDistance(altCoord1, altCoord2);
    console.log('Alt Distance',altDistance);
    
    if(altDistance > mainDistance){
      this.mainRoute();
    }
    else{
      this.alternativeRoute();
    }

    
  }

  // getFastestRoute(): void{
  //   this.route.queryParams.subscribe(params => {
  //     const name = params['name'];
  //     console.log('location name', name);
  //     const nameBody = {name: name}

  //     const mainArr: any[] = [];
  //     const alternativeArr: any[] = [];

  //     // Do something with the name parameter
  //     this.mapService.getLocationByName(nameBody)
  //     .subscribe(res => {
  //       console.log(res);
        
  //       this.mapData = res;
  //       console.log(this.mapData.mainroute.data);
  //       mainArr.push(this.mapData.mainroute.data.waypoints);

  //       alternativeArr.push(this.mapData.alternative.data.alternatives);
  //       const alternatives = alternativeArr[0];
  //       const altlatLngArray = alternatives.map(({ lat, lng }: { lat: number, lng: number }) => ({ lat, lng }));

  //       const waypoints = mainArr[0];
  //       const mainlatLlng: ngArray = waypoints.map(({ lat, lng }: { lat: number, lng: number }) => ({ lat, lng }));

  //       //distination coordinates
  //       const location = this.mapData.mainroute.data.location[0];

  //       const latLng = {
  //         lat: location.lat,
  //         lng: location.lng
  //       };

  //       mainlatLngArray.push(latLng);
  //       altlatLngArray.push(latLng);

  //       console.log(mainlatLngArray);

        
  //       this.arraylist = mainlatLngArray;
        
  //       //  Get Current live location
  //       this.map.locate({setView: true});
  //       this.map.on('locationfound', (e: any) => {
  //         console.log(e.latlng);

  //         if (navigator.geolocation) {
  //           navigator.geolocation.watchPosition((position) => {
  //             const lat = position.coords.latitude;
  //             const lng = position.coords.longitude;
      
  //             mainlatLngArray.unshift({lat: lat, lng: lng});
  //             console.log(mainlatLngArray);

  //             altlatLngArray.unshift({lat: lat, lng: lng});
  //             console.log(altlatLngArray);
              
  //             // Calculate distance
  //             this.calculateDistance(mainlatLngArray, altlatLngArray);
  //           });
  //         } else {
  //           console.log('Geolocation is not supported by this browser.');
  //         }
  //       });
  //     })
  //   });
  // }

  isPointInPolygon(point: any, polygon: any) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];
      const intersect = ((yi > point[1]) != (yj > point[1])) &&
        (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  testPoint(): void{

    // Define the polygons
    const polygon1 = [[-25.54050540139702, 28.095023632049564], [-25.540471519915943, 28.09564590454102], [-25.539890693037382, 28.09558153152466], [-25.539847130908075, 28.09505045413971]];
    const polygon2 = [[5, 5], [5, 15], [15, 15], [15, 5]];

    // Test each point in the polygons and differentiate the areas
    // const area1 = [], area2 = [];
    var isFound = false;

    const point = [-25.540292431928407, 28.095828294754032];
      if (this.isPointInPolygon(point, polygon1)) {
        isFound = true;
        
        this.mainRoute();
      } else {
        // area2.push(point);
        isFound = false;
        this.alternativeRoute();
        
        
      }

    // for (let i = 0; i < polygon1.length; i++) {
    //   const point = [-25.540365035198835, 28.095425963401798];
    //   if (this.isPointInPolygon(point, polygon1)) {
    //     area1.push(point);
    //   } else {
    //     area2.push(point);
    //   }
    // }

    
    // for (let i = 0; i < polygon2.length; i++) {
    //   const point = polygon2[i];
    //   if (this.isPointInPolygon(point, polygon2)) {
    //     area1.push(point);
    //   } else {
    //     area2.push(point);
    //   }
    // }

    // Print the differentiated areas
    // console.log('Area 1:', area1);
    // console.log('Area 2:', area2);
    console.log('is Found = ', isFound);
    
  }

}

