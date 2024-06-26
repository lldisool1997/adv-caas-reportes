import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { CabeceraMigracionItem } from 'src/app/models/migraciones/migraciones';

const urlADVE =  `${enviroment.apiUrlAdvECgh}/reportes`;
const urlCAAS =  `${enviroment.apiUrlAdvECAAS}/migracion-servicios`;

@Injectable({
  providedIn: 'root'
})
export class MigracionService {

  constructor(private http: HttpClient) { }

  getPlanificaciones(): Observable<any> {
    return this.http.get<any>(`${urlADVE}/GetDataPlanificacionCAAS`);
  }

  getPeriodos(idStage: number): Observable<any> {
    return this.http.get<any>(`${urlADVE}/GetDataPeriodos/${idStage}`);
  }

  getDataMigraciones(idPeriodo: string): Observable<any> {
    return this.http.get<any>(`${urlADVE}/GetDataResultEvaluaciones/${idPeriodo}`);
  }

  getDataMigracionesFila(idPeriodo: string, filas: number): Observable<any> {
    return this.http.get<any>(`${urlADVE}/GetDataResultEvaluaciones/${idPeriodo}/${filas}`);
  }

  saveMigration(cabeceraMigracionItem: CabeceraMigracionItem){
    return this.http.post<any>(`${urlCAAS}/save-migracion`, cabeceraMigracionItem);
  }

  getMigrationCAAS(idPlanificacion: number, idPeriodo: number){
    return this.http.get<any>(`${urlCAAS}/get-last-migracion/${idPlanificacion}/${idPeriodo}`);
  }
}
