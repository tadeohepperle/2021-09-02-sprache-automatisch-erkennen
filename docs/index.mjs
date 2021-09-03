import { choose, shuffle, print, languageToColor } from "./utility.mjs";
import { FingerprintObject, generateLanguages } from "./Fingerprint.mjs";
// LOAD IN LANGUAGES:
const LANGUAGES = generateLanguages();
// ADD LISTENER TO TEXTAREA:
let textarea1 = document.getElementById("textarea1");
textarea1.addEventListener("input", (e) => {
  textInputChanged(e.target.value);
});
let startRanking = LANGUAGES.map((language) => [language.language, 0]);
function textInputChanged(newTextInput) {
  let inputFingerprint = new FingerprintObject("input", newTextInput);
  let ranking = inputFingerprint.compareToOthers(LANGUAGES);
  updateChart(ranking, myChart);
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
  // //   chart.data.datasets.forEach(
  // //     (ds) => (ds.data = [getNum(), getNum(), getNum(), getNum()])
  // //   );
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

// // function updateDataRandomly(chart) {
// //   const getNum = () => Math.random() * 100;
// //   chart.data.labels = shuffle(["A", "B", "C", "D"]);
// //   chart.data.datasets.forEach(
// //     (ds) => (ds.data = [getNum(), getNum(), getNum(), getNum()])
// //   );
// //   chart.update();
// // }

// // setInterval(() => {
// //   updateDataRandomly(myChart);
// // }, 2000);
