import { RegiaoVegetal } from './regiao-vegetal.enum';
import { VegetacaoEspecie } from './vegetacao-especie.model';

export interface VegetacaoRegiao {
  idPlantaRegiao?: number;
  regiao: RegiaoVegetal;
  planta: VegetacaoEspecie;
}
