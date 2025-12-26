import rxterms from "../data/RxTerms.json";

function getUniqueNames() {
  const rxList = rxterms as any[];

  const names = rxList.map((item) => item.DISPLAY_NAME);
  // const newerrx = newrx.map((item) => item);

  const result = [...new Set(names)];
  return result;
}

function getSynonyms() {
  const rxList = rxterms as any[];

  const synonyms = rxList.map((item) => item.DISPLAY_NAME_SYNONYM);
  // const newerrx = newrx.map((item) => item);

  const result = [...new Set(synonyms)];
  return result;
}

const uniqueNames = getUniqueNames();
const synonyms = getSynonyms();

export { synonyms, uniqueNames };
