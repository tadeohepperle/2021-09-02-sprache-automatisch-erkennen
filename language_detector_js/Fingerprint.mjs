import { trainingData } from "./data/trainingData.mjs";

export function generateLanguages() {
  return trainingData.map((el) => new FingerprintObject(el[0], el[1]));
}

String.prototype.reduceWhiteSpace = function () {
  return this.replace(/\s+/g, " ");
};

const print = console.log;

class FingerprintObject {
  fingerprint = {};
  lanugage = "UNKNOWN";
  constructor(lanugageName, trainingText) {
    this.lanugage = lanugageName;
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
      if (!(key in fp1) || !(key in fp2) || fp1[key] || fp2[key]) {
        return INFINITY;
      } else return _relDistance(fp1[key], fp2[key]);
    }
    // set up scoring:
    let languageScoring = {};
    for (let fp of otherFingerprintObjects) {
      languageScoring[fp.language] = 0;
    }
    // for every key calculate scores:
    let allKeys = getAllKeysFromFingerprints([
      this,
      ...otherFingerprintObjects.map((o) => o.fingerprint),
    ]);
    let allKeyLangScores = {};
    for (let key in allKeys) {
      let keyLangScores = {};
      for (let fp of otherFingerprintObjects) {
        let score = 1 / relDistance(this.fingerprint, fp.fingerprint, key);
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
    ranking.sort((a, b) => a[1] - b[1]);
    return ranking;
  }
}

export async function main() {
  const LANGUAGES = generateLanguages();

  let f = new FingerprintObject("Test", "Hallo ich bin cool");
  let ranking = f.compareToOthers(LANGUAGES);
  print(ranking);
}
