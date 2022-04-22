import * as fs from 'fs';
import { Especies2019Conveter } from './service/especies-2019.converter';
import { Especies2019Interpreter } from './service/especies-2019.interpreter';

const content = fs.readFileSync('lista-especies-rad-2019-versao-limpa.txt');
const runInterpreter = new Especies2019Interpreter();
const metaDocumento = runInterpreter.interpret(String(content).replace('\r', ''));
const domain = new Especies2019Conveter().convertResultsetToDomain(metaDocumento);

fs.writeFileSync('lista-especies-rad-2019-versao-limpa.json', JSON.stringify(metaDocumento));
fs.writeFileSync('domain-especies-rad-2019-versao-limpa.json', JSON.stringify(domain));
