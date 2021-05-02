import { EspecieMetaData } from './especie.meta-data';

export interface FamiliaMetaData {
  nome: string;
  especies: EspecieMetaData[];
}
