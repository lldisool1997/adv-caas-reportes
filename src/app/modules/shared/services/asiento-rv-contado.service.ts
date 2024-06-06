import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AsientoRequest, dataAsientos } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { HttpResponseList } from 'src/app/core/models/generico/http';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class AsientoRvContadoService {  


  private apiUrl : string;
  constructor(private http_Client : HttpClient) {
    this.apiUrl = enviroment.apiUrlAssinet;
  }

  getAsientosRVContado(data : AsientoRequest): Observable<HttpResponseList<dataAsientos,'asientos'>> {
    const endpoint = `${this.apiUrl}/listar-rv-contado`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http_Client.post<HttpResponseList<dataAsientos, 'asientos'>>(endpoint,data,{ headers }).pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}
