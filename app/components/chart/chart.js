let colorSet = ["rgba(255,0,0,1)", "rgba(20,97,216,1)", "rgba(216,184,20,1)", "rgba(20,216,118,1)", "rgba(151,187,205,1)"]

function initChart() {
    let ctx = document.getElementById("stockChart");
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: mapChartData(data.stockList)
        },
        options: {
            animation : false,
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        fixedStepSize: 0.25*60*1000,
                        display: true,
                        callback: function(value, index, values) {
                            return getDisplayTime(value);
                        }
                    }
                }]
            }
        }
    });
}

function mapChartData(stockList) {
    let datasets = [];

    _.each(stockList, (stock, idx) => {
        datasets.push({
            label: stock.name,
            borderColor: colorSet[idx],
            pointBackgroundColor: colorSet[idx],
            fill: false,
            data: [{
                x: stock.lastUpdated,
                y: stock.price
            }]
        });
    });

    return datasets;
}

let i=1;
function updateChart(newData) {
    if (newData.length <= 0) return;

    _.each(newData, (data) => {
        let idx = stockIdxMap[data.id];
        myChart.data.datasets[idx].data.push({
            x: data.lastUpdated,
            y: data.price
        });
    });

    myChart.update();
}

Vue.component('chart', {
    template: `
        <div class="chart">
            <canvas id="stockChart" width="1300" height="400"></canvas>
        </div>
    `,
    mounted: initChart
});
