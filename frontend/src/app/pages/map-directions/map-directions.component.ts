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
    this.map = L.map('map').setView([-25.549327, 28.08957], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
    

    const markers = [
      { lat: -25.523976, lng: 28.108543 },
       { lat: -25.549327, lng: 28.08957 }  
    ];

    this.addMaker(this.map, markers)
    this.marker = L.marker([-25.523976, 28.108543]).addTo(this.map)

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

}