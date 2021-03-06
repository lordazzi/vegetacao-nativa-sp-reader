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
      nome: "Avicennia germinans (L.) L.",
      type: "full",
      tamanho: "3-10",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "AUT",
      bioma: "Manguezal"
    });
  });

  it('[espécie parcial nome head]', () => {
    expect(metaDocumento[2]?.tipos[0].familias[8].especies[0]).to.eql({
      nome: "Cybistax antisyphilitica (Mart.) Mart.",
      nomePopular: "ipê-da-flor-verde, ipê-verde, caroba-da-",
      type: "head",
      tamanho: "4-20",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "ANE",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[espécie parcial nome head]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[0].especies[1]).to.eql({
      nome: "Avicennia schaueriana Stapf & Leechm. ex",
      type: "head",
      nomePopular: "mangue-amarelo, mangre-branco",
      tamanho: "3-7",
      classeSucessional: "P",
      grupoFuncional: "P",
      sindromeDispersao: "AUT",
      bioma: "Manguezal"
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
      nome: "Schinus terebinthifolius Raddi",
      type: "head",
      nomePopular: "aroeira-pimenteira, aroeira-mansa,",
      tamanho: "5-10",
      classeSucessional: "P",
      grupoFuncional: "P",
      sindromeDispersao: "ZOO",
      bioma: "Restinga/ Floresta Ombrófila Densa"
    });
  });

  it('[espécie parcial nomePopular tail]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[3]).to.eql({
      type: "tail",
      nomePopular: "aroeirinha, aroeira-pimenta"
    });
  });

  it('[espécie tamanho]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[0]).to.eql({
      nome: "Annona cacans Warm.",
      type: "full",
      nomePopular: "araticum, araticum-cagão, fruta-do-conde",
      tamanho: "7-30",
      classeSucessional: "P",
      grupoFuncional: "D",
      sindromeDispersao: "ZOO",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[espécie parcial nomePopular]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[4]).to.eql({
      type: "tail",
      nomePopular: "guatambu"
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
      nome: "Aspidosperma polyneuron Müll. Arg.",
      nomePopular: "peroba-rosa",
      tamanho: "6-30",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "ANE",
      bioma: "Floresta Ombrófila Densa",
      type: "full"
    });
  });

  it('[espécie parcial, com nome popular quebrado]', () => {
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

  it('[espécie parcial com quebra na sindrome de dispersão]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[27].especies[2]).to.eql({
      nome: "Abarema langsdorffii (Benth.) Barneby & J.",
      type: "head",
      nomePopular: "raposeira-branca, timbuva, olho-de-",
      tamanho: "3-10",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "AUT/",
      bioma: "Restinga/ Floresta Ombrófila Densa"
    });
  });

  it('[espécie parcial]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[27].especies[3]).to.eql({
      nome: "W. Grimes",
      type: "tail",
      nomePopular: "pomba",
      sindromeDispersao: "ZOO"
    });
  });

  it('[espécie com os dois grupos funcionais]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[18].especies[6]).to.eql({
      nome: "* Parinari brasiliensis (Schott) Hook.f.",
      type: "full",
      tamanho: "18",
      classeSucessional: "P/NP",
      grupoFuncional: "D",
      sindromeDispersao: "ZOO",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[espécie com os dois grupos funcionais]', () => {
    expect(metaDocumento[0]?.tipos[2].familias[13].especies[3]).to.eql({
      nome: "Leandra australis (Cham.) Cogn.",
      type: "full",
      nomePopular: "pixirica",
      tamanho: "0,4-3",
      classeSucessional: "P/NP",
      grupoFuncional: "D",
      sindromeDispersao: "ZOO",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[espécie com tamanho em decimal]', () => {
    expect(metaDocumento[0]?.tipos[2].familias[13].especies[17]).to.eql({
      nome: "Ossaea meridionalis D´El Rei Souza",
      type: "full",
      tamanho: "0,5-2,5",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "ZOO",
      bioma: "Restinga/ Floresta Ombrófila Densa"
    });
  });

  it('[espécie com tamanho em decimal]', () => {
    expect(metaDocumento[0]?.tipos[2].familias[13].especies[18]).to.eql({
      nome: "Ossaea sanguinea Cogn.",
      type: "full",
      nomePopular: "pixirica",
      tamanho: "0,5-2,5",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "ZOO",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[espécie com dados mal formados head]', () => {
    expect(metaDocumento[1]?.tipos[0].familias[24].especies[34]).to.eql({
      nome: "Pseudopiptadenia warmingii (Benth.)",
      type: "head",
      nomePopular: "cauvi, cambuí-vinhático, angico-cam-",
      tamanho: "16-35",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "AUT",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[espécie com dados mal formados tail]', () => {
    expect(metaDocumento[1]?.tipos[0].familias[24].especies[35]).to.eql({
      nome: "G.P.Lewis & M.P.Lima",
      type: "tail",
      nomePopular: "buim"
    });
  });

  it('[espécie com tamanho usando caracteres incomuns]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[35].especies[2]).to.eql({
      nome: "Leandra barbinervis (Cham. ex Triana) Cogn. pixirica",
      type: "full",
      tamanho: "1 /2-8",
      classeSucessional: "P",
      grupoFuncional: "D",
      sindromeDispersao: "ZOO",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[espécie número 3 no ínicio muito distante head]', () => {
    expect(metaDocumento[1]?.tipos[0].familias[24].especies[38]).to.eql({
      nome: "3      Senegalia polyphylla (DC.) Britton &",
      type: "head",
      nomePopular: "monjoleiro, espinho-de-maricá, monjo-",
      tamanho: "15-20",
      classeSucessional: "P",
      grupoFuncional: "P",
      sindromeDispersao: "AUT",
      bioma: "Restinga, Floresta Ombrófila Densa"
    });
  });

  it('[espécie número 3 no ínicio muito distante tail]', () => {
    expect(metaDocumento[1]?.tipos[0].familias[24].especies[39]).to.eql({
      nome: "Rose",
      type: "tail",
      nomePopular: "leiro-branco"
    });
  });

  it('[espécie número 3 no ínicio muito distante]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[30].especies[25]).to.eql({
      nome: "*  Ocotea catharinensis Mez",
      type: "full",
      nomePopular: "canela-coqueiro",
      tamanho: "30",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "ZOO",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[espécie com quebra de linha na sindrome de dispersão head]', () => {
    expect(metaDocumento[1]?.tipos[0].familias[24].especies[29]).to.eql({
      nome: "Ormosia arborea (Vell.) Harms",
      type: "head",
      nomePopular: "olho-de-cabra, olho-de-cabra-vermelho",
      tamanho: "15-20",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "AUT/",
      bioma: "Restinga, Floresta Ombrófila Densa"
    });
  });

  it('[espécie com quebra de linha na sindrome de dispersão tail]', () => {
    expect(metaDocumento[1]?.tipos[0].familias[24].especies[30]).to.eql({
      type: "tail",
      sindromeDispersao: "ZOO"
    });
  });

  it('[nome popular com acento]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[27].especies[13]).to.eql({
      nome: "Copaifera langsdorffii Desf.",
      type: "full",
      nomePopular: "óleo-de-copaíba, copaíba",
      tamanho: "10-15",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "ZOO",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[nome popular com acento]', () => {
    expect(metaDocumento[0]?.tipos[0].familias[27].especies[39]).to.eql({
      nome: "Myrocarpus frondosus Allemão",
      type: "full",
      nomePopular: "óleo-pardo, cabreúva-parda",
      tamanho: "20-30",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "ANE",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[nome popular com acento]', () => {
    expect(metaDocumento[0]?.tipos[8].familias[14].especies[3]).to.eql({
      nome: "Scoparia dulcis L.",
      nomePopular: "vassoura-de-botão",
      type: "full",
      tamanho: "0 ,1-0,6",
      classeSucessional: "P",
      grupoFuncional: "P",
      sindromeDispersao: "AUT",
      bioma: "Restinga / Floresta Ombrófila Densa"
    });
  });

  it('[nome popular com acento]', () => {
    expect(metaDocumento[1]?.tipos[0].familias[24].especies[6]).to.eql({
      nome: "Copaifera langsdorffii Desf.",
      nomePopular: "óleo-de-copaíba, copaíba",
      type: "full",
      tamanho: "10-15",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "ZOO",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[nome popular escrito de forma irregular usando caractere especial irregular]', () => {
    expect(metaDocumento[0]?.tipos[5].familias[20].especies[0]).to.eql({
      nome: "Smilax japicanga Griseb.",
      type: "full",
      nomePopular: "japicanga, jupicanga",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "ZOO",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[uso de espaço dentro do tamanho]', () => {
    expect(metaDocumento[0]?.tipos[7].familias[15].especies[1]).to.eql({
      nome: "Selaginella flexuosa Spring",
      type: "full",
      tamanho: "0 /2-0/4",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "ANE",
      bioma: "Floresta Ombrófila Densa"
    });
  });

  it('[uso de espaço dentro do tamanho]', () => {
    expect(metaDocumento[0]?.tipos[7].familias[15].especies[2]).to.eql({
      nome: "Selaginella macrostachya (Spring) Spring",
      type: "full",
      tamanho: "0 /2-0/4",
      classeSucessional: "NP",
      grupoFuncional: "D",
      sindromeDispersao: "ANE",
      bioma: "Floresta Ombrófila Densa"
    });
  });

});
