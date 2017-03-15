"use strict";
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const _ = require('lodash')

const server_port = 8080;
const server_ip_address = '0.0.0.0';
const stockList = getStockList();

let app = express();
let isStarted = false;

app.use('/app', express.static('app'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/index.html'));
});

app.get('/stockList', function(req, res) {
    let time = new Date().getTime();

    _.each(stockList, function(stock) {
        stock.lastUpdated = time;
    });

    res.send(stockList);
})

let server = app.listen(server_port, server_ip_address, function() {
    console.log( 'Listening on ' + server_ip_address + ', server_port ' + server_port );
});

let io = socketIO(server);

io.on('connection', function(socket) {
	console.log('New user connected');
    socket.on('start', function() {
        console.log('Received start event');
        if (!isStarted) {
            createFakeData();
            isStarted = true;
        }
    })
});

function createFakeData() {
    setInterval(() => {
        let newData = [];
        let randomIdx = Math.floor(Math.random() * 5) + 1;
        let time = new Date().getTime();

        for (let i=0; i<randomIdx; i++) {
            let stock = stockList[Math.floor(Math.random() * 5)];
            stock.price = _.round( stock.price + (Math.random() > 0.5 ? -1 : 1) * Math.random() * 5, 2);
            stock.lastUpdated = time;
            newData.push(stock);
        }

        io.emit('data', newData);
    }, 500);
}

function getStockList() {
    return [
        {
            id: "WFC",
            name: "Wells Fargo & Co",
            price: 58.58
        },
        {
            id: "KO",
            name: "The Coca-Cola Co",
            price: 42.29
        },
        {
            id: "IBM",
            name: "Intl. Business Machines...",
            price: 177.83
        },
        {
            id: "GOOGL",
            name: "Alphabet Inc",
            price: 86.41
        },
        {
            id: "WMT",
            name: "Wal-Mart Stores Inc",
            price: 70.10
        }
    ];
}
