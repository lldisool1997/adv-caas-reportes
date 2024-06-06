import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AsientoRequest, dataAsientos, dataToken } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { HttpResponse, HttpResponseList } from 'src/app/core/models/generico/http';
import { enviroment } from 'src/enviroments/enviroment';

const apiUrlAssinet = enviroment.apiUrlAssinet;

@Injectable({
  providedIn: 'root'
})
export class AsientoRcService {

  constructor(private http: HttpClient) { }

  getAsientoRC(data : AsientoRequest) : Observable<HttpResponseList<dataAsientos, 'asientos'>>{  
    const endpoint = `${apiUrlAssinet}/listar-rc-diario`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<HttpResponseList<dataAsientos, 'asientos'>>(endpoint,data,{ headers }).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}
