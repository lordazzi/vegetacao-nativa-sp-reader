import { getLogger } from 'log4js';
import { RegiaoVegetal } from '../domain/regiao-vegetal.enum';
import { IterableString } from '../util/iterable-string';
import { Especies2019EspeciesInterpreter } from './especies-2019-especies.interpreter';
import { FamiliaMetaData } from './especies-2019-metadata/familia.meta-data';
import { RegiaoMetaData } from './especies-2019-metadata/regiao.meta-data';
import { VegetacaoTipoMetaData } from './especies-2019-metadata/vegetacao-tipo.meta-data';

/**
 * 1. Responsável pela transformação literal do documento txt para um formato json,
 * representando cada linha do documento em cada objeto
 */
export class Especies2019Interpreter {

  private readonly logger = getLogger();
  private readonly especiesInterpreter = new Especies2019EspeciesInterpreter();

  private readonly regiaoMap: {
    [prop: string]: RegiaoVegetal;
  } = {
      'LITORAL SUL': RegiaoVegetal.SAO_PAULO_LITORAL_SUL,
      'LITORAL NORTE': RegiaoVegetal.SAO_PAULO_LITORAL_NORTE,
      'SUDESTE': RegiaoVegetal.SAO_PAULO_REGIAO_SUDESTE,
      'CENTRO': RegiaoVegetal.SAO_PAULO_REGIAO_CENTRO,
      'SUDOESTE': RegiaoVegetal.SAO_PAULO_REGIAO_SUDOESTE,
      'NOROESTE': RegiaoVegetal.SAO_PAULO_REGIAO_NOROESTE
    };

  // tslint:disable-next-line:cyclomatic-complexity
  interpret(listaEspecies2019File: string): RegiaoMetaData[] | null {
    const listaEspeciesDoc = new IterableString(listaEspecies2019File);

    const identificaRegiao = /^\s*#?\s*(REGIÃO(\n?)|LITORAL)[^\n]+\n/;
    const identificaVegetacaoTipo = /^\s*#?([^\n]+)\s*•/;
    const identificaFamilia = /^(\s+\n)?[A-Z]+\s*\n/;

    const regioes: RegiaoMetaData[] = [];
    let regiao: RegiaoMetaData | null = null;
    let vegetacaoTipo: VegetacaoTipoMetaData | null = null;
    let familia: FamiliaMetaData | null = null;

    while (!listaEspeciesDoc.endContent()) {
      let result = '';

      if (result = listaEspeciesDoc.addCursor(identificaRegiao)) {
        regiao = this.registerRegiao(result, regioes, regiao);
      } else if (result = listaEspeciesDoc.addCursor(identificaVegetacaoTipo)) {
        vegetacaoTipo = this.registerVegetacaoTipo(result, regiao, vegetacaoTipo);
      } else if (result = listaEspeciesDoc.addCursor(identificaFamilia)) {
        familia = this.registerFamilia(result, vegetacaoTipo, familia);
      } else {
        this.registerEspecie(familia, listaEspeciesDoc);
      }
    }

    return regioes;
  }

  private registerRegiao(result: string, regioes: RegiaoMetaData[], regiao: RegiaoMetaData | null): RegiaoMetaData | null {
    const newRegiao = this.castTextToRegiao(result, regiao);
    if (newRegiao) {
      regioes.push(newRegiao);
      this.logger.info('região: ', regiao);
      return newRegiao;
    }

    return regiao;
  }

  private registerVegetacaoTipo(
    result: string, regiao: RegiaoMetaData | null, vegetacaoTipo: VegetacaoTipoMetaData | null
  ): VegetacaoTipoMetaData | null {
    const newVegetacaoTipo = this.castTextToVegetacaoTipo(result, vegetacaoTipo);

    if (!regiao) {
      this.logger.error('objeto região não foi encontrado para o tipo de vegetação. Vegetação tipo: ', vegetacaoTipo);
      return vegetacaoTipo;
    } else if (newVegetacaoTipo) {
      regiao.tipos.push(newVegetacaoTipo);
      this.logger.info('vegetação tipo: ', newVegetacaoTipo);
      return newVegetacaoTipo;
    }

    return vegetacaoTipo;
  }

  private registerFamilia(
    result: string, vegetacaoTipo: VegetacaoTipoMetaData | null, familia: FamiliaMetaData | null
  ): FamiliaMetaData | null {
    familia = this.castTextToFamilia(result);
    this.logger.info('família: ', familia);

    if (!vegetacaoTipo) {
      this.logger.error('objeto de tipo de vegetação não foi encontrado para a família. Família: ', familia);
    } else {
      vegetacaoTipo.familias.push(familia);
    }

    return familia;
  }

  private registerEspecie(familia: FamiliaMetaData | null, listaEspeciesDoc: IterableString): void {
    if (!familia) {
      this.logger.error('objeto de família não foi encontrado para a espécie.');
      return;
    }

    const ultimoEspecieInserido = familia.especies[familia.especies.length - 1];
    const especie = this.especiesInterpreter.castIterableToEspecie(listaEspeciesDoc, ultimoEspecieInserido || null);
    this.logger.info('espécie: ', especie);
    familia.especies.push(especie);
  }

  private castTextToRegiao(result: string, regiao: RegiaoMetaData | null): RegiaoMetaData | null {
    const cleanResult = result.replace(/#|REGIÃO/g, '').trim();

    const regiaoTipo: RegiaoVegetal | undefined = this.regiaoMap[cleanResult];
    if (!regiaoTipo) {
      this.logger.warn('Região ignorada por estar fora do padrão esperada: ', result);
      return null;
    }

    if (regiaoTipo === regiao?.regiao) {
      return null;
    }

    return {
      regiao: regiaoTipo,
      tipos: []
    };
  }

  private castTextToVegetacaoTipo(result: string, vegetacaoTipo: VegetacaoTipoMetaData | null): VegetacaoTipoMetaData | null {
    let vegetacaoTipoNome = result.replace(/(#|•)/g, '').trim();
    const letrasSeparadasPorEspaco = /^([^ ]{1,2}[ ])+[^ ]$/;

    if (letrasSeparadasPorEspaco.test(vegetacaoTipoNome)) {
      vegetacaoTipoNome = vegetacaoTipoNome.replace(/ /g, '');
    }

    if (vegetacaoTipo?.nome === vegetacaoTipoNome) {
      return null;
    }

    return {
      nome: vegetacaoTipoNome,
      familias: []
    };
  }

  private castTextToFamilia(nome: string): FamiliaMetaData {
    return { nome, especies: [] };
  }
}

