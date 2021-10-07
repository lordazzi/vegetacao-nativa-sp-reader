import { expect } from 'chai';
import * as fs from 'fs';
import { Especies2019Interpreter } from '../src/service/especies-2019.interpreter';

const content = fs.readFileSync('lista-especies-rad-2019-versao-limpa.txt');
const runInterpreter = new Especies2019Interpreter();
const metaDocumento = runInterpreter.interpret(String(content).replace('\r', ''));

if (!metaDocumento) {
  throw new Error('impossible run tests, system generated a null resultset');
}

describe('espécies', () => {
  it('[espécie]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[0].especies[0]).to.eql({
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
    expect(metaDocumento[0]?.tipos[0].familias[0].especies[1]).to.eql({
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
    expect(metaDocumento[0]?.tipos[0].familias[0].especies[2]).to.eql({
      "nome": "Moldenke",
      "type": "tail"
    });
  });

  it('[espécie parcial nomePopular head]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[2]).to.eql({
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
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[3]).to.eql({
      "type": "tail",
      "nomePopular": "aroeirinha, aroeira-pimenta"
    });
  });

  it('[espécie tamanho]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[0]).to.eql({
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
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[4]).to.eql({
      "type": "tail",
      "nomePopular": "guatambu"
    });
  });

  it('[espécie parcial nomePopular]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[5]).to.eql({
      nomePopular: "copiúva",
      type: "tail"
    });
  });

  it('[espécie]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[5]).to.eql({
      "nome": "Aspidosperma polyneuron Müll. Arg.",
      "nomePopular": "peroba-rosa",
      "tamanho": "6-30",
      "classeSucessional": "NP",
      "grupoFuncional": "D",
      "sindromeDispersao": "ANE",
      "bioma": "Floresta Ombrófila Densa",
      "type": "full"
    });
  });

  it('[espécie parcial, sem atributos faltando]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[20].especies[1]).to.eql({
      bioma: "Restinga/ Floresta Ombrófila Densa",
      classeSucessional: "NP",
      grupoFuncional: "D",
      nome: "Garcinia gardneriana (Planch. & Triana)",
      nomePopular: "bacupari, mangostão, vacupari,",
      sindromeDispersao: "ZOO",
      tamanho: "10",
      type: "head"
    });
  });

  it('[espécie parcial]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[20].especies[2]).to.eql({
      nome: "Zappi",
      nomePopular: "limãozinho",
      type: "tail"
    });
  });

  it('[espécie parcial]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[27].especies[2]).to.eql({
      "nome": "Abarema langsdorffii (Benth.) Barneby & J.",
      "type": "head",
      "nomePopular": "raposeira-branca, timbuva, olho-de-",
      "tamanho": "3-10",
      "classeSucessional": "NP",
      "grupoFuncional": "D",
      "sindromeDispersao": "AUT /",
      "bioma": "Restinga/ Floresta Ombrófila Densa"
    });
  });

  it('[espécie parcial]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[27].especies[3]).to.eql({
      "nome": "W. Grimes",
      "type": "tail",
      "nomePopular": "pomba",
      "sindromeDispersao": "ZOO"
    });
  });

});

