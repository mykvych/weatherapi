import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LeafletService } from 'src/app/services/leaflet.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  map: any;

  @Input() lat: string = '';
  @Input() lon: string = '';

  constructor(private leaflet: LeafletService) {
  }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.map !== undefined){
      this.leaflet.removeMap(this.map);
      this.map = undefined;
    }
    
    if(this.lat !== '' || this.lon !== '')
      this.map = this.leaflet.setMapView(this.map, Number(this.lat), Number(this.lon));
  }
}
