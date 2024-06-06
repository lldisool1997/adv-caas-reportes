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
    /* "token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJhcGk6Ly80MjQ4ZjQ0Ni1jNzE5LTQ1MjItODViOS1lNDM1MGEwZDgyYmIiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wMWVlN2FlMC00MmJhLTQxYTUtYmI3Yi04ZDRhZjhkYjdmMDcvIiwiaWF0IjoxNzE2Mzk0MTI0LCJuYmYiOjE3MTYzOTQxMjQsImV4cCI6MTcxNjM5ODAyNCwiYWlvIjoiRTJOZ1lQaDFKV08yZUpMbnRRdjVGa2N6bHRuTEF3QT0iLCJhcHBpZCI6IjQyNDhmNDQ2LWM3MTktNDUyMi04NWI5LWU0MzUwYTBkODJiYiIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzAxZWU3YWUwLTQyYmEtNDFhNS1iYjdiLThkNGFmOGRiN2YwNy8iLCJvaWQiOiI0ODZiYTljMi01NWE4LTQwNjEtYmE4Ny1hZWIzNzNlYjlmYjIiLCJyaCI6IjAuQVRRQTRIcnVBYnBDcFVHN2U0MUstTnRfQjBiMFNFSVp4eUpGaGJua05Rb05ncnMwQUFBLiIsInN1YiI6IjQ4NmJhOWMyLTU1YTgtNDA2MS1iYTg3LWFlYjM3M2ViOWZiMiIsInRpZCI6IjAxZWU3YWUwLTQyYmEtNDFhNS1iYjdiLThkNGFmOGRiN2YwNyIsInV0aSI6IjZ4VThKazlOTDBHam9lRDhGckFxQUEiLCJ2ZXIiOiIxLjAifQ.YJJpHgabLyP8LnTAWeimGAURJ5kJ_keJoR1j03C2vxplJi0KUG9bfBCW-a-w9rT5GlpJB1cq7pNlCpO1fArTpz8kXr7roHkhc2TsZkweLk163686ZxJ83-Ydxd7URSeUtdzWEhPhumqd085ysIf-Ozns_5y8FKMhmLm0aIj5xEQHyUhF6DeRP8oxEnR4dAdMS3EnShyw9pf6tmehBEw7FfIvlou9zVNdLnrcajjPmi5DVyWcSzMhUuGjyugM8AUh_wfZzOEVxlF_MEcBDrIfBHjU5QTAuO5C2fL11ht2Maeti1qgfT8UZMULlBgACwghrsGbHmFLrzzR3juR9nZ5kg",
    "externalSystem" : "17",
    "postedPeriod" : "052024",
    "journalDate" : "01052024",
    "description" : "ESTO ES UNA PRUEBITA",
    "idAsiento" : "20240514154113",
    "condicion" : "2"*/

}