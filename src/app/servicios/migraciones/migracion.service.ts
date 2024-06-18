import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

const url =  `${enviroment.apiUrlAdvECgh}/reportes`;

@Injectable({
  providedIn: 'root'
})
export class MigracionService {

  constructor(private http: HttpClient) { }

  getPeriodos(): Observable<any> {
    return this.http.get<any>(`${url}/GetDataPeriodos`);
  }

  getDataMigraciones(idPeriodo: number): Observable<any> {
    return this.http.get<any>(`${url}/GetDataResultEvaluaciones/${idPeriodo}`);
  }
}
