export interface Pais {
  id: number;
  nombre: string;
}

export interface CreatePaisDTO {
  nombre: string;
}

export interface UpdatePaisDTO {
  id: number;
  nombre: string;
}

export interface SearchPaisDTO {
  nombre: string;
}