import { expect } from 'chai';
import * as fs from 'fs';
import { Especies2019Interpreter } from '../src/service/especies-2019.interpreter';

const content = fs.readFileSync('lista-especies-rad-2019-versao-limpa.txt');
const runInterpreter = new Especies2019Interpreter();
const metaDocumento = runInterpreter.interpret(String(content).replace('\r', ''));

if (!metaDocumento) {
  throw new Error('impossible run tests, system generated a null resultset');
}

describe('familia', () => {
  it('próxima familia após a palavra ZOOM aparecer sozinho em uma linha', () => {
    expect(metaDocumento[1]?.tipos[0].familias[25].nome).equal('HUMIRIACEAE');
  });
});