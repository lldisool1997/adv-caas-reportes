
export interface httpResponseList<T, key>{
  metadata : metadata[],
  response: responseList<T, key>
}

export interface httpResponse<T, key>{
  metadata : metadata[],
  response: response<T, key>
}

export interface metadata{
    code: string,
    message: string
}

export interface response<T, key>{
  [key: string]: T
}

export interface responseList<T, key>{
    [key: string]: T[]
}