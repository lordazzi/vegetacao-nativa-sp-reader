import { IterableString } from '../util/iterable-string';
import { EspecieMetaData } from './especies-2019-metadata/especie.meta-data';

export class Especies2019EspeciesInterpreter {

  private static instance: Especies2019EspeciesInterpreter | null = null;

  private readonly checkIfHasNoEspecieName = /^[ ]/;
  private readonly ignoreAutoTrim = false;
  private readonly readAllUltilTwoSpaces = /^\s*([^\n ]+[ ])+[ ]/i;
  //  read all until two spaces or breakline
  private readonly readAllUntilTwoSpacesOrBreakLine = /^\s*(([^\n ]+[ ])+[ ]|[^\n]+[ ]?\n)/i;
  private readonly readAllUntilBreakLine = /^\n*[^\n]+\n/;

  constructor() {
    if (!Especies2019EspeciesInterpreter.instance) {
      Especies2019EspeciesInterpreter.instance = this;
    }

    return Especies2019EspeciesInterpreter.instance;
  }

  castIterableToEspecie(
    listaEspeciesDoc: IterableString,
    linhaEspecieUltimaInserida: EspecieMetaData | null
  ): EspecieMetaData {
    const especie: EspecieMetaData = {};
    const hasEspecieName = !listaEspeciesDoc.spy(this.checkIfHasNoEspecieName, this.ignoreAutoTrim);

    if (hasEspecieName) {
      //  se logo depois da leitura do nome cientifico ele não foi considerado full,
      //  então quer dizer que não só ele é uma linha parcial, mas que sua alimentação
      //  com dados deve ser restringida agora
      this.readNomeCientifico(listaEspeciesDoc, linhaEspecieUltimaInserida, especie);
      if (especie.type !== 'full') {
        return especie;
      }

    } else {
      this.setAsHeadAndTail(especie, linhaEspecieUltimaInserida);
    }

    const result = this.readNomePopularAndTamanho(listaEspeciesDoc, especie);
    if (result.isLineComplete) {
      return especie;
    }

    especie.classeSucessional = this.readClasseSucessional(listaEspeciesDoc);
    especie.grupoFuncional = this.readGrupoFuncional(listaEspeciesDoc);
    especie.sindromeDispersao = this.readSindromeDispersao(listaEspeciesDoc);
    especie.bioma = this.readBioma(listaEspeciesDoc);

    return especie;
  }

  private readNomePopularAndTamanho(
    listaEspeciesDoc: IterableString, especie: EspecieMetaData
  ): { especie: EspecieMetaData, isLineComplete: boolean } {
    const readVegetacaoTamanho = /^[ ]+(\d|\(-)[\(\),\-\d]*[ ][ ]/;
    const vegetacaoTamanho = listaEspeciesDoc.addCursor(readVegetacaoTamanho);

    if (vegetacaoTamanho) {
      especie.tamanho = vegetacaoTamanho;
    } else {

      //  se o nome popular termina com quebra de linha,
      //  então nada mais deve ser acrescentado nesta espécia
      const nomePopular = listaEspeciesDoc.addCursor(this.readAllUntilTwoSpacesOrBreakLine, this.ignoreAutoTrim);
      especie.nomePopular = nomePopular.trim();
      if (nomePopular.match(/\n$/)) {
        return { especie, isLineComplete: true };
      }

      especie.tamanho = listaEspeciesDoc.addCursor(readVegetacaoTamanho);

      //  existem condições onde o tamanho está muito grudado ao nome popular
      //  o código abaixo irá verificar se está é uma situação deste tipo
      if (!especie.tamanho && especie.nomePopular) {
        //  FIXME: preciso reaproveitar a lógica de identificação de
        //  informações de tamanho por regex para manter uma manutenção centralizada
        const checkIfHasTamanhoInTheEnd = /(\d|\(-)[\(\),\-\d]$/;
        const hasTamanhoInTheEnd = especie.nomePopular.match(checkIfHasTamanhoInTheEnd);
        if (hasTamanhoInTheEnd) {
          const especieNomePopular = /.*[ ]/;
          const especieTamanho = /[ ][^ ]*$/;
          const tamanho = especie.nomePopular.replace(especieNomePopular, '');
          especie.nomePopular = especie.nomePopular.replace(especieTamanho, '');
          especie.tamanho = tamanho;
        }
      }
    }

    return { especie, isLineComplete: false };
  }

  private setAsHeadAndTail(
    linhaEspecieTail: EspecieMetaData, linhaEspecieHead: EspecieMetaData | null
  ): void {
    if (linhaEspecieHead) {
      linhaEspecieHead.type = 'head';
    }
    linhaEspecieTail.type = 'tail';
  }

  private readNomeCientifico(
    listaEspeciesDoc: IterableString,
    linhaEspecieUltimaInserida: EspecieMetaData | null,
    especie: EspecieMetaData
  ): EspecieMetaData {
    especie.nome = listaEspeciesDoc.addCursor(this.readAllUltilTwoSpaces);
    especie.type = 'full';

    if (!especie.nome) {
      especie.nome = listaEspeciesDoc.addCursor(this.readAllUntilBreakLine);
      this.setAsHeadAndTail(especie, linhaEspecieUltimaInserida);
    }

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

  private readBioma(listaEspeciesDoc: IterableString): string {
    const readBioma = /^[^\n]*\n/;
    return listaEspeciesDoc.addCursor(readBioma);
  }
}
