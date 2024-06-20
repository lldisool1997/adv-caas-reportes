import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

const url =  `${enviroment.apiUrlAdvECghLocal}/reportes`;

@Injectable({
  providedIn: 'root'
})
export class MigracionService {

  constructor(private http: HttpClient) { }

  getPlanificaciones(): Observable<any> {
    return this.http.get<any>(`${url}/GetDataPlanificacionCAAS`);
  }

  getPeriodos(idStage: number): Observable<any> {
    return this.http.get<any>(`${url}/GetDataPeriodos/${idStage}`);
  }

  getDataMigraciones(idPeriodo: string): Observable<any> {
    return this.http.get<any>(`${url}/GetDataResultEvaluaciones/${idPeriodo}`);
  }

  getDataMigracionesFila(idPeriodo: string, filas: number): Observable<any> {
    return this.http.get<any>(`${url}/GetDataResultEvaluaciones/${idPeriodo}/${filas}`);
  }
}
