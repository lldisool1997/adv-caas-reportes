import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AsientoRcRequest, dataAsientosRC, dataToken } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { HttpResponse, HttpResponseList } from 'src/app/core/models/generico/http';
import { enviroment } from 'src/enviroments/enviroment';

const apiUrlAssinet = enviroment.apiUrlAssinet;

@Injectable({
  providedIn: 'root'
})
export class AsientoRcService {

  constructor(private http: HttpClient) { }

  getAsientoRC(data : {fecha : string}) : Observable<HttpResponseList<dataAsientosRC, 'asientos'>>{  
    const endpoint = `${apiUrlAssinet}/listar-rc-diario`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<HttpResponseList<dataAsientosRC, 'asientos'>>(endpoint,data,{ headers }).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

  getToken() : Observable<HttpResponse<dataToken, 'token'>>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const endpoint = `${apiUrlAssinet}/generar-token`;
    return this.http.get<HttpResponse<dataToken, 'token'>>(endpoint,{ headers }).pipe(catchError(this.handleError));
  }


}
