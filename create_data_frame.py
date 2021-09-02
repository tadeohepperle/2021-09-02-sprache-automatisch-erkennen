import pandas as pd
import os
import re
DATADIR = "./data"


class Language:
    def __init__(self, sourcePath):
        self.sourcePath = sourcePath
        self.language = sourcePath.split(".")[2]
        self.letterMap = dict()
        self.wordLengthMap = dict()

    def __str__(self):
        return self.language

    def __repr__(self):
        return self.language

    def readSourcePathIn(self):
        f = open(self.sourcePath, encoding="utf-8")
        self.trainingText = f.read()
        f.close()
        # construct map of all letters used:
        d = dict()
        for l in self.trainingText:
            if(l in d):
                d[l] += 1
            else:
                d[l] = 0
        self.letterMap = d
        # word lengthes:
        wordLengthMap = dict.fromkeys(range(0, 40))
        for l in wordLengthMap:
            wordLengthMap[l] = 0
        rex = re.compile(r'\W+')
        trainingTextCollapsed = rex.sub(" ", self.trainingText)
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

    def printData(self):
        print("LETTERMAP:")
        print(self.letterMap)
        print("WORDLENGTHMAP:")
        print(self.wordLengthMap)


def main():
    languagesList = []
    for file in os.listdir(DATADIR):
        if file.endswith(".txt"):
            languagesList.append(Language(f"./data/{file}"))
    languagesList[0].readSourcePathIn()
    languagesList[0].printData()
    for l in languagesList:
        l.readSourcePathIn()


if __name__ == '__main__':
    main()
