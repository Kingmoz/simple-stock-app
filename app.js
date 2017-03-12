let stockIdxMap = [];
let myChart;

// Helper function

function getDisplayTime(timestamp) {
    let date = new Date(timestamp);
    let time = ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":"
             + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":"
             + ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();

    return time;
}

function initStockIdxMap(stockList) {
    let time = new Date().getTime();

    _.each(stockList, (stock, idx) => {
        stockIdxMap[stock.id] = idx;
        stock.lastUpdated = time;
    });
}

function updateData(newData) {
    let stockList = data.stockList;
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

let stockList = [
    {
        id: "WFC",
        name: "Wells Fargo & Co",
        price: 58.58,
        lastUpdated: "04:00:00"
    },
    {
        id: "KO",
        name: "The Coca-Cola Co",
        price: 42.29,
        lastUpdated: "04:00:00"
    },
    {
        id: "IBM",
        name: "Intl. Business Machines...",
        price: 177.83,
        lastUpdated: "04:00:00"
    },
    {
        id: "GOOGL",
        name: "Alphabet Inc",
        price: 86.41,
        lastUpdated: "04:00:00"
    },
    {
        id: "WMT",
        name: "Wal-Mart Stores Inc",
        price: 70.10,
        lastUpdated: "04:00:00"
    }
];
initStockIdxMap(stockList);
let data = {
    stockList: stockList
};

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
    data: data,
    filters: {
        displayTime: getDisplayTime
    }
});


function updateAppState() {
    setInterval(() => {
        let newData = [];
        let randomIdx = Math.floor(Math.random() * 5) + 1;
        let time = new Date().getTime();

        console.log("------------------");
        for (let i=0; i<randomIdx; i++) {
            let stock = stockList[Math.floor(Math.random() * 5)];
            stock.price = _.round( stock.price + (Math.random() > 0.5 ? -1 : 1) * Math.random() * 5, 2);
            stock.lastUpdated = time;
            newData.push(stock);
            console.log(stock.name);
        }

        updateData(newData);
        updateChart(newData);
    }, 5000);
}

//updateAppState();
