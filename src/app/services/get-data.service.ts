import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }
  apiUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&endtime'
  apiUrlFiltrada = 'https://earthquake.usgs.gov/fdsnws/event/1/query?'

 
  getData(){
    return this.http.get(this.apiUrl).pipe(
      catchError(error => {
        console.error('Ocurrió un error en la solicitud HTTP GET:', error);
        return throwError(() => error);
      })
    );
  }

  getDataFiltrada(startDate: string, endDate: string, minMagnitude?: number, city?: string) {
    const params: any = {
      format: 'geojson',
      starttime: startDate,
      endtime: endDate,
      limit: 1000,
    };

    if(minMagnitude != null){
      params['minmagnitude'] = minMagnitude.toString();
      params['maxmagnitude'] = minMagnitude.toString();
    }

    return this.http.get(this.apiUrlFiltrada, { params }).pipe(
      map((data:any) => {
        if(city){
          const resultadosFiltrados = data.features.filter((event: any) =>
          event.properties.place && event.properties.place.includes(city)
          );
          data.features = resultadosFiltrados;
        }
        return data;
      })
    )
  }

}
