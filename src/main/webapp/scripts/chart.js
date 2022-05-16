export function fillChart(dataset) {

var dataTotal = dataset.reduce((acc, data) => (acc += data.count), 0);
var animalCalculate = (dataset[0].count / dataTotal) * 100;
var deliveryCalculate = (dataset[1].count / dataTotal) * 100;
var incidentCalculate = (dataset[2].count / dataTotal) * 100;
var animalPercentage = `${animalCalculate.toFixed(1)}%`;
var deliveryPercentage = `${deliveryCalculate.toFixed(1)}%`;
var incidentPercentage = `${incidentCalculate.toFixed(1)}%`;

// Top Counter
var counter = document.getElementById("intervention_number");
counter.innerHTML = `${dataTotal}`;
// Percentage Animal
var counter = document.getElementById("percentage_animal");
counter.innerHTML = animalPercentage;
// Percentage Delivery
var counter = document.getElementById("percentage_delivery");
counter.innerHTML = deliveryPercentage;
// Percentage Intervention
var counter = document.getElementById("percentage_incident");
counter.innerHTML = incidentPercentage;

// Chart JS Initialize
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [dataset[0].label.toUpperCase(), dataset[1].label.toUpperCase(), dataset[2].label.toUpperCase()],
    datasets: [
      {
        data: [dataset[0].count, dataset[1].count, dataset[2].count],
        backgroundColor: [dataset[0].color, dataset[1].color, dataset[2].color],
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          let allData = data.datasets[tooltipItem.datasetIndex].data;
          let sumData = allData.reduce((memo, data) => (memo += data), 0);

          let tooltipLabel = data.labels[tooltipItem.index];
          let tooltipData = allData[tooltipItem.index];
          let tooltipPercentageCalc = (tooltipData / sumData) * 100;
          let tooltipPercentage = `${tooltipPercentageCalc.toFixed(1)}%`;

          return `${tooltipLabel} : ${tooltipData} (${tooltipPercentage})`;
        }
      }
    },
    legend: {
      display: false
    }
  }
});
}