import { Bioma } from './bioma.model';
import { ClasseSucessional } from './classe-sucessional.enum';
import { VegetacaoFamilia } from './vegetacao-familia.model';
import { VegetacaoTipo } from './vegetacao-tipo.model';

export interface VegetacaoEspecie {

  idPlanta?: number;

  nome: string;
  nomePopular: string | null;

  tipo: VegetacaoTipo;

  riscoExtincao: boolean;
  rapidoRecobrimento: boolean;

  classeSucessional: ClasseSucessional[];
  familia: VegetacaoFamilia;
  bioma: Bioma[];

  /**
   * Medição em centímetros
   */
  altura: {
    de: number;
    ate: number;
    raizes: number | null;
  };
}
