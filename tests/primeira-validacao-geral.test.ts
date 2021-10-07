/**
 * Este arquivo irá conter testes da parte de JSON que já garantir que está igual ao PDF,
 * tendo feito a validação observando em conjunto o documento pdf
 */

import { expect } from 'chai';
import * as fs from 'fs';
import { Especies2019Interpreter } from '../src/service/especies-2019.interpreter';

const content = fs.readFileSync('lista-especies-rad-2019-versao-limpa.txt');
const runInterpreter = new Especies2019Interpreter();
const metaDocumento = runInterpreter.interpret(String(content).replace('\r', ''));

if (!metaDocumento) {
  throw new Error('impossible run tests, system generated a null resultset');
}


const conteudoConfirmadoNoPDF = [
  {
    "regiao": "SAO_PAULO_LITORAL_SUL",
    "tipos": [
      {
        "nome": "ARBÓREAS",
        "familias": [
          {
            "nome": "ACANTHACEAE",
            "especies": [
              {
                "nome": "Avicennia germinans (L.) L.",
                "type": "full",
                "tamanho": "3-10",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "AUT",
                "bioma": "Manguezal"
              },
              {
                "nome": "Avicennia schaueriana Stapf & Leechm. ex",
                "type": "head",
                "nomePopular": "mangue-amarelo, mangre-branco",
                "tamanho": "3-7",
                "classeSucessional": "P",
                "grupoFuncional": "P",
                "sindromeDispersao": "AUT",
                "bioma": "Manguezal"
              },
              {
                "nome": "Moldenke",
                "type": "tail"
              }
            ]
          },
          {
            "nome": "ANACARDIACEAE",
            "especies": [
              {
                "nome": "Anacardium occidentale L.",
                "type": "full",
                "nomePopular": "cajueiro, acaju, caju-manso, caju-da-praia",
                "tamanho": "5-10",
                "classeSucessional": "P",
                "grupoFuncional": "P",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga"
              },
              {
                "nome": "Lithrea brasiliensis Marchand",
                "type": "full",
                "nomePopular": "aroeira, aroeira-brava, bugreiro",
                "tamanho": "4-14",
                "classeSucessional": "P",
                "grupoFuncional": "P",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga"
              },
              {
                "nome": "Schinus terebinthifolius Raddi",
                "type": "head",
                "nomePopular": "aroeira-pimenteira, aroeira-mansa,",
                "tamanho": "5-10",
                "classeSucessional": "P",
                "grupoFuncional": "P",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "type": "tail",
                "nomePopular": "aroeirinha, aroeira-pimenta"
              },
              {
                "nome": "Tapirira guianensis Aubl.",
                "type": "head",
                "nomePopular": "peito-de-pomba, peito-de-pombo,",
                "tamanho": "8-13",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "type": "tail",
                "nomePopular": "copiúva"
              }
            ]
          },
          {
            "nome": "ANNONACEAE",
            "especies": [
              {
                "nome": "Annona cacans Warm.",
                "type": "full",
                "nomePopular": "araticum, araticum-cagão, fruta-do-conde",
                "tamanho": "7-30",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Annona glabra L.",
                "type": "full",
                "nomePopular": "araticum-do-brejo, araticum",
                "tamanho": "6-8",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga"
              },
              {
                "nome": "Annona montana Macfad.",
                "type": "full",
                "nomePopular": "jaca-de-pobre",
                "tamanho": "4-9",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Annona neosericea H.Rainer",
                "type": "full",
                "nomePopular": "araticum-alvadio",
                "tamanho": "10",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Annona sylvatica A.St.-Hil.",
                "type": "full",
                "nomePopular": "cortiça-amarela, araticum-do-mato",
                "tamanho": "15",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Duguetia lanceolata A. St.-Hil.",
                "type": "full",
                "nomePopular": "pindaíva, pindaíba, biribá",
                "tamanho": "15-20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Guatteria australis A. St.-Hil",
                "type": "full",
                "nomePopular": "pindaúva-preta",
                "tamanho": "7-15",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "nome": "Porcelia macrocarpa (Warm.) R.E.Fries",
                "type": "full",
                "nomePopular": "louro-branco, banana-de-macaco",
                "tamanho": "10-20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Xylopia brasiliensis Spreng.",
                "type": "full",
                "nomePopular": "pau-de-mastro, pindaubuna",
                "tamanho": "3-10",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "nome": "Xylopia langsdorfiana A. St.Hil. & Tul.",
                "type": "full",
                "nomePopular": "pindaúva-fêmea, pimenteira-da-terra",
                "tamanho": "5-7",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              }
            ]
          },
          {
            "nome": "APOCYNACEAE",
            "especies": [
              {
                "nome": "Aspidosperma australe Müll. Arg.",
                "type": "full",
                "nomePopular": "pequiá, guatambu",
                "tamanho": "5-20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Aspidosperma cylindrocarpon Müll Arg.",
                "type": "full",
                "nomePopular": "peroba-poca, peroba-rosa",
                "tamanho": "6-30",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Aspidosperma olivaceum Müll. Arg.",
                "type": "full",
                "nomePopular": "guatambu, guatambu-mirim",
                "tamanho": "5-12",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Aspidosperma parvifolium A. DC.",
                "type": "head",
                "nomePopular": "guatambu-oliva, guatambu-amarelo,",
                "tamanho": "5-10",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "type": "tail",
                "nomePopular": "guatambu"
              },
              {
                "nome": "Aspidosperma polyneuron Müll. Arg.",
                "type": "full",
                "nomePopular": "peroba-rosa",
                "tamanho": "6-30",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Aspidosperma ramiflorum Müll. Arg.",
                "type": "full",
                "nomePopular": "guatambu, guatambu-amarelo",
                "tamanho": "10-30",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Aspidosperma tomentosum Mart.",
                "type": "head",
                "nomePopular": "peroba-do-campo, guatambu-do-",
                "tamanho": "1-6",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "type": "tail",
                "nomePopular": "cerrado, pereiro-do-campo"
              },
              {
                "nome": "Malouetia cestroides (Nees ex Mart.) Müll. leiteira, pé-de-coelho",
                "type": "head",
                "tamanho": "5-30",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "nome": "Arg.",
                "type": "tail"
              },
              {
                "nome": "Tabernaemontana catharinensis A.DC.",
                "type": "full",
                "nomePopular": "jasmim, jasmim-pipoca",
                "tamanho": "2-9",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Tabernaemontana hystrix Steud.",
                "type": "head",
                "nomePopular": "leiteiro, jasmim-do-campo, leiteiro-",
                "tamanho": "2-15",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "type": "tail",
                "nomePopular": "vermelho, gancheira"
              }
            ]
          },
          {
            "nome": "AQUIFOLIACEAE",
            "especies": [
              {
                "nome": "Ilex brevicuspis Reissek",
                "type": "full",
                "nomePopular": "caúna-da-serra",
                "tamanho": "10-20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Ilex dumosa Reissek",
                "type": "full",
                "nomePopular": "caúna-lisa, congonha-miúda",
                "tamanho": "3-20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "nome": "Ilex paraguariensis A. St.-Hil.",
                "type": "full",
                "nomePopular": "erva-mate",
                "tamanho": "4-10",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Ilex pseudobuxus Reissek",
                "type": "full",
                "nomePopular": "caúna-da-folha-miúda",
                "tamanho": "8",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga"
              },
              {
                "nome": "Ilex theezans Mart. ex Reissek",
                "type": "full",
                "nomePopular": "caúna",
                "tamanho": "1,5-20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              }
            ]
          },
          {
            "nome": "ARALIACEAE",
            "especies": [
              {
                "nome": "Dendropanax monogynus (Vell.) Seem.",
                "type": "full",
                "nomePopular": "maria-mole",
                "tamanho": "2,5-7",
                "classeSucessional": "P",
                "grupoFuncional": "P",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Oreopanax fulvus Marchal",
                "type": "full",
                "nomePopular": "figueira-do-mato, tamanqueira",
                "tamanho": "6-30",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Schefflera angustissima (Marchal) Frodin mandioqueiro",
                "type": "full",
                "tamanho": "10-20",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "nome": "Schefflera calva (Cham.) Frodin & Fiaschi mandioqueiro",
                "type": "full",
                "tamanho": "9-18",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "nome": "Schefflera macrocarpa (Cham. & Schltdl.) mandioqueiro-do-cerrado",
                "type": "head",
                "tamanho": "2-8",
                "classeSucessional": "NP",
                "grupoFuncional": "P",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Frodin",
                "type": "tail"
              },
              {
                "nome": "Schefflera morototoni (Aubl. ) Maguire et al. mandioqueiro, morototó, mandiocão",
                "type": "full",
                "tamanho": "7-30",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              }
            ]
          },
          {
            "nome": "ARECACEAE",
            "especies": [
              {
                "nome": "Astrocaryum aculeatissimum (Schott) Burret brejaúva, palmeira-brejaúva",
                "type": "full",
                "tamanho": "4-8",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "nome": "Attalea dubia (Mart.) Burret",
                "type": "full",
                "nomePopular": "palmeira-indaiá-açu",
                "tamanho": "5-25",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Bactris setosa Mart.",
                "type": "full",
                "nomePopular": "palmeira-coco-de-natal",
                "tamanho": "8",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "nome": "Euterpe edulis Mart.",
                "type": "head",
                "nomePopular": "palmito-juçara, palmiteiro, palmito-doce,",
                "tamanho": "5-12",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "type": "tail",
                "nomePopular": "jussara"
              },
              {
                "nome": "Syagrus romanzoffiana (Cham.) Glassman jerivá, palmeira-jerivá, coco-gerivá, baba-",
                "type": "head",
                "tamanho": "7-15",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "type": "tail",
                "nomePopular": "de-boi, jaruvá"
              }
            ]
          },
          {
            "nome": "ASTERACEAE",
            "especies": [
              {
                "nome": "Piptocarpha axillaris (Less.) Baker",
                "type": "full",
                "nomePopular": "vassourão-branco",
                "tamanho": "15",
                "classeSucessional": "P",
                "grupoFuncional": "P",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Piptocarpha macropoda (DC.) Baker",
                "type": "full",
                "nomePopular": "piptocarpa",
                "tamanho": "5-10",
                "classeSucessional": "P",
                "grupoFuncional": "P",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Vernonanthura discolor (Spreng.) H.Rob. vassourão-preto",
                "type": "full",
                "tamanho": "20",
                "classeSucessional": "P",
                "grupoFuncional": "P",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              }
            ]
          },
          {
            "nome": "BIGNONIACEAE",
            "especies": [
              {
                "nome": "Handroanthus heptaphyllus (Vell.) Mattos ipê-roxo, ipê-roxo-sete-folhas, ipê-rosa,",
                "type": "head",
                "tamanho": "10-20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "type": "tail",
                "nomePopular": "ipê-roxo-anão, ipê-roxo-da-mata"
              },
              {
                "nome": "Handroanthus serratifolius (Vahl) S. Grose ipê-amarelo, ipê-amarelo-do-cerrado",
                "type": "full",
                "tamanho": "8-20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Handroanthus umbellatus (Sond.) Mattos ipê-amarelo-do-brejo, ipê-amarelo",
                "type": "full",
                "tamanho": "10-25",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Jacaranda macrantha Cham.",
                "type": "head",
                "nomePopular": "carobão, caroba, carova, jacarandá-",
                "tamanho": "8-15",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Restinga"
              },
              {
                "type": "tail",
                "nomePopular": "caroba"
              },
              {
                "nome": "Jacaranda micrantha Cham.",
                "type": "head",
                "nomePopular": "caroba-miúda, jacarandá-carobão,",
                "tamanho": "10-25",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "type": "tail",
                "nomePopular": "caroba"
              },
              {
                "nome": "Jacaranda puberula Cham.",
                "type": "head",
                "nomePopular": "carobinha, caroba-do-cerrado, carova-",
                "tamanho": "4-10",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "type": "tail",
                "nomePopular": "do-brejo"
              },
              {
                "nome": "*Tabebuia cassinoides (Lam.) DC.",
                "type": "full",
                "nomePopular": "caxeta, ipê-caixeta, caixeta",
                "tamanho": "6-12",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Restinga"
              }
            ]
          },
          {
            "nome": "BORAGINACEAE",
            "especies": [
              {
                "nome": "Cordia sellowiana Cham.",
                "type": "full",
                "nomePopular": "chá-de-bugre, louro-mole",
                "tamanho": "6-15",
                "classeSucessional": "P",
                "grupoFuncional": "P",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "nome": "* Cordia silvestris Fresen",
                "type": "full",
                "tamanho": "4-20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "* Cordia trichoclada DC.",
                "type": "full",
                "nomePopular": "louro-tabaco",
                "tamanho": "8-15",
                "classeSucessional": "P",
                "grupoFuncional": "",
                "sindromeDispersao": "",
                "bioma": "/NP            D    ZOO   Floresta Ombrófila Densa"
              },
              {
                "nome": "Cordia trichotoma (Vell.) Arráb. ex Steud. louro-pardo, freijó",
                "type": "full",
                "tamanho": "5-14",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Floresta Ombrófila Densa"
              }
            ]
          },
          {
            "nome": "BURSERACEAE",
            "especies": [
              {
                "nome": "Protium heptaphyllum (Aubl.) Marchand",
                "type": "full",
                "nomePopular": "almecega, almecegueira",
                "tamanho": "5-15",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "* Protium kleinii Cuatrec.",
                "type": "head",
                "nomePopular": "almecega-branca, arméssica, arméssica-",
                "tamanho": "7-25",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "type": "tail",
                "nomePopular": "branca, pau-terebentina"
              },
              {
                "nome": "Protium widgrenii Engl.",
                "type": "full",
                "nomePopular": "almecega, almecegueira, elemi",
                "tamanho": "5-20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              }
            ]
          },
          {
            "nome": "CACTACEAE",
            "especies": [
              {
                "nome": "Pereskia aculeata Mill.",
                "type": "full",
                "nomePopular": "azedinha, espinho-preto, ora-pro-nobis",
                "tamanho": "3-7",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              }
            ]
          },
          {
            "nome": "CALOPHYLLACEAE",
            "especies": [
              {
                "nome": "Calophyllum brasiliense Cambess.",
                "type": "full",
                "nomePopular": "guanandi, mangue",
                "tamanho": "20-30",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga"
              }
            ]
          },
          {
            "nome": "CANELLACEAE",
            "especies": [
              {
                "nome": "Cinnamodendron dinisii Schwacke",
                "type": "full",
                "nomePopular": "pau-para-tudo, pimenteira",
                "tamanho": "10-20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              }
            ]
          },
          {
            "nome": "CANNABACEAE",
            "especies": [
              {
                "nome": "Celtis fluminensis Carauta",
                "type": "full",
                "tamanho": "3-20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "3 Trema micrantha (L.) Blume",
                "type": "head",
                "nomePopular": "crindiúva, pau-pólvora, candiúba,",
                "tamanho": "2-30",
                "classeSucessional": "P",
                "grupoFuncional": "P",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "type": "tail",
                "nomePopular": "pindaúva-vermelha"
              }
            ]
          },
          {
            "nome": "CARDIOPTERIDACEAE",
            "especies": [
              {
                "nome": "Citronella paniculata (Mart.) R.A. Howard",
                "type": "full",
                "nomePopular": "falsa-congonheira",
                "tamanho": "4-18",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              }
            ]
          },
          {
            "nome": "CELASTRACEAE",
            "especies": [
              {
                "nome": "Cheiloclinium cognatum (Miers) A.C.Sm.",
                "type": "full",
                "nomePopular": "saputiá, saputá, bacupari",
                "tamanho": "20",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "* Maytenus brasiliensis Mart.",
                "type": "full",
                "tamanho": "8",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Maytenus gonoclada Mart.",
                "type": "full",
                "nomePopular": "maytenus, cuinha, cafezinho",
                "tamanho": "4-13",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "nome": "Peritassa flaviflora A.C.Sm.",
                "type": "full",
                "tamanho": "15",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              }
            ]
          },
          {
            "nome": "CHLORANTHACEAE",
            "especies": [
              {
                "nome": "Hedyosmum brasiliense Mart. ex Miq.",
                "type": "full",
                "nomePopular": "erva-de-soldado, erva-cidreira",
                "tamanho": "1,5-6",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              }
            ]
          },
          {
            "nome": "CHRYSOBALANACEAE",
            "especies": [
              {
                "nome": "Couepia venosa Prance",
                "type": "full",
                "nomePopular": "oiticica-da-mata",
                "tamanho": "10",
                "classeSucessional": "P",
                "grupoFuncional": "P",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Hirtella hebeclada Moric. ex DC.",
                "type": "full",
                "nomePopular": "macucurana, pau-de-lixa",
                "tamanho": "15-18",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "nome": "Licania hoehnei Pilg.",
                "type": "full",
                "nomePopular": "cariperana, caraipé",
                "tamanho": "15",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Licania kunthiana Hook.f.",
                "type": "full",
                "nomePopular": "caraipé-branco",
                "tamanho": "25",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Floresta Ombrófila Densa"
              },
              {
                "nome": "Licania octandra (Hoffmanns. ex Roem. &",
                "type": "head",
                "nomePopular": "farinha-seca",
                "tamanho": "15",
                "classeSucessional": "NP",
                "grupoFuncional": "D",
                "sindromeDispersao": "ZOO",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              },
              {
                "nome": "Schult.) Kuntze",
                "type": "tail"
              },
              {
                "nome": "* Parinari brasiliensis (Schott) Hook.f.",
                "type": "full",
                "tamanho": "18",
                "classeSucessional": "P",
                "grupoFuncional": "",
                "sindromeDispersao": "",
                "bioma": "/NP            D   ZOO Floresta Ombrófila Densa"
              }
            ]
          },
          {
            "nome": "CLETHRACEAE",
            "especies": [
              {
                "nome": "Clethra scabra Pers.",
                "type": "full",
                "nomePopular": "guaperô, vassourão",
                "tamanho": "10-30",
                "classeSucessional": "P",
                "grupoFuncional": "D",
                "sindromeDispersao": "ANE",
                "bioma": "Restinga/ Floresta Ombrófila Densa"
              }
            ]
          }
        ]
      }
    ]
  }
];

describe('validação de amostragem', () => {
  it('[primeiras 18 espécies]', () => {

    expect(metaDocumento[0]?.tipos[0].familias[0].nome).to.eql('ACANTHACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[0].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[0].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[0].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[0].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[0].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[0].especies[2]);

    expect(metaDocumento[0]?.tipos[0].familias[1].nome).to.eql('ANACARDIACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[1].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[1].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[1].especies[2]);
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[3]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[1].especies[3]);
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[4]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[1].especies[4]);
    expect(metaDocumento[0]?.tipos[0].familias[1].especies[5]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[1].especies[5]);

    expect(metaDocumento[0]?.tipos[0].familias[2].nome).to.eql('ANNONACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[2].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[2].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[2].especies[2]);
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[3]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[2].especies[3]);
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[4]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[2].especies[4]);
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[5]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[2].especies[5]);
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[6]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[2].especies[6]);
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[7]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[2].especies[7]);
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[8]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[2].especies[8]);
    expect(metaDocumento[0]?.tipos[0].familias[2].especies[9]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[2].especies[9]);

    expect(metaDocumento[0]?.tipos[0].familias[3].nome).to.eql('APOCYNACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[2]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[3]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[3]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[4]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[4]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[5]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[5]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[6]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[6]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[7]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[7]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[8]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[8]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[9]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[9]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[10]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[10]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[11]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[11]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[12]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[12]);
    expect(metaDocumento[0]?.tipos[0].familias[3].especies[13]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[3].especies[13]);

    expect(metaDocumento[0]?.tipos[0].familias[4].nome).to.eql('AQUIFOLIACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[4].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[4].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[4].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[4].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[4].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[4].especies[2]);
    expect(metaDocumento[0]?.tipos[0].familias[4].especies[3]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[4].especies[3]);
    expect(metaDocumento[0]?.tipos[0].familias[4].especies[4]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[4].especies[4]);

    expect(metaDocumento[0]?.tipos[0].familias[5].nome).to.eql('ARALIACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[5].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[5].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[5].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[5].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[5].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[5].especies[2]);
    expect(metaDocumento[0]?.tipos[0].familias[5].especies[3]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[5].especies[3]);
    expect(metaDocumento[0]?.tipos[0].familias[5].especies[4]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[5].especies[4]);
    expect(metaDocumento[0]?.tipos[0].familias[5].especies[5]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[5].especies[5]);
    expect(metaDocumento[0]?.tipos[0].familias[5].especies[6]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[5].especies[6]);

    expect(metaDocumento[0]?.tipos[0].familias[6].nome).to.eql('ARECACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[6].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[6].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[6].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[6].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[6].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[6].especies[2]);
    expect(metaDocumento[0]?.tipos[0].familias[6].especies[3]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[6].especies[3]);
    expect(metaDocumento[0]?.tipos[0].familias[6].especies[4]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[6].especies[4]);
    expect(metaDocumento[0]?.tipos[0].familias[6].especies[5]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[6].especies[5]);
    expect(metaDocumento[0]?.tipos[0].familias[6].especies[6]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[6].especies[6]);

    expect(metaDocumento[0]?.tipos[0].familias[7].nome).to.eql('ASTERACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[7].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[7].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[7].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[7].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[7].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[7].especies[2]);

    expect(metaDocumento[0]?.tipos[0].familias[8].nome).to.eql('BIGNONIACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[8].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[8].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[8].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[8].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[8].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[8].especies[2]);
    expect(metaDocumento[0]?.tipos[0].familias[8].especies[3]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[8].especies[3]);
    expect(metaDocumento[0]?.tipos[0].familias[8].especies[4]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[8].especies[4]);
    expect(metaDocumento[0]?.tipos[0].familias[8].especies[5]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[8].especies[5]);
    expect(metaDocumento[0]?.tipos[0].familias[8].especies[6]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[8].especies[6]);
    expect(metaDocumento[0]?.tipos[0].familias[8].especies[7]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[8].especies[7]);
    expect(metaDocumento[0]?.tipos[0].familias[8].especies[8]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[8].especies[8]);
    expect(metaDocumento[0]?.tipos[0].familias[8].especies[9]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[8].especies[9]);
    expect(metaDocumento[0]?.tipos[0].familias[8].especies[10]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[8].especies[10]);

    expect(metaDocumento[0]?.tipos[0].familias[9].nome).to.eql('BORAGINACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[9].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[9].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[9].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[9].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[9].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[9].especies[2]);
    expect(metaDocumento[0]?.tipos[0].familias[9].especies[3]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[9].especies[3]);

    expect(metaDocumento[0]?.tipos[0].familias[10].nome).to.eql('BURSERACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[10].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[10].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[10].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[10].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[10].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[10].especies[2]);
    expect(metaDocumento[0]?.tipos[0].familias[10].especies[3]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[10].especies[3]);

    expect(metaDocumento[0]?.tipos[0].familias[11].nome).to.eql('CACTACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[11].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[10].especies[0]);


    expect(metaDocumento[0]?.tipos[0].familias[12].nome).to.eql('CALOPHYLLACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[12].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[10].especies[0]);


    expect(metaDocumento[0]?.tipos[0].familias[13].nome).to.eql('CANELLACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[13].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[10].especies[0]);


    expect(metaDocumento[0]?.tipos[0].familias[14].nome).to.eql('CANNABACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[14].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[14].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[14].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[14].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[14].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[14].especies[2]);

    expect(metaDocumento[0]?.tipos[0].familias[15].nome).to.eql('CARDIOPTERIDACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[15].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[15].especies[0]);


    expect(metaDocumento[0]?.tipos[0].familias[16].nome).to.eql('CELASTRACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[16].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[16].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[16].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[16].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[16].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[16].especies[2]);
    expect(metaDocumento[0]?.tipos[0].familias[16].especies[3]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[16].especies[3]);


    expect(metaDocumento[0]?.tipos[0].familias[17].nome).to.eql('CHLORANTHACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[17].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[17].especies[0]);


    expect(metaDocumento[0]?.tipos[0].familias[18].nome).to.eql('CHRYSOBALANACEAE');
    expect(metaDocumento[0]?.tipos[0].familias[18].especies[0]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[18].especies[0]);
    expect(metaDocumento[0]?.tipos[0].familias[18].especies[1]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[18].especies[1]);
    expect(metaDocumento[0]?.tipos[0].familias[18].especies[2]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[18].especies[2]);
    expect(metaDocumento[0]?.tipos[0].familias[18].especies[3]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[18].especies[3]);
    expect(metaDocumento[0]?.tipos[0].familias[18].especies[4]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[18].especies[4]);
    expect(metaDocumento[0]?.tipos[0].familias[18].especies[5]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[18].especies[5]);
    expect(metaDocumento[0]?.tipos[0].familias[18].especies[6]).to.eql(conteudoConfirmadoNoPDF[0].tipos[0].familias[18].especies[6]);

    expect(metaDocumento[0]?.tipos[0].familias[28].nome).to.eql("LACISTEMATACEAE");
  });

});
