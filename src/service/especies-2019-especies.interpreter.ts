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
      this.defineAsHeadAndTail(especie, linhaEspecieUltimaInserida);
    }

    // se houverem 100 caracteres em branco e não houver nome cientifico, certamente não haverá
    //  nome popular, portanto sua leitura é ignorada para que não seja confundido com o bioma
    if (!listaEspeciesDoc.spy(/^[ ]{100}/, this.ignoreAutoTrim)) {
      const result = this.readNomePopularAndTamanho(listaEspeciesDoc, especie);
      this.defineAsHeadNomePopularAndTamanho(especie);
      if (result.isLineComplete) {
        this.defineAsHeadAndTail(especie, linhaEspecieUltimaInserida);
        return especie;
      }
    }

    this.readBasicEspecieAttribute(especie, listaEspeciesDoc);
    if (especie.type === 'tail') {
      this.defineAsHeadAndTail(especie, linhaEspecieUltimaInserida);
    }

    return especie;
  }

  private readBasicEspecieAttribute(
    especie: EspecieMetaData, listaEspeciesDoc: IterableString
  ): EspecieMetaData {
    const classeSucessional = this.readClasseSucessional(listaEspeciesDoc);
    if (classeSucessional) {
      especie.classeSucessional = classeSucessional;
    }

    const grupoFuncional = this.readGrupoFuncional(listaEspeciesDoc);
    if (grupoFuncional) {
      especie.grupoFuncional = grupoFuncional;
    }

    const sindromeDispersao = this.readSindromeDispersao(listaEspeciesDoc);
    if (sindromeDispersao) {
      especie.sindromeDispersao = sindromeDispersao;
    }

    const bioma = this.readBioma(listaEspeciesDoc);
    if (bioma) {
      especie.bioma = bioma;
    }

    if (!especie.tamanho && !classeSucessional && !grupoFuncional && !sindromeDispersao) {
      especie.type = 'tail';
    }

    return especie;
  }

  private readNomePopularAndTamanho(
    listaEspeciesDoc: IterableString, especie: EspecieMetaData
  ): { especie: EspecieMetaData, isLineComplete: boolean } {
    const nomePopularPattern = /^\s*([a-záãâêéíóôõúüç’\-,]+[ ]?)+[a-záãâêéíóôõúüç’\-,]\n?/;

    let wrapper = this.readTamanho(listaEspeciesDoc, especie);
    if (!wrapper && listaEspeciesDoc.spy(nomePopularPattern)) {
      const nomePopular = listaEspeciesDoc.addCursor(nomePopularPattern, this.ignoreAutoTrim);
      especie.nomePopular = nomePopular.trim();
      if (nomePopular.match(/\n$/)) {
        return { especie, isLineComplete: true };
      }

      wrapper = this.readTamanho(listaEspeciesDoc, especie);
    }

    if (wrapper && wrapper.isLineComplete) {
      return wrapper;
    }

    //  existem condições onde o tamanho está muito grudado ao nome popular
    //  o código abaixo irá verificar se está é uma situação deste tipo
    if (!wrapper && especie.nomePopular) {
      //  FIXME: preciso reaproveitar a lógica de identificação de
      //  informações de tamanho por regex para manter uma manutenção centralizada
      const checkIfHasTamanhoInTheEnd = /(\d|\(-)[\(\),\-\d]$/;

      //  verifica se existe a informação de tamanho
      //  concatenada no final do nome popular
      const hasTamanhoInTheEnd = especie.nomePopular.match(checkIfHasTamanhoInTheEnd);
      if (hasTamanhoInTheEnd) {
        const especieNomePopular = /.*[ ]/;
        const especieTamanho = /[ ][^ ]*$/;
        const tamanho = especie.nomePopular.replace(especieNomePopular, '');
        especie.nomePopular = especie.nomePopular.replace(especieTamanho, '');
        especie.tamanho = tamanho;
      }
    }

    return wrapper ? wrapper : { isLineComplete: false, especie };
  }

  private readTamanho(
    listaEspeciesDoc: IterableString, especie: EspecieMetaData
  ): { especie: EspecieMetaData, isLineComplete: boolean } | null {
    const readVegetacaoTamanho = /^[ ]+(\d|\(-)[ \(\),\-\d\/]*\n?/;
    const tamanho = listaEspeciesDoc.addCursor(readVegetacaoTamanho, this.ignoreAutoTrim);
    if (!tamanho) {
      return null;
    }

    especie.tamanho = tamanho.trim();
    if (tamanho.match(/\n$/)) {
      especie.type = 'tail';
      return { especie, isLineComplete: true };
    }

    return { especie, isLineComplete: false };
  }

  private defineAsHeadAndTail(
    linhaEspecieTail: EspecieMetaData, linhaEspecieHead: EspecieMetaData | null
  ): void {
    if (linhaEspecieHead) {
      linhaEspecieHead.type = 'head';
    }

    linhaEspecieTail.type = 'tail';
  }

  private defineAsHeadNomePopularAndTamanho(especie: EspecieMetaData): void {
    const nomePopular = especie.nomePopular || '';
    const nomePopularThereIsMore = nomePopular.match(/[,-]$/);

    const tamanho = especie.tamanho || '';
    const tamanhoThereIsMore = tamanho.match(/\-$/);

    if (nomePopularThereIsMore || tamanhoThereIsMore) {
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
      this.defineAsHeadAndTail(especie, linhaEspecieUltimaInserida);
      if (especie.type !== 'full') {
        isLineComplete = true;
      }
    }

    //  não está na declaração, pois durante a rotina de de
    especie.type = linhaEspecieUltimaInserida?.type === 'head' ? 'tail' : especie.type;

    return { isLineComplete };
  }

  private readClasseSucessional(listaEspeciesDoc: IterableString): string {
    const readClasseSucessional = /^\s*((P\/NP)|P|NP)[ ]/;
    return listaEspeciesDoc.addCursor(readClasseSucessional);
  }

  private readGrupoFuncional(listaEspeciesDoc: IterableString): string {
    const readGrupoFuncional = /^\s*(D|P)[ ]/;
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
