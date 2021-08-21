import { expect } from 'chai';
import * as fs from 'fs';
import { Especies2019Interpreter } from '../src/service/especies-2019.interpreter';

const content = fs.readFileSync('lista-especies-rad-2019-versao-limpa.txt');
const runInterpreter = new Especies2019Interpreter();
const metaDocumento = runInterpreter.interpret(String(content).replace('\r', ''));

if (!metaDocumento) {
  throw new Error('impossible run tests, system generated a null resultset');
}

describe('regiao', () => {
  it('check regiao litoral sul', () => {
    expect(metaDocumento[0]?.regiao).equal('SAO_PAULO_LITORAL_SUL');
  });

  it('check regiao sudeste', () => {
    expect(metaDocumento[1]?.regiao).equal('SAO_PAULO_LITORAL_NORTE');
  });

  it('check regiao centro', () => {
    expect(metaDocumento[2]?.regiao).equal('SAO_PAULO_REGIAO_SUDESTE');
  });

  it('check regiao noroeste', () => {
    expect(metaDocumento[3]?.regiao).equal('SAO_PAULO_REGIAO_CENTRO');
  });

  it('check regiao sudoeste', () => {
    expect(metaDocumento[4]?.regiao).equal('SAO_PAULO_REGIAO_NOROESTE');
  });

  it('check regiao sudoeste', () => {
    expect(metaDocumento[5]?.regiao).equal('SAO_PAULO_REGIAO_SUDOESTE');
  });
});

describe('espécies', () => {
  it('[espécie]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[0].especies[0]).equal({
      "nome": "Avicennia germinans (L.) L.",
      "type": "full",
      "tamanho": "3-10",
      "classeSucessional": "NP",
      "grupoFuncional": "D",
      "sindromeDispersao": "AUT",
      "bioma": "Manguezal"
    });
  });

  it('[espécie parcial nome head]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[0].especies[0]).equal({
      "nome": "Avicennia schaueriana Stapf & Leechm. ex",
      "type": "head",
      "nomePopular": "mangue-amarelo, mangre-branco",
      "tamanho": "3-7",
      "classeSucessional": "P",
      "grupoFuncional": "P",
      "sindromeDispersao": "AUT",
      "bioma": "Manguezal"
    });
  });

  it('[espécie parcial nome tail]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[0].especies[0]).equal({
      "nome": "Moldenke",
      "type": "tail"
    });
  });

  it('[espécie parcial nomePopular head]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[2]).equal({
      "nome": "Schinus terebinthifolius Raddi",
      "type": "head",
      "nomePopular": "aroeira-pimenteira, aroeira-mansa,",
      "tamanho": "5-10",
      "classeSucessional": "P",
      "grupoFuncional": "P",
      "sindromeDispersao": "ZOO",
      "bioma": "Restinga/ Floresta Ombrófila Densa"
    });
  });

  it('[espécie parcial nomePopular tail]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[3]).equal({
      "type": "tail",
      "nomePopular": "aroeirinha, aroeira-pimenta"
    });
  });

  it('[espécie tamanho]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[6]).equal({
      "nome": "Annona cacans Warm.",
      "type": "full",
      "nomePopular": "araticum, araticum-cagão, fruta-do-conde",
      "tamanho": "7-30",
      "classeSucessional": "P",
      "grupoFuncional": "D",
      "sindromeDispersao": "ZOO",
      "bioma": "Floresta Ombrófila Densa"
    });
  });

  it('[espécie parcial nomePopular]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[6]).equal({
      "type": "tail",
      "nomePopular": "guatambu"
    });
  });

  it('[espécie]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[7]).equal({
      "nome": "Aspidosperma polyneuron Müll. Arg.",
      "nomePopular": "peroba-rosa",
      "tamanho": "6-30",
      "classeSucessional": "NP",
      "grupoFuncional": "D",
      "sindromeDispersao": "ANE",
      "bioma": "Floresta Ombrófila Densa"
    });
  });
});

