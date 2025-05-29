import { Pais } from './country.model';
import { Tipo } from './type.model';

export interface Festivo {
  id: number;
  nombre: string;
  dia: number;
  mes: number;
  diasPascua: number;
  pais: Pais;
  tipo: Tipo;
}

export interface CreateFestivoDTO {
  nombre: string;
  dia: number;
  mes: number;
  diasPascua: number;
  paisId: number;
  tipoId: number;
}

export interface UpdateFestivoDTO {
  id: number;
  nombre: string;
  dia: number;
  mes: number;
  diasPascua: number;
  paisId: number;
  tipoId: number;
}

export interface SearchFestivoDTO {
  nombre: string;
}

export interface FestivoDto {
  fecha: string;
  nombre: string;
}

export interface VerificarFestivoRequest {
  idPais: number;
  año: number;
  mes: number;
  dia: number;
}
