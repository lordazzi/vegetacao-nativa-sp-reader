// scripts de ajuda para percorrer do json de espécies

function getFamiliaIndex(tipo, familiaNome) {
  var indexOf = -1;
  tipo.familias.forEach((familia, i) => {
    if (familia === familiaNome) {
      indexOf = i;
    }
  });

  return indexOf;
}