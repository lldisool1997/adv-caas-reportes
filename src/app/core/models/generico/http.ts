// Tipo que define a estrutura de metadados
export type Metadata = {
  code: string;
  message: string;
};

// Tipo que define a estrutura de uma resposta HTTP com lista
export type HttpResponseList<T, K extends string> = {
  metadata: Metadata[];
  response: ResponseList<T, K>;
};

// Tipo que define a estrutura de uma resposta HTTP
export type HttpResponse<T, K extends string> = {
  metadata: Metadata[];
  response: Response<T, K>;

};

// Tipo que define a estrutura da resposta
export type Response<T, K extends string> = {
  [key in K]: T;
};

// Tipo que define a estrutura de uma lista de respostas
export type ResponseList<T, K extends string> = {
  [key in K]: T[];
    //OPCIONALES
}
& {
  cantProveedor?: number;
  total?: string;
  diferencia? : string;
  ingresos? : string;
  totalDebito? : string;
  totalCredito? : string; 
};

;

export type HttpResponseAAsinet<T, K extends string> = {
  code: string;
  Context: any;
  Component: any;
  Result: T | null;
  Messages: string;
};

export interface ApiResponse<T> {
  code: string;
  Context: any;
  Component: any;
  Result: T | null;
  Messages: string;
}

export interface PeriodStatusInfo {
  ClosedBy: string;
  ClosedDate: string;
  Month: string;
  Year: string;
}

export interface ArrayOfPeriodStatusInfo {
  PeriodStatusInfo: PeriodStatusInfo[];
}

export type ApiResult = ArrayOfPeriodStatusInfo | ArrayOfAccount | ExternalMultipleAccountingResult |null;

export interface ExternalMultipleAccountingResult{
  JournalInfo : JournalInfo[];
}

export interface JournalInfo{
  ItemId :string,
  JournalCode : string,
  JournalDate : string,
  JournalGuid :string,
  JournalTypeCode : string   
}

export interface ArrayOfAccount {
  Account: Account[];
}

export interface Account {
  Code: string;
  Name: string;
  AcceptEntries: string;
  Id: string;
  IsActive: string;
  Nature: string;
  ParentCode: number;
  ParentId: string;
  Restrictions: {
    BaseEntity: BaseEntity[];
  };
  SubAccountType: SubAccountType;
}

export interface Restrictions{
  baseEntity : BaseEntity[]
}

export interface BaseEntity{
  Code : string,
  Name : string,  
}

export interface SubAccountType {
  Code: string | null;
  Name: string | null;
  EnumType: string;
}


export interface PlanCuentasRequest{
  token : string,
  accountingPeriod : string,
  acceptEntries : string,

}