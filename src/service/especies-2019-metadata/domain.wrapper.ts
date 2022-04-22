import { Bioma } from '../../domain/bioma.model';
import { PlantaEspecie } from '../../domain/planta-especie.model';
import { VegetacaoFamilia } from '../../domain/vegetacao-familia.model';

export interface DomainWrapper {
  biomaIndexed: { [bioma: string]: PlantaEspecie[] };
  biomas: Bioma[];
  especies: PlantaEspecie[];
  familias: VegetacaoFamilia[];
}
