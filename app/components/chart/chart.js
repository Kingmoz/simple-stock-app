let colorSet = ["rgba(255,0,0,1)", "rgba(20,97,216,1)", "rgba(216,184,20,1)", "rgba(20,216,118,1)", "rgba(151,187,205,1)"]

function initChart() {
    let canvas = document.getElementById("stockChart");
    let ctx = canvas.getContext('2d');
    myChart = new Chart(ctx).Line({
        labels: [1],
        datasets: mapChartData(data.stockList)
    });
}

function mapChartData(stockList) {
    let datasets = [];

    _.each(stockList, (stock, idx) => {
        datasets.push({
            label: stock.name,
            fillColor: "rgba(220,220,220,0)",
            strokeColor: colorSet[idx],
            pointColor: colorSet[idx],
            data: [stock.price]
        });
    });

    return datasets;
}

let i=1;
function updateChart(newData) {
    if (newData.length <= 0) return;

    let dataSets = [];
    _.each(newData, (data) => {
        let idx = stockIdxMap[data.id];
        dataSets[idx] = data.price;
    });

    // Add null value to array to avoid chart.js error
    _.each(dataSets, (data,idx) => dataSets[idx] = data || null);

    myChart.addData(dataSets, ++i);
}

Vue.component('chart', {
    template: `
        <div class="chart">
            <canvas id="stockChart" width="1300" height="400"></canvas>
        </div>
    `,
    mounted: initChart
});
