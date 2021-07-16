import { getLogger } from 'log4js';
import { RegiaoVegetal } from '../domain/regiao-vegetal.enum';
import { IterableString } from '../util/iterable-string';
import { EspecieMetaData } from './especies-2019-metadata/especie.meta-data';
import { FamiliaMetaData } from './especies-2019-metadata/familia.meta-data';
import { RegiaoMetaData } from './especies-2019-metadata/regiao.meta-data';
import { VegetacaoTipoMetaData } from './especies-2019-metadata/vegetacao-tipo.meta-data';

export class Especies2019Interpreter {

  private logger = getLogger();
  // private logger = console;

  private readonly ALL_UNTIL_NEW_LINE = /^[^\n]+/;
  private readonly READ_ALL_UNTIL_TWO_SPACES = /^\s*([^ ]+[ ])+[ ]/i;

  regiaoMap: {
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
    const identificaVegetacaoTipo = /^\s*#?\s*([^ ][ ])•/;
    const identificaFamilia = /^\s*[A-Z]+\s*\n/;

    const regioes: RegiaoMetaData[] = [];
    let regiao: RegiaoMetaData | null = null;
    let vegetacaoTipo: VegetacaoTipoMetaData | null = null;
    let familia: FamiliaMetaData | null = null;

    while (!listaEspeciesDoc.end()) {
      let result = '';

      if (result = listaEspeciesDoc.addCursor(identificaRegiao)) {
        const newRegiao = this.castTextToRegiao(result, regiao);
        if (newRegiao) {
          regioes.push(newRegiao);
          regiao = newRegiao;
          this.logger.info('região: ', regiao);
        }
      } else if (result = listaEspeciesDoc.addCursor(identificaVegetacaoTipo)) {
        vegetacaoTipo = this.castTextToVegetacaoTipo(listaEspeciesDoc);
        this.logger.info('vegetação tipo: ', vegetacaoTipo);

        if (!regiao) {
          this.logger.error('objeto região não foi encontrado para o tipo de vegetação. Vegetação tipo: ', vegetacaoTipo);
        } else {
          regiao.tipos.push(vegetacaoTipo);
        }
      } else if (result = listaEspeciesDoc.addCursor(identificaFamilia)) {
        familia = this.castTextToFamilia(result);
        this.logger.info('família: ', familia);

        if (!vegetacaoTipo) {
          this.logger.error('objeto de tipo de vegetação não foi encontrado para a família. Família: ', familia);
        } else {
          vegetacaoTipo.familias.push(familia);
        }
      } else {
        const especie = this.castIterableToEspecie(listaEspeciesDoc);
        this.logger.info('espécie: ', especie);

        if (!familia) {
          this.logger.error('objeto de família não foi encontrado para a espécie. Espécie: ', especie);
        } else {
          familia.especies.push(especie);
        }
      }
    }

    return regioes;
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

  private castTextToVegetacaoTipo(listaEspeciesDoc: IterableString): VegetacaoTipoMetaData {
    let vegetacaoTipoNome = listaEspeciesDoc.addCursor(this.ALL_UNTIL_NEW_LINE);
    vegetacaoTipoNome = vegetacaoTipoNome.replace(/•/g, '');

    return {
      nome: vegetacaoTipoNome,
      familias: []
    };
  }

  private castTextToFamilia(nome: string): FamiliaMetaData {
    return { nome, especies: [] };
  }

  private castIterableToEspecie(listaEspeciesDoc: IterableString): EspecieMetaData {
    const especie: EspecieMetaData = {};

    especie.nome = listaEspeciesDoc.addCursor(this.READ_ALL_UNTIL_TWO_SPACES);

    const readVegetacaoTamanho = /^[ ]+(\d|\(-)[\(\),\-\d]*[ ][ ]/;
    const vegetacaoTamanho = listaEspeciesDoc.addCursor(readVegetacaoTamanho);

    if (vegetacaoTamanho) {
      especie.tamanho = vegetacaoTamanho;
    } else {
      especie.nomePopular = listaEspeciesDoc.addCursor(this.READ_ALL_UNTIL_TWO_SPACES);
      especie.tamanho = listaEspeciesDoc.addCursor(readVegetacaoTamanho);
    }

    especie.classeSucessional = this.readClasseSucessional(listaEspeciesDoc);
    especie.grupoFuncional = this.readGrupoFuncional(listaEspeciesDoc);
    especie.sindromeDispersao = this.readSindromeDispersao(listaEspeciesDoc);

    const readBioma = /^[^\n]*\n/;
    especie.bioma = listaEspeciesDoc.addCursor(readBioma);

    return especie;
  }

  private readClasseSucessional(listaEspeciesDoc: IterableString): string {
    const readClasseSucessional = /^\s*(P|NP|(P\/NP))/;
    return listaEspeciesDoc.addCursor(readClasseSucessional);
  }

  private readGrupoFuncional(listaEspeciesDoc: IterableString): string {
    const readGrupoFuncional = /^\s*(D|P)/;
    return listaEspeciesDoc.addCursor(readGrupoFuncional);
  }

  private readSindromeDispersao(listaEspeciesDoc: IterableString): string {
    const readSindromeDispersao = /^\s*(ANE|AUT|HIDR|ZOO)/;

    return listaEspeciesDoc.addCursor(readSindromeDispersao);
  }

}


// REGRAS DE COMO SEPARAR O NOME DA ESPÉCIE DO NOME POPULAR
//  1. no caso mais fácil haverá pelo menos dois espaços separando os nomes
//  2. se após coletar o texto, verificar que logo após se apresenta as medições da planta, regitrar um log
//     identificando o procedimento
//  3. se o próximo item for o nome popular, então ele é coletado; se forem as medições, então seguir:
//  4. nomes populares são conjuntos de caracteres sem espaços, separados por vírgulas, verificar se este padrão
//     ocorre na sentença anterior, se sim, extrair e coletar
//  5. verificar se a próxima linha é um registro incompleto, se sim, absorver estes registros, registrar um warning
//  6. se não houver nome popular identificado, registrar um warning

// PROBLEMAS
//  A informação de região nem sempre é precedida pela palavra REGIÃO e será confundida com um nome de familia
//                                                                            L I TOR A L S U L
//  Estou presumindo que o nome das familias não tem espaço no meio.
//  Considerando isso, se não houver quebra de linha logo após o conjunto de maiusculas, não é o nome de uma familia
//  Não é garantido, toda situação de maiusculas com espaço no meio deve ter um log de warning informando.

//  WARNINGS
//  Se a espécie só tiver caracteres maiusculos, gerar um warn
