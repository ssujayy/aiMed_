import rxterms from "../data/RxTerms.json";

export function strengthMatch(med: string) {
  // const rxList = rxterms as any[];
  // const chosenMed = med;

  const matches = rxterms.filter(
    (item) => item.DISPLAY_NAME.toLowerCase() === med.toLowerCase()
  );
  const strengths = matches.map((item) => item.STRENGTH);

  return strengths;
}
