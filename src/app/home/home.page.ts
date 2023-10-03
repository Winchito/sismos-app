import { Component } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { Sismo } from '../interfaces/Sismo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any
  sismos: Sismo[] = []
  constructor(private getservice: GetDataService) {}

  ngOnInit() {
    this.getDataSismos()
  }

  getDataSismos() {
    this.getservice.getData().subscribe(datos => {
      this.data = datos;
      console.log(this.data);
  
      const info = this.data.features.map((feature: any) => {
        return feature;
      });
  
      console.log(info);
  
      // Agregar cada sismo al array this.sismos
      info.forEach((sismo: any) => {
        this.sismos.push(sismo);
      });
    });
  }
  
}
