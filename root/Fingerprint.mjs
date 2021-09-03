import { trainingData } from "./data/trainingData.mjs";

export function generateLanguages() {
  return trainingData.map((el) => new FingerprintObject(el[0], el[1]));
}

String.prototype.reduceWhiteSpace = function () {
  return this.replace(/\s+/g, " ");
};

const print = console.log;

export class FingerprintObject {
  fingerprint = {};
  language = "UNKNOWN";
  constructor(languageName, trainingText) {
    this.language = languageName;
    this.fingerprint = FingerprintObject.fromText(trainingText);
  }

  static fromText(trainingText) {
    // collapse whitespace:
    trainingText = trainingText.reduceWhiteSpace();
    // put to lowercase:
    trainingText = trainingText.toLowerCase();
    // construct map of all letters used:
    let letterMap = {};
    let letterCount = 0;
    for (let l of trainingText) {
      if (l == " ") continue;
      if (l in letterMap) letterMap[l] += 1;
      else letterMap[l] = 1;
      letterCount += 1;
    }
    for (let l in letterMap) {
      letterMap[l] /= letterCount;
    }
    // word lengthes:
    let wordLengthMap = {};
    let wordArray = trainingText.split(" ");
    for (let word of wordArray) {
      let key = `wordLength_${word.length}`;
      if (key in wordLengthMap) wordLengthMap[key] += 1;
      else wordLengthMap[key] = 1;
    }
    // merge letter frequencies and word lenghtes into fingerprint:
    let fingerprint = { ...wordLengthMap, ...letterMap };
    return fingerprint;
  }

  compareToOthers(otherFingerprintObjects) {
    const INFINITY = 1000;
    function getAllKeysFromFingerprints(fingerprints) {
      let d = {};
      for (let f of fingerprints) {
        d = { ...d, ...f };
      }
      return Object.keys(d);
    }
    function _relDistance(num1, num2) {
      return num2 > num1 ? num2 / num1 : num1 / num2;
    }
    function relDistance(fp1, fp2, key) {
      if (!(key in fp1) || !(key in fp2) || fp1[key] == 0 || fp2[key] == 0) {
        return INFINITY;
      }
      return _relDistance(fp1[key], fp2[key]);
    }
    // set up scoring:
    let languageScoring = {};
    for (let fp of otherFingerprintObjects) {
      languageScoring[fp.language] = 0;
    }
    // for every key calculate scores:
    let allKeys = getAllKeysFromFingerprints([
      this.fingerprint,
      ...otherFingerprintObjects.map((o) => o.fingerprint),
    ]);
    let allKeyLangScores = {};
    for (let key of allKeys) {
      let keyLangScores = {};
      for (let fp of otherFingerprintObjects) {
        let score = 1 / relDistance(this.fingerprint, fp.fingerprint, key);
        //print(key, fp.language, score);
        keyLangScores[fp.language] = score;
      }
      // norm sum of all keyLangScores to 1:
      let distSum = 0;
      for (let k in keyLangScores) {
        distSum += keyLangScores[k];
      }
      for (let k in keyLangScores) {
        keyLangScores[k] /= distSum;
      }
      allKeyLangScores[key] = keyLangScores;
    }
    //print(allKeyLangScores);
    // aggregate scores for each language
    for (let k in allKeyLangScores) {
      for (let l in languageScoring) {
        languageScoring[l] += allKeyLangScores[k][l];
      }
    }
    // normalize between 0 and 1
    let scores = Object.keys(languageScoring).map((k) => languageScoring[k]);
    let minScore = Math.min(...scores);
    let maxScore = Math.max(...scores);
    for (let k in languageScoring) {
      languageScoring[k] -= minScore;
      if (maxScore - minScore > 0) languageScoring[k] /= maxScore - minScore;
    }
    // create ranking:
    let ranking = Object.keys(languageScoring).map((k) => [
      k,
      languageScoring[k],
    ]);
    ranking.sort((a, b) => b[1] - a[1]);
    return ranking;
  }
}

export async function main() {
  const LANGUAGES = generateLanguages();
  let f1 = new FingerprintObject(
    "Test",
    "Hallo ich bin cool du nicht, weil ich das nicht gut finde."
  );
  let f2 = new FingerprintObject(
    "Test",
    "I would really like to thank you for your help! You are a truely great companion"
  );
  let ranking = f1.compareToOthers(LANGUAGES);
  print(ranking);
  print(f2.compareToOthers(LANGUAGES));
}
