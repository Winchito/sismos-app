import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }
  apiUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&endtime'

 
  getData(){
    return this.http.get(this.apiUrl).pipe(
      catchError(error => {
        console.error('Ocurrió un error en la solicitud HTTP GET:', error);
        return throwError(() => error);
      })
    );
  }

}
