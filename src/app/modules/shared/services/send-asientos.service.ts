import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { requestAAsinet } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { ApiResponse, ApiResult, ArrayOfAccount, ExternalMultipleAccountingResult, HttpResponseAAsinet, PlanCuentasRequest } from 'src/app/core/models/generico/http';
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


}
