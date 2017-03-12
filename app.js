let stockIdxMap = [];
function initStockIdxMap(stockList) {
    _.each(stockList, (stock, idx) => {
        stockIdxMap[stock.id] = idx;
    });
}

function updateData(newData) {
    let stockList = data.stockList;
    //Remove all highlighted stock
    _.each(stockList, (stock, idx) => Vue.set(stock, 'isActive', false));

    _.each(newData, (stock) => {
        let stockIdx = stockIdxMap[stock.id];
        stock.isActive = true;
        // stockList[stockIdx] = stock;
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
        price: 861.41,
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
                        <td>{{stock.lastUpdated}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    data: data
});
