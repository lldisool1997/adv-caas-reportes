
export interface httpResponse<T>{
  metadata : metadata[],
  response: response<T>
}

export interface metadata{
    code: string,
    message: string
}

export interface response<T>{
    asientos: T[]
}