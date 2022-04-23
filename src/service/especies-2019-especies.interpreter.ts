import { IterableString } from '../util/iterable-string';
import { EspecieMetaData } from './especies-2019-metadata/especie.meta-data';

export class Especies2019EspeciesInterpreter {

  private static instance: Especies2019EspeciesInterpreter | null = null;

  private readonly checkIfHasNoEspecieName = /^[ ]/;
  private readonly ignoreAutoTrim = false;

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
      const { isLineComplete } = this.readNomeCientifico(listaEspeciesDoc, linhaEspecieUltimaInserida, especie);
      if (isLineComplete) {
        return especie;
      }

    } else {
      this.defineAsHeadOrTail(especie, linhaEspecieUltimaInserida);
    }

    const result = this.readNomePopularAndTamanho(listaEspeciesDoc, especie);
    this.defineAsHeadUsingNomePopular(especie);
    if (result.isLineComplete) {
      return especie;
    }

    this.readBasicEspecieAttribute(especie, listaEspeciesDoc);

    return especie;
  }

  private readBasicEspecieAttribute(
    especie: EspecieMetaData, listaEspeciesDoc: IterableString
  ): EspecieMetaData {
    const classeSucessional = this.readClasseSucessional(listaEspeciesDoc);
    const grupoFuncional = this.readGrupoFuncional(listaEspeciesDoc);
    const sindromeDispersao = this.readSindromeDispersao(listaEspeciesDoc);
    const bioma = this.readBioma(listaEspeciesDoc);

    if (classeSucessional) {
      especie.classeSucessional = classeSucessional;
    }

    if (grupoFuncional) {
      especie.grupoFuncional = grupoFuncional;
    }

    if (sindromeDispersao) {
      especie.sindromeDispersao = sindromeDispersao;
    }

    if (bioma) {
      especie.bioma = bioma;
    }

    return especie;
  }

  // FIXME: débito, complexidade ciclomática do método está em 8
  private readNomePopularAndTamanho(
    listaEspeciesDoc: IterableString, especie: EspecieMetaData
  ): { especie: EspecieMetaData, isLineComplete: boolean } {
    const readVegetacaoTamanho = /^[ ]+(\d|\(-)[ \(\),\-\d\/]*/;
    const nomePopularPattern = /^\s*([a-záãâêéíóôõúüç’\-,]+[ ]?)+[a-záãâêéíóôõúüç’\-,]\n?/;
    const vegetacaoTamanho = listaEspeciesDoc.addCursor(readVegetacaoTamanho);

    if (vegetacaoTamanho) {
      especie.tamanho = vegetacaoTamanho.trim();
      if (vegetacaoTamanho.match(/\n$/)) {
        return { especie, isLineComplete: true };
      }
    } else if (listaEspeciesDoc.spy(nomePopularPattern)) {

      //  se o nome popular termina com quebra de linha,
      //  então nada mais deve ser acrescentado nesta espécie
      const nomePopular = listaEspeciesDoc.addCursor(nomePopularPattern, this.ignoreAutoTrim);
      especie.nomePopular = nomePopular.trim();
      if (nomePopular.match(/\n$/)) {
        return { especie, isLineComplete: true };
      }

      let tamanho = listaEspeciesDoc.addCursor(readVegetacaoTamanho);
      if (tamanho) {
        especie.tamanho = tamanho;
      }

      //  existem condições onde o tamanho está muito grudado ao nome popular
      //  o código abaixo irá verificar se está é uma situação deste tipo
      if (!tamanho && especie.nomePopular) {
        //  FIXME: preciso reaproveitar a lógica de identificação de
        //  informações de tamanho por regex para manter uma manutenção centralizada
        const checkIfHasTamanhoInTheEnd = /(\d|\(-)[\(\),\-\d]$/;

        //  verifica se existe a informação de tamanho
        //  concatenada no final do nome popular
        const hasTamanhoInTheEnd = especie.nomePopular.match(checkIfHasTamanhoInTheEnd);
        if (hasTamanhoInTheEnd) {
          const especieNomePopular = /.*[ ]/;
          const especieTamanho = /[ ][^ ]*$/;
          tamanho = especie.nomePopular.replace(especieNomePopular, '');
          especie.nomePopular = especie.nomePopular.replace(especieTamanho, '');
          especie.tamanho = tamanho;
        }
      }
    }

    return { especie, isLineComplete: false };
  }

  private defineAsHeadOrTail(
    linhaEspecieTail: EspecieMetaData, linhaEspecieHead: EspecieMetaData | null
  ): void {
    if (linhaEspecieHead) {
      linhaEspecieHead.type = 'head';
    }

    linhaEspecieTail.type = 'tail';
  }

  private defineAsHeadUsingNomePopular(especie: EspecieMetaData): void {
    const nomePopular = especie.nomePopular || '';
    const lastCharIsNotALetter = nomePopular.match(/[,-]$/);

    if (lastCharIsNotALetter) {
      especie.type = 'head';
    }
  }

  private readNomeCientifico(
    listaEspeciesDoc: IterableString,
    linhaEspecieUltimaInserida: EspecieMetaData | null,
    especie: EspecieMetaData
  ): { isLineComplete: boolean } {
    let isLineComplete = false;
    const readEspecieNomeCientifico = /^\s*([3\*]\s*)?([^\n ]+[ ])+[ ]/i;
    especie.nome = listaEspeciesDoc.addCursor(readEspecieNomeCientifico);
    especie.type = 'full';

    //
    if (!especie.nome) {
      especie.nome = listaEspeciesDoc.addCursor(this.readAllUntilBreakLine);
      this.defineAsHeadOrTail(especie, linhaEspecieUltimaInserida);
      if (especie.type !== 'full') {
        isLineComplete = true;
      }
    }

    //  não está na declaração, pois durante a rotina de de
    especie.type = linhaEspecieUltimaInserida?.type === 'head' ? 'tail' : especie.type;

    return { isLineComplete };
  }

  private readClasseSucessional(listaEspeciesDoc: IterableString): string {
    const readClasseSucessional = /^\s*((P\/NP)|P|NP)/;
    return listaEspeciesDoc.addCursor(readClasseSucessional);
  }

  private readGrupoFuncional(listaEspeciesDoc: IterableString): string {
    const readGrupoFuncional = /^\s*(D|P)/;
    return listaEspeciesDoc.addCursor(readGrupoFuncional);
  }

  private readSindromeDispersao(listaEspeciesDoc: IterableString): string {
    const readSindromeDispersao = /^\s*((ANE|AUT|HIDR|ZOO)\/?)+/;

    return listaEspeciesDoc.addCursor(readSindromeDispersao);
  }

  private readBioma(listaEspeciesDoc: IterableString): string {
    const readBioma = /^[^\n]*\n/;
    return listaEspeciesDoc.addCursor(readBioma);
  }
}
