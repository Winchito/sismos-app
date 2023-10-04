import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {


  constructor(private route: ActivatedRoute, private router: Router) { }

  latitud: number;
  longitud: number;


  ionViewDidEnter() {

    this.route.queryParams.subscribe(params =>{
      if (params && params['lat'] && params['lon']) {
        const lat = +params['lat']; // Convierte a número
        const lon = +params['lon']; // Convierte a número
        this.latitud = lat;
        this.longitud =  lon;
      } else {
        this.router.navigate(['/error']);
      }
    });

    setTimeout(async () => {
    await this.createMap();
      }, 500);
   }

   @ViewChild('map') public mapEl: ElementRef<HTMLElement>;
   newMap: GoogleMap;

   private async createMap(): Promise<void>{
    this.newMap = await GoogleMap.create({
      id: 'mapa',
      element: this.mapEl.nativeElement,
      apiKey: environment.keys.googleMaps,
      config: {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 10,
        },
      });
      this.addMarkerOnMap(this.latitud, this.longitud);
    };

    private async addMarkerOnMap(longitud: number, latitud: number): Promise<void>{
      this.newMap.addMarker({
        coordinate:{
          lat: latitud,
          lng: longitud
          },
          });
      this.setCameraOnMap(longitud, latitud);
        };
    
    private async setCameraOnMap(longitud: number, latitud: number): Promise<void>{
      this.newMap.setCamera({
        coordinate:{
          lat: latitud,
          lng: longitud
        },
        animate: true,
        zoom: 8,
        });
       };
    
}
