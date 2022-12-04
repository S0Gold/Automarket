import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Announcement } from '../Model/announcement';
declare var google: any

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  @Input() announcement! : Announcement;
  @Input() modify : Boolean = true;
  options: any;
  overlays: any[] = [];
  dialogVisible: boolean = false;
  markerTitle?: string | null;
  selectedPosition: any;
  infoWindow: any;
  draggable: boolean = false;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {

    if(this.announcement.latitude !=0 && this.announcement.longitude !=0) {
      this.addMarker(this.announcement.latitude, this.announcement.longitude);
      this.options = {
        center: { lat: this.announcement.latitude, lng: this.announcement.longitude },
        zoom: 7
      };
    }
    else {
        this.options = {
          center: { lat: 45, lng: 25 },
          zoom: 7
        };
      
  
    }

    //this.initOverlays();
    //this.infoWindow = new google.maps.InfoWindow();
  }

  handleMapClick(event: any) {
    if(!this.modify) return;

    this.clear();
    this.selectedPosition = event.latLng;
    this.announcement.latitude = this.selectedPosition.lat();
    this.announcement.longitude = this.selectedPosition.lng();
    this.addMarker(this.announcement.latitude, this.announcement.longitude);
  }

  handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());

      this.messageService.add({ severity: 'info', summary: 'Marker Selected', detail: title });
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Shape Selected', detail: '' });
    }
  }

  addMarker(lat: number, long :number) {
    this.overlays.push(new google.maps.Marker(
      {position: { lat: lat, lng: long }, title: this.markerTitle, draggable: this.draggable }
    ));
    this.markerTitle = null;
  }

  handleDragEnd(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Marker Dragged', detail: event.overlay.getTitle() });
  }

  initOverlays() {
    if (!this.overlays || !this.overlays.length) {
      this.overlays = [
        // new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: "Konyaalti" }),
        // new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
        // new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
        new google.maps.Polygon({
          paths: [
            { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
          ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
        }),
        new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
        new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
      ];
    }
  }

  zoomIn(map: any) {
    map.setZoom(map.getZoom() + 1);
  }

  zoomOut(map: any) {
    map.setZoom(map.getZoom() - 1);
  }

  clear() {
    this.overlays = [];
  }
}