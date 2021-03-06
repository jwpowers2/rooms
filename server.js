// server file for socket_io_dashboard_1

var express = require('express'),
  app = express(),
  http = require('http'),
  socketIO = require('socket.io'),
  server, io;

app.get('/', function (req,res){
	res.sendFile(__dirname + '/index.html');
});

server = http.Server(app);
server.listen(5000);

io = socketIO(server);


io.on('connection', function(socket){

    socket.join('room1');
    socket.join('room2');
    socket.join('room3');

    socket.on('list.rooms', function(){
    	socket.emit('list.rooms.response', socket.rooms);
    });

    socket.on('leave.room', function(room){
    	socket.leave(room);
    });

	setInterval(function(){
		
		socket.emit('seconds.update', {
			time: new Date()
		});
	},2000);
});