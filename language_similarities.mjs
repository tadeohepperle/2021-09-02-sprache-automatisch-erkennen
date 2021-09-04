import { FingerprintObject, generateLanguages } from "./docs/Fingerprint.mjs";
import { writeFileSync } from "fs";
const print = console.log;
let LANGUAGES = generateLanguages();
const compLang = (a, b) => (a.language > b.language ? -1 : 1);
LANGUAGES = LANGUAGES.sort(compLang);
LANGUAGES = LANGUAGES.sort((a, b) => (a.language == "Greek" ? 1 : -1));
console.log(LANGUAGES);

function constructCSV(languages) {
  let sep = "\t";
  let string =
    "Language" + sep + languages.map((l) => l.language).join(sep) + "\n";
  for (let i = 0; i < languages.length; i++) {
    let l = languages[i];
    let ranking = l.compareToOthers(languages);

    ranking = ranking.sort((a, b) => (a[0] > b[0] ? -1 : 1));
    ranking = ranking.sort((a, b) => (a[0] == "Greek" ? 1 : -1));
    string += `${l.language}${sep}${ranking.map((r) => r[1]).join(sep)}\n`;
    string = string.replace(/\./g, ",");
    print(l.language);
    print(ranking);
  }
  writeFileSync("./language_similarities.csv", string, "utf-8");
}

constructCSV(LANGUAGES);
