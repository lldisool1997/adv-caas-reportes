import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { dataToken, requestAAsinet } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { ApiResponse, ApiResult, PlanCuentasRequest, HttpResponse } from 'src/app/core/models/generico/http';
import { enviroment } from 'src/enviroments/enviroment';

const apiUrlAssinet = enviroment.apiUrlAssinet;

@Injectable({
  providedIn: 'root'
})
export class SendAsientosService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

  senAsientosGenerico(data :requestAAsinet) : Observable<ApiResponse<ApiResult>>{

    const endpoint = `${apiUrlAssinet}/asientos`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ApiResponse<ApiResult>>(endpoint,data,{ headers });
  }

  senPlanCuentas(data :PlanCuentasRequest) : Observable<ApiResponse<ApiResult>>{

    const endpoint = `${apiUrlAssinet}/send`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ApiResponse<ApiResult>>(endpoint,data,{ headers });
  }

  getToken() : Observable<HttpResponse<dataToken, 'token'>>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const endpoint = `${apiUrlAssinet}/generar-token`;
    return this.http.get<HttpResponse<dataToken, 'token'>>(endpoint,{ headers }).pipe(catchError(this.handleError));
  } 

}
