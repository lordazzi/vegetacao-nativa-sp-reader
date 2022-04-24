import { Bioma } from '../domain/bioma.model';
import { ClasseSucessional } from '../domain/classe-sucessional.enum';
import { PlantaEspecie } from '../domain/planta-especie.model';
import { VegetacaoFamilia } from '../domain/vegetacao-familia.model';
import { DomainWrapper } from './especies-2019-metadata/domain.wrapper';
import { EspecieMetaData } from './especies-2019-metadata/especie.meta-data';
import { FamiliaMetaData } from './especies-2019-metadata/familia.meta-data';
import { RegiaoMetaData } from './especies-2019-metadata/regiao.meta-data';

/**
 * 2. Responsável por converter os resultados da coleta do documento em uma estrutura de objetos organizados
 */
export class Especies2019Conveter {

  // se houve um traço separando duas palavras, elas devem ser agrupadas e o traço deve ser removido
  private readonly REMOVER_PALAVRA_EM_QUEBRA_DE_LINHA = /\-\s+/;

  convertResultsetToDomain(resultset: RegiaoMetaData[] | null): DomainWrapper | null {
    if (!resultset) {
      return null;
    }

    let especieTmp = this.createEspecie();
    let currentBiomas = '';
    let currentNomesPopulares = '';

    const especies: PlantaEspecie[] = [];
    const familias: VegetacaoFamilia[] = [];
    const wrapper: DomainWrapper = {
      especies, familias, biomas: [], biomaIndexed: {}
    };

    const biomasMap: { [biomaNome: string]: Bioma } = {};

    resultset.forEach(regiao => {
      regiao.tipos.forEach(plantaTipo => {
        plantaTipo.familias.forEach(familia => {
          this.pushFamiliaIfNotExists(familias, familia);
          familia.especies.forEach(especieResultset => {
            //  biomas podem ser parados por espaço, se houver um - sinalizando que deva-se agrupar a palavra, ela será agrupada e o espaço removido
            currentBiomas += especieResultset.bioma ? ` ${especieResultset.bioma}` : '';
            currentNomesPopulares += especieResultset.nomePopular || '';

            especieTmp = this.resultsetToEspecie(especieTmp, especieResultset, currentNomesPopulares, currentBiomas);

            if (especieResultset.type === 'tail' || especieResultset.type === 'full') {
              especies.push(especieTmp);

              //
              if (especieTmp.bioma.length) {
                this.pushBiomaIfNotExists(biomasMap, especieTmp.bioma);

                especieTmp.bioma.map(b => {
                  wrapper.biomaIndexed[b.nome] = (wrapper.biomaIndexed[b.nome] || []);
                  wrapper.biomaIndexed[b.nome].push(especieTmp);
                });
              }
              //

              especieTmp = this.createEspecie();
              currentBiomas = '';
              currentNomesPopulares = '';
            }
          });
        });
      });
    });

    wrapper.biomas = Object.values(biomasMap);

    return wrapper;
  }

  private pushFamiliaIfNotExists(familias: VegetacaoFamilia[], familiaMetaData: FamiliaMetaData): VegetacaoFamilia[] {
    const domainFamilia = familias.find(familia => {
      if (familia.nome === familiaMetaData.nome) {
        return familia;
      }
    });

    if (!domainFamilia) {
      familias.push({ nome: familiaMetaData.nome });
    }

    return familias;
  }

  private pushBiomaIfNotExists(generalBiomas: { [biomaNome: string]: Bioma }, newBiomas: Bioma[]): void {
    newBiomas.forEach(bioma => generalBiomas[bioma.nome] = bioma);
  }

  private createEspecie(): PlantaEspecie {
    return {
      nome: '',
      nomePopular: [],
      riscoExtincao: false,
      rapidoRecobrimento: false,
      grupoFuncional: [],
      classeSucessional: [],
      bioma: []
    };
  }

  private resultsetToEspecie(
    plantaEspecie: PlantaEspecie, resultset: EspecieMetaData, currentNomesPopulares: string, currentBiomas: string
  ): PlantaEspecie {
    const nomeMetadata = this.getMetadataFromNomeCientifico(resultset);
    plantaEspecie.nome = `${plantaEspecie.nome} ${nomeMetadata.nomeCientifico}`.trim();
    plantaEspecie = { ...plantaEspecie, ...nomeMetadata.metadata };
    plantaEspecie.nomePopular = this.splitNomePopular(currentNomesPopulares);
    plantaEspecie.classeSucessional = plantaEspecie.classeSucessional.concat(
      this.convertClassesSucessionais(resultset.classeSucessional)
    );
    plantaEspecie.bioma = this.convertBiomas(currentBiomas);

    return plantaEspecie;
  }

  private convertBiomas(biomaResultset: string): Bioma[] {
    if (!biomaResultset) {
      return [];
    }

    // se houve um traço separando duas palavras, elas devem ser agrupadas e o traço deve ser removido
    biomaResultset = biomaResultset.replace(this.REMOVER_PALAVRA_EM_QUEBRA_DE_LINHA, '');

    //  remove os espaços que separam os biomas junto da '/' para não ter que aplica trim após o split
    const trimNasBarras = /\s*(\/|,)\s*/g;
    biomaResultset = biomaResultset.replace(trimNasBarras, '/');

    const biomas: Bioma[] = [];
    biomaResultset
      .split('/')
      .map(b => b.trim())
      .filter(b => b)
      .forEach(nome => biomas.push({ nome }));

    return biomas;
  }

  private convertClassesSucessionais(classeSucessional?: string): ClasseSucessional[] {
    classeSucessional = classeSucessional || '';
    const valores = classeSucessional.split('/');

    return valores
      .filter(v => v)
      .map(v => this.convertClasseSucessional(v));
  }

  private convertClasseSucessional(classeSucessional: string): ClasseSucessional {
    classeSucessional = classeSucessional.trim();
    if (classeSucessional === 'P') {
      return ClasseSucessional.PIONEIRA;
    } else if (classeSucessional === 'NP') {
      return ClasseSucessional.NAO_PIONEIRA;
    } else {
      throw new Error(`Classe sucessional invalida encontrada: "${classeSucessional}"`);
    }
  }

  private getMetadataFromNomeCientifico(resultset: EspecieMetaData): {
    nomeCientifico: string;
    metadata: {
      riscoExtincao?: boolean;
      rapidoRecobrimento?: boolean;
    }
  } {
    const metaNome = (resultset.nome || '');
    const nomeCientifico = metaNome.replace(/^[3\*]\s*/, '');
    const riscoExtincaoPattern = /^\*/;
    const rapidoRecobrimentoPattern = /^3/;
    const metadata: {
      riscoExtincao?: boolean;
      rapidoRecobrimento?: boolean;
    } = {};

    if (resultset.type !== 'tail') {
      if (riscoExtincaoPattern.test(metaNome)) {
        metadata.riscoExtincao = true;
        return { nomeCientifico, metadata };
      } else if (rapidoRecobrimentoPattern.test(metaNome)) {
        metadata.rapidoRecobrimento = true;
        return { nomeCientifico, metadata };
      }
    }

    return { nomeCientifico, metadata };
  }

  private splitNomePopular(nomePopular: string): string[] {
    if (!nomePopular) {
      return [];
    }

    nomePopular = nomePopular.replace(this.REMOVER_PALAVRA_EM_QUEBRA_DE_LINHA, '');
    return nomePopular
      .replace(/\s*/g, '')
      .split(',')
      .filter(n => n);
  }
}
