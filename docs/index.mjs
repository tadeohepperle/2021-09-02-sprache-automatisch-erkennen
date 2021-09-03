import {
  choose,
  shuffle,
  print,
  languageToColor,
  firstLetterUppercase,
} from "./utility.mjs";
import { FingerprintObject, generateLanguages } from "./Fingerprint.mjs";
// LOAD IN LANGUAGES:
const LANGUAGES = generateLanguages();
// ADD LISTENER TO TEXTAREA:
let textarea1 = document.getElementById("textarea1");
let languagelabel = document.getElementById("languagelabel");
textarea1.addEventListener("input", (e) => {
  textInputChanged(e.target.value);
});
let startRanking = LANGUAGES.map((language) => [language.language, 0]);
function textInputChanged(newTextInput) {
  if (newTextInput != "") {
    let inputFingerprint = new FingerprintObject("input", newTextInput);
    let ranking = inputFingerprint.compareToOthers(LANGUAGES);
    updateChart(ranking, myChart);
    updateLanguageLabel(ranking);
  } else {
    updateChart(startRanking, myChart);
    updateLanguageLabel(startRanking);
  }
}
// UPDATE LANGUGE LABEL
function updateLanguageLabel(ranking) {
  function getWinningLanguageAndColor(ranking) {
    if (ranking[0][1] == 0) {
      return { language: "?????", color: languageToColor("?????", 0.8) };
    } else
      return {
        language: ranking[0][0],
        color: languageToColor(ranking[0][0], 0.8),
      };
  }

  const { language, color } = getWinningLanguageAndColor(ranking);
  languagelabel.style = `color: ${color}`;
  languagelabel.innerHTML = firstLetterUppercase(language);
}
// DRAWING AND UPDATING THE CHART:
function updateChart(ranking, chart) {
  let { labels, scores } = rankingToLabelsAndScores(ranking);
  chart.data.labels = labels;
  chart.data.datasets.forEach((ds) => {
    ds.data = scores;
    ds.backgroundColor = labels.map((l) => languageToColor(l, 0.2));
    ds.borderColor = labels.map((l) => languageToColor(l, 1));
  });
  chart.update();
}

function rankingToLabelsAndScores(ranking) {
  let labels = [];
  let scores = [];
  for (let i = 0; i < ranking.length; i++) {
    labels.push(ranking[i][0]);
    scores.push(ranking[i][1]);
  }
  return { labels, scores };
}
let { labels: startLabels, scores: startScores } =
  rankingToLabelsAndScores(startRanking);
let ctx = document.getElementById("myChart").getContext("2d");

var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: startLabels,
    datasets: [
      {
        label: "Probablity",
        data: startScores,
        backgroundColor: startLabels.map((l) => languageToColor(l, 0.2)),
        borderColor: startLabels.map((l) => languageToColor(l, 1)),
        borderWidth: 1,
      },
    ],
  },
  options: {
    indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

window.addEventListener("beforeprint", () => {
  myChart.resize(600, 600);
});
window.addEventListener("afterprint", () => {
  myChart.resize();
});
