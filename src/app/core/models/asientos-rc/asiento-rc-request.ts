export interface AsientoRcRequest {
    fecha? : String;
}

export interface dataAsientosRC {
    accountCode: string;
    subAccountCode: String;
    fundcode: string;
    functionCode: string;
    restriccionCode: string;
    entityValue: string;
    sendMemo: string;
    descripcion?: string; 
  }