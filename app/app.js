let stockIdxMap = [];
let myChart;
let appData = {
    stockList: []
};
let socket = io();

// App function
function initApp() {
    Vue.http.get('/stockList', []).then(function(data) {
        let res = data.body;
        appData.stockList = res;

        initChart();
        initStockIdxMap(appData.stockList);

        // Connect backend with socket.io
        socket.emit('start');
        socket.on('data', function(data) {
            updateAppState(data);
        });
    });
}

function initStockIdxMap(stockList) {
    let time = new Date().getTime();

    _.each(stockList, (stock, idx) => {
        stockIdxMap[stock.id] = idx;
        stock.lastUpdated = time;
    });
}

function updateData(newData) {
    let stockList = appData.stockList;
    //Remove all highlighted stock
    _.each(stockList, (stock, idx) => {
        Vue.set(stock, 'isActive', false)
    });

    _.each(newData, (stock) => {
        let stockIdx = stockIdxMap[stock.id];
        stock.isActive = true;
        Vue.set(stockList, stockIdx, stock);
    });
}

let app = new Vue({
    el: "#app",
    template: `
        <div class="app">
            <h2 class="page-header">Simple Stock App Demo</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Price</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="stock in stockList" :class="{ warning: stock.isActive}">
                        <td>{{stock.name}}</td>
                        <td>{{stock.price}}</td>
                        <td>{{stock.lastUpdated | displayTime}}</td>
                    </tr>
                </tbody>
            </table>
            <chart></chart>
        </div>
    `,
    data: appData,
    filters: {
        displayTime: getDisplayTime
    },
    mounted: initApp
});
