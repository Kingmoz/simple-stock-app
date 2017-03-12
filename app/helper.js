// Helper function
function getDisplayTime(timestamp) {
    let date = new Date(timestamp);
    let time = ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":"
             + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":"
             + ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();

    return time;
}

// Mock backend api call
function getStockList() {
    return [
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
}

function updateAppState() {
    setInterval(() => {
        let newData = [];
        let randomIdx = Math.floor(Math.random() * 5) + 1;
        let time = new Date().getTime();

        //console.log("------------------");
        for (let i=0; i<randomIdx; i++) {
            let stock = stockList[Math.floor(Math.random() * 5)];
            stock.price = _.round( stock.price + (Math.random() > 0.5 ? -1 : 1) * Math.random() * 5, 2);
            stock.lastUpdated = time;
            newData.push(stock);
            //console.log(stock.name);
        }

        updateData(newData);
        updateChart(newData);
    }, 500);
}
