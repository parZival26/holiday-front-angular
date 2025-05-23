export interface Country {
  id: number;
  nombre: string;
}

export interface CreateCountryDTO {
  nombre: string;
}

export interface UpdateCountryDTO {
  id: number;
  nombre: string;
}
