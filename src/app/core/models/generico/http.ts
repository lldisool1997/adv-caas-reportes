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
};
