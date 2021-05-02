import { RegiaoVegetal } from '../../domain/regiao-vegetal.enum';
import { VegetacaoTipoMetaData } from './vegetacao-tipo.meta-data';

export interface RegiaoMetaData {
  regiao: RegiaoVegetal;
  tipos: VegetacaoTipoMetaData[];
}
