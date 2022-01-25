import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
declare var mapboxgl: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit,AfterViewInit {

  
  lat: number;
  lng: number;
  
r1;
r2;
  constructor(private modalController:ModalController) { }

  ngOnInit() {
    this.lat = -0.25305;
    this.lng = -79.17536;
  }
  cerrar(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  ngAfterViewInit() {

    mapboxgl.accessToken = 'pk.eyJ1IjoidmlsbGVndWl0YXMiLCJhIjoiY2tsaDN6dDFuNDlwejJ2bnJlN3dpcGUwaCJ9.Vt95ktwq1W6TLS10xsHPuw';
    const coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-79.17536, -0.25305],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
      });
      map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
        })
        );
      map.on('load', () => {
        // Marker
        let marker = new mapboxgl.Marker({
          draggable: true
          })
          .setLngLat([this.lng, this.lat])
          .addTo(map);
          
          function onDragEnd() {
          const lngLat = marker.getLngLat();
          coordinates.style.display = 'block';
          coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
          this.lng = lngLat.lng;
          this.lat = lngLat.lat;
          console.log(this.lng,this.lat);
         const coordenadas={
            lat:lngLat.lat,
            lng:lngLat.lng
          }
          localStorage.setItem('coordenadas',JSON.stringify(coordenadas));
          }
           
          marker.on('dragend', onDragEnd);
          //
        map.resize();
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;
         
        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
          
        });

  }
salir2(){
this.modalController.dismiss({
  lat:this.lat,
  lng:this.lng
})
}
}
