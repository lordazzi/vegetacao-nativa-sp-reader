import { PlantaEspecie } from './planta-especie.model';
import { RegiaoVegetal } from './regiao-vegetal.enum';

export interface VegetacaoRegiao {
  idPlantaRegiao?: number;
  regiao: RegiaoVegetal;
  planta: PlantaEspecie;
}
