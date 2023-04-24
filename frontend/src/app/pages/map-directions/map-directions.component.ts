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
    
    this.testPoint();

    this.map = L.map('map').setView([-25.54050582, 28.096141], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);

    // this.alternativeRoute();
    // this.mainRoute();
    // this.getFastestRoute();

    this.locations();

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
    this.marker = L.marker([latlng.lat, latlng.lng]).addTo(map);
    // this.marker.bindPopup('Cafeteria').openPopup();
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
          sessionStorage.setItem("location", JSON.stringify(e.latlng));
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
          sessionStorage.setItem("location", JSON.stringify(e.latlng));

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
            sessionStorage.setItem("location", JSON.stringify(e.latlng));
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
          sessionStorage.setItem("location", JSON.stringify(e.latlng));

          if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              console.log(position.coords);
              // localStorage.setItem('currentLocation', position.coords)
              
      
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

          sessionStorage.setItem("location", JSON.stringify(e.latlng));
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
            sessionStorage.setItem("location", JSON.stringify(e.latlng));
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

  alternativeRouteTwo(): void{
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
        console.log(this.mapData.alternative_two.data);
        routeArr.push(this.mapData.alternative_two.data.alternatives_two);

        // this.calculateDistance(latLngArray)

        const waypoints = routeArr[0];
        const latLngArray = waypoints.map(({ lat, lng }: { lat: number, lng: number }) => ({ lat, lng }));

        const location = this.mapData.alternative_two.data.location[0];

        const latLng = {
          lat: location.lat,
          lng: location.lng
        };

        latLngArray.push(latLng);
        console.log(latLngArray);

        
        this.arraylist = latLngArray;
        
                
        this.addMaker(this.map, this.mapData.alternative_two.data.location[0]);

        //  Get Current live location
        this.map.locate({setView: true});
        this.map.on('locationfound', (e: any) => {
          console.log(e.latlng);
          sessionStorage.setItem("location", JSON.stringify(e.latlng));

          if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              console.log(position.coords);
              // localStorage.setItem('currentLocation', position.coords)
              
      
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

          sessionStorage.setItem("location", JSON.stringify(e.latlng));
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
            sessionStorage.setItem("location", JSON.stringify(e.latlng));
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

  fromB10: boolean = false;

  testPoint(): void{

    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      console.log('location name', name);
      const nameBody = {name: name}

      if(name == 'Cafeteria'){
        const Cafeteria_polygon1 = [
          [-25.540703849879574, 28.0973356962204],
          [-25.540582844746368, 28.09490025043488],
          [-25.539426029508814, 28.095077276229862],
          [-25.539401828234045, 28.097212314605716]
        ];

        const Cafeteria_polygon2 = [
          [-25.541047503792058, 28.09589803218842],
          [-25.542581833892154, 28.095930218696594],
          [-25.54234466743092, 28.097421526908878],
          [-25.541071704734673, 28.097539544105533]
        ];

        const location = JSON.parse(sessionStorage.getItem("location") || '{}');

        const point = [-25.541638005397672, 28.09682610838899];
        let isFound = false;

        if (this.isPointInPolygon(point, Cafeteria_polygon1)) {
          isFound = true;
          this.fromB10 = true;
          this.alternativeRoute();

        }else if(this.isPointInPolygon(point, Cafeteria_polygon2)){
          this.alternativeRouteTwo();
        }
        else {
          // area2.push(point);
          isFound = false;
          this.mainRoute();
           
        }
      }
      

    });    
  }

  locations(): void{

    const redIcon = L.icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      iconSize: [17, 30],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [8, -16],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [30, 30],
      shadowAnchor: [12, 41]
    });

    
    
    const B10 = L.marker([-25.539677722476988, 28.09557616710663], { icon: redIcon }).addTo(this.map);
    B10.bindPopup('Building 10').openPopup();

    const OneStop = L.marker([-25.54049572097484, 28.095329403877262], { icon: redIcon }).addTo(this.map);
    OneStop.bindPopup('One Stop Registration').openPopup();

    const ruthHall = L.marker([-25.541783210265034, 28.09585511684418], { icon: redIcon }).addTo(this.map);
    ruthHall.bindPopup('Ruth First Hall').openPopup();

    const library = L.marker([-25.540098822992334, 28.095468878746036], { icon: redIcon }).addTo(this.map);
    library.bindPopup('Library').openPopup();


    const iCenter = L.marker([-25.540098822992334, 28.095661997795105], { icon: redIcon }).addTo(this.map);
    iCenter.bindPopup('I-Center').openPopup();

    // -25.541313713892283, lng: 28.095785379409794

    const gymnesium = L.marker([-25.541420197766897, 28.095790743827823], { icon: redIcon }).addTo(this.map);
    gymnesium.bindPopup('Gymnesium').openPopup();
  }

}

