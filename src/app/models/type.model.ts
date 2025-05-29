export interface Tipo {
  id: number;
  nombre: string;
}

export interface CreateTipoDTO {
  nombre: string;
}

export interface UpdateTipoDTO {
  id: number;
  nombre: string;
}

export interface SearchTipoDTO {
  nombre: string;
}