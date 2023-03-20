import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import  'leaflet-routing-machine';
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

  mapData: any;

  constructor(private mapService: MapboxServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reloadOnInit();

    this.map = L.map('map').setView([-25.54050582, 28.096141], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
    
    const destination = {lat: -25.541657366056807, lng: 28.096021413803104};

    const markers = [
      {lat: -25.540737731295003, lng: 28.096171617507938},
      {lat: -25.5408345352863, lng: 28.096053600311283},
      {lat: -25.541212070105594, lng: 28.096005320549015},
      {lat: -25.54143471828793, lng: 28.096058964729313},
      {lat: destination.lat, lng: 28.096021413803104}
    ];


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

    this.mapService.orsRouteMap(markers)
      .subscribe({next: response =>{
        const route = response.features[0].geometry.coordinates.map((coord: any[]) => [coord[1], coord[0]]);
        const polyline = L.polyline(route, { color: 'red' }).addTo(this.map);
        this.map.fitBounds(polyline.getBounds());
      },
      error: err =>{
        console.log('erorr',err);
      }
    })

    this.map.on('locationfound', (e: any) => {
      const latlng = L.latLng(e.latlng.lat, e.latlng.lng);
      console.log(latlng);
      
      this.currentLocationMarker.setLatLng(latlng);
      console.log(this.currentLocationMarker);
      
      this.routingControl.spliceWaypoints(0, 1, latlng);
    });

    this.map.locate({ watch: true });

  }

  addMaker(map: any, latlng: any): void{
    this.marker = L.marker([latlng.lat, latlng.lng]).addTo(map)
  }

  wonderparkMaker(map: any, latlng: any): void{
    this.marker = L.marker([latlng.lat, latlng.lng]).addTo(map)
  }

  reloadOnInit():void {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      console.log('location name', name);
      const nameBody = {name: name}

      const routeArr: any[] = [];
      // Do something with the name parameter
      this.mapService.getLocationByName(nameBody)
      .subscribe(res => {
        this.mapData = res;
        console.log(this.mapData.data);
        routeArr.push(this.mapData.data.waypoints);
  
        // routeArr.push(this.mapData.data.location[0]);
        console.log(routeArr[0]);
        const waypoints = routeArr[0];
        const latLngArray = waypoints.map(({ lat, lng }: { lat: number, lng: number }) => ({ lat, lng }));

        const location = this.mapData.data.location[0];

        console.log(location);

        const latLng = {
          lat: location.lat,
          lng: location.lng
        };

        latLngArray.push(latLng);
        console.log(latLngArray);

        this.makeRoute(latLngArray)
                
        this.addMaker(this.map, this.mapData.data.location[0]);
      })
    });
  }

  makeRoute(route: any): void{
    let routePolyline = L.polyline(route, {color: 'red', weight: 2.5}).addTo(this.map);
  }

}