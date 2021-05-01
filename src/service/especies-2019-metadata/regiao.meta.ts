import { RegiaoVegetal } from '../../domain/regiao-vegetal.enum';
import { VegetacaoTipoMeta } from './vegetacao-tipo.meta';

export interface RegiaoMeta {
  regiao: RegiaoVegetal;
  tipos: VegetacaoTipoMeta[];
}
