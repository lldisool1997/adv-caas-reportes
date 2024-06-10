import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { logAsientosCAASRequest } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { HttpResponseList, logAsientosCAAS } from 'src/app/core/models/generico/http';
import { enviroment } from 'src/enviroments/enviroment';

const apiUrlAssinet = enviroment.apiUrlAssinet;

@Injectable({
  providedIn: 'root'
})
export class LogAsientosCaasService {

  constructor(
    private http: HttpClient
  ) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

  getAsientosLogs(data : logAsientosCAASRequest) : Observable<HttpResponseList<logAsientosCAAS,'logs'>>{
    const endpoint = `${apiUrlAssinet}/listar-logs`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<HttpResponseList<logAsientosCAAS,'logs'>>(endpoint,data,{ headers }).pipe(catchError(this.handleError));

  }


}