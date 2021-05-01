import { getLogger } from 'log4js';
import { RegiaoVegetal } from "../domain/regiao-vegetal.enum";
import { IterableString } from "../util/iterable-string";
import { EspecieMeta } from "./especies-2019-metadata/especie.meta";
import { FamiliaMeta } from "./especies-2019-metadata/familia.meta";
import { RegiaoMeta } from "./especies-2019-metadata/regiao.meta";
import { VegetacaoTipoMeta } from "./especies-2019-metadata/vegetacao-tipo.meta";

export class Rad2019Interpreter {

  private logger = console || getLogger();
  private readonly ALL_UNTIL_NEW_LINE = /^[^\n]+/;

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

  constructor(
    content: string
  ) {
    console.info('ativou');
    this.interpret(content);
  }

  private interpret(listaEspecies2019File: string): void {
    const listaEspeciesDoc = new IterableString(listaEspecies2019File);

    const identificaRegiao = /^(\s)*REGIÃO(\s)*\n[^\n]*\n/;
    const identificaVegetacaoTipo = /^\s*#/;
    const identificaFamilia = /^\s*[A-Z]+\s*\n/;

    let regiao: RegiaoMeta | null = null;
    let vegetacaoTipo: VegetacaoTipoMeta | null = null;
    let familia: FamiliaMeta | null = null;

    while (!listaEspeciesDoc.end()) {
      let result = '';
      debugger;
      if (result = listaEspeciesDoc.addCursor(identificaRegiao)) {
        regiao = this.castTextToRegiao(result);
        this.logger.info('região: ', regiao);
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

  }

  private castTextToRegiao(result: string): RegiaoMeta {
    result = result.replace(/REGIÃO/, '').trim();
    const regiaoTipo: RegiaoVegetal | undefined = this.regiaoMap[result];

    return {
      regiao: regiaoTipo,
      tipos: []
    };
  }

  private castTextToVegetacaoTipo(listaEspeciesDoc: IterableString): VegetacaoTipoMeta {
    let vegetacaoTipoNome = listaEspeciesDoc.addCursor(this.ALL_UNTIL_NEW_LINE);
    vegetacaoTipoNome = vegetacaoTipoNome.replace(/•/g, '').trim();

    return {
      nome: vegetacaoTipoNome,
      familias: []
    };
  }

  private castTextToFamilia(result: string): FamiliaMeta {
    return { nome: result.trim(), especies: [] };
  }

  private castIterableToEspecie(listaEspeciesDoc: IterableString): EspecieMeta {
    const especie: EspecieMeta = {};

    const readNomeEspecie = /^([^ ]+[ ])+[ ]/i;
    especie.nome = listaEspeciesDoc.addCursor(readNomeEspecie).trim();

    const readVegetacaoTamanho = /^[ ]+(\d|\(-)[\(\),\-\d]*[ ][ ]/;
    const vegetacaoTamanho = listaEspeciesDoc.addCursor(readVegetacaoTamanho).trim();

    if (vegetacaoTamanho) {
      especie.tamanho = vegetacaoTamanho;
    } else {
      especie.nomePopular = vegetacaoTamanho;
      especie.tamanho = listaEspeciesDoc.addCursor(readVegetacaoTamanho).trim();
    }

    return especie;
  }

}


// REGRAS DE COMO SEPARAR O NOME DA ESPÉCIE DO NOME POPULAR
//  1. no caso mais fácil haverá pelo menos dois espaços separando os nomes
//  2. se após coletar o texto, verificar que logo após se apresenta as medições da planta, regitrar um log identificando o procedimento
//  3. se o próximo item for o nome popular, então ele é coletado; se forem as medições, então seguir:
//  4. nomes populares são conjuntos de caracteres sem espaços, separados por vírgulas, verificar se este padrão ocorre na sentença anterior, se sim, extrair e coletar
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