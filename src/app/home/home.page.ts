import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { GetDataService } from '../services/get-data.service';
import { Sismo } from '../interfaces/Sismo';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any
  sismos: Sismo[] = []
  constructor(private getservice: GetDataService, private loadingCtrl: LoadingController, private navCtrl: NavController) {}

  ngOnInit() {
    this.getDataSismos()
  }

  async getDataSismos(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando datos',
      spinner: 'lines-sharp-small',
    });
    await loading.present();

    this.getservice.getData().subscribe(datos => {
      this.data = datos;
      console.log(this.data);
  
      const info = this.data.features.map((feature: any) => {
        return feature;
      });
  
      console.log(info);
  
      // Agregar cada sismo al array this.sismos
      info.slice(0,6).forEach((sismo: any) => {
        loading.dismiss();
        this.sismos.push(sismo);


      // Separar las coordenadas de cada sismo aquí
        const coordenadasArray = sismo.geometry.coordinates.splice(0);
        const latitud = Number(coordenadasArray[0]);
        const longitud = Number(coordenadasArray[1]);

      // Puedes hacer lo que desees con latitud y longitud aquí.
      sismo.latitud = latitud;
      sismo.longitud = longitud;
      });
    });
  }

  async redireccionarMapa(lat: number, lon: number){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando datos',
      spinner: 'lines-sharp-small',
    });
    await loading.present();
    
    this.navCtrl.navigateForward('/map', {
      queryParams: {
        lat: lat,
        lon: lon,        
      }
    });
    loading.dismiss();
  }
  
}
