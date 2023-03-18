import { Component, OnInit } from '@angular/core';
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

  constructor(private mapService: MapboxServiceService) { }

  ngOnInit(): void {
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

     
      // {lat: -25.540737731295003, lng: 28.096171617507938}
      // 1
      // : 
      // {lat: -25.5408345352863, lng: 28.096053600311283}
      // 2
      // : 
      // {lat: -25.541212070105594, lng: 28.096005320549015}
      // 3
      // : 
      // {lat: -25.54143471828793, lng: 28.096058964729313}
      // 4
      // : 
      // {lat: -25.541657366056807, lng: 28.096021413803104}

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

    this.addMaker(this.map, markers)
    this.wonderparkMaker(this.map, markers)
    this.marker = L.marker([-25.523976, 28.108543]).addTo(this.map)

    let routePolyline = L.polyline(markers, {color: 'red', weight: 2.5}).addTo(this.map);

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
    this.marker = L.marker([-25.549327, 28.08957]).addTo(map)
  }

  wonderparkMaker(map: any, latlng: any): void{
    this.marker = L.marker([-25.66288803, 28.10889821]).addTo(map)
  }

}