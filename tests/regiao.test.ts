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