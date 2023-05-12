import { Injectable } from '@angular/core';

declare const L: any; 

@Injectable()
export class LeafletService{

  constructor()
  { }
    
  removeMap(map: any): any{
    map.off();
    map.remove();

    return map;
  }

  setMapView(map: any, lat: number, lon: number): any{
    map = L.map('map').setView([lat, lon], 8);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    L.marker([lat, lon]).addTo(map);

    return map;
  }
}