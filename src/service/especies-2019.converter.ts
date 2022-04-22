import { Bioma } from '../domain/bioma.model';
import { ClasseSucessional } from '../domain/classe-sucessional.enum';
import { PlantaEspecie } from '../domain/planta-especie.model';
import { VegetacaoFamilia } from '../domain/vegetacao-familia.model';
import { DomainWrapper } from './especies-2019-metadata/domain.wrapper';
import { EspecieMetaData } from './especies-2019-metadata/especie.meta-data';
import { FamiliaMetaData } from './especies-2019-metadata/familia.meta-data';
import { RegiaoMetaData } from './especies-2019-metadata/regiao.meta-data';

export class Especies2019Conveter {

  convertResultsetToDomain(resultset: RegiaoMetaData[] | null): DomainWrapper | null {
    if (!resultset) {
      return null;
    }

    let especieTmp = this.createEspecie();
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
            especieTmp = this.resultsetToEspecie(especieTmp, especieResultset);

            if (especieResultset.type === 'tail' || especieResultset.type === 'full') {
              especies.push(especieTmp);
              if (especieTmp.bioma.length) {
                this.pushBiomaIfNotExists(biomasMap, especieTmp.bioma);

                especieTmp.bioma.map(b => {
                  wrapper.biomaIndexed[b.nome] = (wrapper.biomaIndexed[b.nome] || []);
                  wrapper.biomaIndexed[b.nome].push(especieTmp);
                });
              }

              especieTmp = this.createEspecie();
            }
          });
        });
      });
    });

    wrapper.biomas = Object.values(biomasMap);

    return wrapper;
  }

  private pushFamiliaIfNotExists(familias: VegetacaoFamilia[], familiaMetaData: FamiliaMetaData): VegetacaoFamilia[] {
    const domainFamilia = familias.find(domainFamilia => {
      if (domainFamilia.nome === familiaMetaData.nome) {
        return domainFamilia;
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

  private resultsetToEspecie(plantaEspecie: PlantaEspecie, resultset: EspecieMetaData): PlantaEspecie {
    const nomeMetadata = this.getMetadataFromNomeCientifico(resultset);
    plantaEspecie.nome += nomeMetadata.nomeCientifico;
    plantaEspecie = { ...plantaEspecie, ...nomeMetadata.metadata };
    plantaEspecie.nomePopular = plantaEspecie.nomePopular.concat(this.splitNomePopular(resultset.nomePopular));
    plantaEspecie.classeSucessional = plantaEspecie.classeSucessional.concat(
      this.convertClassesSucessionais(resultset.classeSucessional)
    );
    plantaEspecie.bioma = this.convertBiomas(plantaEspecie.bioma, resultset.bioma);

    return plantaEspecie;
  }

  private convertBiomas(biomas: Bioma[], biomaResultset: string | undefined): Bioma[] {
    if (biomaResultset) {
      let rebuilBioma = biomas.map(b => b.nome).join('/');
      //  removendo possível traço no final dos biomas, é o traço agrupador de palavras separadas no final da linha
      rebuilBioma = rebuilBioma.replace(/\-$/, '') + biomaResultset;
      //  remove os espaços que separam os biomas junto da '/' para não ter que aplica trim após o split
      rebuilBioma = rebuilBioma.replace(/\s*(\/|,)\s*/g, '/');

      biomas.splice(0, biomas.length)
      rebuilBioma
        .split('/')
        .filter(b => b)
        .forEach(nome => {
          biomas.push({ nome });
        });
    }

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
        return { nomeCientifico: nomeCientifico, metadata };
      }
    }

    return { nomeCientifico, metadata };
  }

  private splitNomePopular(nomePopular?: string): string[] {
    return nomePopular ? nomePopular.replace(/\s*/g, '').split(',') : [];
  }

}