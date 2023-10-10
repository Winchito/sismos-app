import { GetDataService } from './../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Sismo } from '../interfaces/Sismo';
import { NavController } from '@ionic/angular';
import { min } from 'rxjs';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {
  mostrarDatos: boolean = false;
  mostrarInicial: boolean = false;
  mostrarFinal: boolean = false;
  fechaInicialSeleccionada: string;
  fechaFinalSeleccionada: string;
  datetime1: HTMLIonDatetimeElement | null
  datetime2: HTMLIonDatetimeElement | null
  data: any
  sismos: Sismo[] = []
  ciudad: string;
  magnitud: number;

  constructor(private getservice: GetDataService, private loadingCtrl: LoadingController, private navCtrl: NavController) {}

  ngOnInit() {
    const datetimes = document.querySelectorAll('ion-datetime');
    this.datetime1 = datetimes[0];
    this.datetime2 = datetimes[1];

  }

  getSismosFiltrados(){
    this.sismos = [];
    const startDate = this.fechaInicialSeleccionada || '2023-01-01';
    const endDate = this.fechaFinalSeleccionada || this.organizarFecha(new Date()).toString();
    const minMagnitude = this.magnitud || 1;
    console.log("Valores antes de entrar al metodo de conseguir datos, startdate:"+startDate+"endDate: "+endDate+"y maginutd: "+minMagnitude)
    this.getservice.getDataFiltrada(startDate, endDate, minMagnitude).subscribe((datos: any) =>{
      this.data = datos;
      console.log(datos)

      const info = this.data.features.map((feature: any) => {
        return feature;
      });
  
      console.log(info);
  
      // Agregar cada sismo al array this.sismos
      info.slice(0,100).forEach((sismo: any) => {
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
    this.mostrarDatos = true;
  }

  organizarFecha(dateToday = new Date()){
    const year = dateToday.toLocaleString('default', {year: 'numeric'});
  const month = dateToday.toLocaleString('default', {
    month: '2-digit',
  });
  const day = dateToday.toLocaleString('default', {day: '2-digit'});

  return [year, month, day].join('-');
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

  mostrarDatetimeInicial() {
    this.mostrarInicial = true;
  }

  cerrarDatetimeInicial() {
    this.mostrarInicial = false;
  }

  guardarDatetimeInicial(){
    this.datetime1?.confirm();
    this.mostrarInicial = false;
  }
  mostrarDatetimeFinal() {
    this.mostrarFinal = true;
  }

  cerrarDatetimeFinal() {
    this.mostrarFinal = false;
  }

  guardarDatetimeFinal(){
    this.datetime2?.confirm();
    this.mostrarFinal = false;
  }

}
