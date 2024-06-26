export interface MigracionesItemCGH {
    MES: string;
    ID: number;
    GROUP_REF: number;
    PERSPECTIVA: string;
    NOMBRE_SECTOR: string;
    NOMBRE_OBJETIVO: string | null;
    CODIGO: string;
    NOMBRE_KPI: string;
    META: string;
    CUMPLE: number;
    MEASURE_2: string;
    VALUE_COOR: number;
    MEASURE_3: string;
    MEASURE_4: string;
  }

export interface CabeceraMigracionItem {
  id?: number,
  idPlanificacion: number,
  idPeriodo: number,
  userCreate: string,
  createDate: string,
  migracionItems?: MigracionItem[]
}

export interface MigracionItem {
  id?: number,
  mes: string,
  perspectiva: string,
  sector: string,
  objetivo: string,
  codigo: string,
  kpi: string,
  meta: string,
  valorAlcanzado: number,
  cumple: number,
  analisisCoordinador: string,
  analisisController: string,
  analisisEvaluador: string,
  migracionId?: number
}
