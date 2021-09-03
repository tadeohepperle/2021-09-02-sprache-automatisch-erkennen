console.log("hi");
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["A", "B", "C", "D"],
    datasets: [{ label: "perc", data: [1, 23, 40, 21] }],
  },
  // {
  //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // },
  options: {
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

function updateDataRandomly(chart) {
  const getNum = () => Math.random() * 100;
  chart.data.datasets.forEach(
    (ds) => (ds.data = [getNum(), getNum(), getNum(), getNum()])
  );
  chart.update();
}

// setInterval(() => {
//   updateDataRandomly(myChart);
// }, 1000);
