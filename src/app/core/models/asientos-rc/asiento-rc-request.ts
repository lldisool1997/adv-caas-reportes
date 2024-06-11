export interface AsientoRequest {
    fecha? : String;
}

export interface dataAsientos {
    accountCode: string;
    subAccountCode: String;
    fundcode: string;
    functionCode: string;
    restriccionCode: string;
    entityValue: string;
    sendMemo: string;
    descripcion?: string; 
  }

export interface dataToken{
    token : string;
}

export interface requestAAsinet{

    token : string,
    externalSystem : string,
    postedPeriod : string,
    journalDate : string,
    description : string,
    idAsiento : string,
    condicion : string
}

export interface logAsientosCAASRequest{
    periodo : string,
    tipo? : string,
}

export interface logDeleteAAsientoRequest{
    token : string,
    externalSystem : string,
    journalTypeCode : string,
    periodYear : string,
    periodMonth : string,
    journalCode : string,
    idLog : string
  }