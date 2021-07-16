import { Bioma } from './bioma.model';
import { ClasseSucessional } from './classe-sucessional.enum';
import { GrupoFuncional } from './grupo-funcional.enum';
import { SindromeDispersao } from './sindrome-dispersao.enum';
import { VegetacaoFamilia } from './vegetacao-familia.model';
import { VegetacaoTipo } from './vegetacao-tipo.model';

export interface VegetacaoEspecie {

  idPlanta?: number;

  nome: string;

  //  FIXME: transformar isso num array, as plantas tem mais de um nome popular.
  nomePopular: string | null;

  tipo: VegetacaoTipo;

  riscoExtincao: boolean;
  rapidoRecobrimento: boolean;

  grupoFuncional: GrupoFuncional;
  sindromeDispersao: SindromeDispersao;
  classeSucessional: ClasseSucessional[];
  familia: VegetacaoFamilia;

  //  Separado por barra e/ou espaço
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
