//https://github.com/iamshaunjp/websockets-playlist/blob/lesson-5/index.js
var express = require('express');
var socket = require('socket.io');

//App Setup
var app = express();
var server = app.listen(4000, function() {
    console.log('Listening to requuest to 4000');
});

//staic files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
var modbus = require("./lib/modbus");

const time_read = 1000
const time_write = 20000
modbus.tcp.connect(502, "10.1.1.10", { debug: "automaton-2454" }, (err, connection) => {
	// do something with connection
	if (err) throw err;
	setInterval( function () {
		connection.readHoldingRegisters({ address: 16466-1, quantity: 2, extra: { unitId: 255 } }, (err, res) => {
			//if (err) throw err;
			if (err) {
				console.log("error")
				return;
			}
			//console.log('res.pdu.data '+ JSON.stringify(res.pdu)); // response
			console.log('res.response '+ JSON.stringify(res.response)); // response
			console.log('res.response.data '+ JSON.stringify(res.response.data)); // response
			res.response.data.forEach(obj => {
				console.log('register '+obj[obj.length -1])
				/*obj.forEach(data => {
					console.log('objeto '+data)
				})*/		
			})
		}, error => {
			console.log("error")
		})
    }, time_read)
});