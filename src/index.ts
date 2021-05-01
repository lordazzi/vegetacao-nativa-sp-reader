import * as fs from 'fs';
import { Rad2019Interpreter } from './service/especies-2019.interpreter';

const content = fs.readFileSync('lista-especies-rad-2019-versao-limpa.txt');
const runInterpreter = new Rad2019Interpreter(String(content));
