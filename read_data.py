import pandas as pd
import os
import re
import json
DATADIR = "./data"


def prettyprint(obj):
    print(json.dumps(obj, indent=4, sort_keys=True))


class Language:

    def __init__(self, sourcePath, languageName="unknown"):
        self.sourcePath = sourcePath
        self.language = languageName
        self.letterMap = dict()
        self.wordLengthMap = dict()
        self.fingerprint = dict()

    @staticmethod
    def fromText(text):
        lang = Language("unknown path")
        lang.language = "unknown"
        lang.trainingText = text
        lang.processTrainingText()
        return lang

    def __str__(self):
        return self.language

    def __repr__(self):
        return self.language

    def readSourcePathIn(self):
        f = open(self.sourcePath, encoding="utf-8")
        self.trainingText = f.read()
        f.close()
        self.processTrainingText()

    def processTrainingText(self):
        rex = re.compile(r'\W+')
        trainingTextCollapsed = rex.sub(" ", self.trainingText)
        # construct map of all letters used:
        d = dict()

        lettercount = 0
        for l in trainingTextCollapsed:
            if(l == " "):
                continue
            if(l in d):
                d[l] += 1
            else:
                d[l] = 1
            lettercount += 1
        for l in d:
            d[l] /= lettercount
        self.letterMap = d
        # word lengthes:
        wordLengthMap = dict.fromkeys(range(0, 10))
        for l in wordLengthMap:
            wordLengthMap[l] = 0

        wordArray = trainingTextCollapsed.split(" ")
        for word in wordArray:
            if(len(word) in wordLengthMap):
                wordLengthMap[len(word)] += 1
            else:
                wordLengthMap[len(word)] = 1
        wordLengthMap[0] = 0
        for l in wordLengthMap:
            wordLengthMap[l] /= len(wordArray)
        self.wordLengthMap = wordLengthMap
        # merge into fingerprint:
        self.fingerprint = dict()
        for key in self.wordLengthMap:
            self.fingerprint[f"wordLength_{str(key)}"] = self.wordLengthMap[key]
        for key in self.letterMap:
            self.fingerprint[key] = self.letterMap[key]

    def printData(self):
        print("LETTERMAP:")
        print(self.letterMap)
        print("WORDLENGTHMAP:")
        print(self.wordLengthMap)

    def compareToOtherLanguages(self, otherLanguages):
        def getImportanceOfKey(key):
            if key.contains("wordLength"):
                return 5
            return 1

        def getAllKeysFromFingerprints(fingerprints):
            keyDict = dict()
            for f in fingerprints:
                for key in f:
                    keyDict[key] = True
            return keyDict.keys()

        def _relDistance(num1, num2):
            return num2/num1 if num2 > num1 else num1/num2

        def relDistance(fp1, fp2, key):
            if((not key in fp1) or (not key in fp2) or fp1[key] == 0 or fp2[key] == 0):
                return inifinity()
            else:
                return _relDistance(fp1[key], fp2[key])

        def inifinity():
            return 10

        # set up scoring:
        languageScoring = dict()
        for lang in otherLanguages:
            languageScoring[lang.language] = 0
        # for every key calculate scores:
        allKeys = getAllKeysFromFingerprints(
            [self.fingerprint, *(list(map(lambda l: l.fingerprint, otherLanguages)))])
        allKeyLangScores = dict.fromkeys(allKeys)
        for key in allKeys:
            keyLangScores = dict()
            for l in otherLanguages:
                dis = relDistance(self.fingerprint, l.fingerprint, key)
                keyLangScores[l.language] = 1/dis
            # norm sum of all keyLangScores to 1:
            distSum = 0
            for d in keyLangScores:
                distSum += keyLangScores[d]

            for d in keyLangScores:
                keyLangScores[d] /= distSum
            allKeyLangScores[key] = keyLangScores
        # aggregate scores for each language
        for key in allKeyLangScores:
            for lang in languageScoring:
                languageScoring[lang] += allKeyLangScores[key][lang]
        prettyprint(allKeyLangScores)


def main():

    # read all languages in:
    languagesList = []
    for file in os.listdir(DATADIR):
        if file.endswith(".txt"):
            sourcePath = f"./data/{file}"
            languagesList.append(
                Language(sourcePath, languageName=sourcePath.split(".")[2]))
    for l in languagesList:
        l.readSourcePathIn()
    # define own language
    l = Language.fromText("Vamos a la playa los amigos despacito")
    l.compareToOtherLanguages(languagesList)


if __name__ == '__main__':
    main()
