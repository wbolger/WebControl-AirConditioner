'use strict';

// Required packages
// Using Express and Serial-Port
var express = require('express');
var SerialPort = require('serialport').SerialPort;
var sp = new SerialPort('/dev/cu.usbmodem1411', {
  baudrate: 9600,
  // Arduino defaults
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

// Call express
var app = express();

// Set up static server to provide static files e.g. css, js, etc
app.use('/static', express.static(__dirname + '/public'));

//set JADE as the view engine
//rendered files will now not need the .jade extension
app.set('view engine', 'jade');

//this is the path for Express to look for the JADE templates
//'dirname' gives the path of the current file
//do not have to worry about the path changing depending on where the Node
//process is run from
app.set('views', __dirname + '/views');

//function to send commands to the Arduino
function sendCommand(commandNum) {
  //console.log('In sendCommand. Command: ' + commandNum);
  sp.open(function(error) {
    if (error) {
      console.log('There was an error');
    } else {
      //console.log('Open');
      sp.write(commandNum);
      console.log('Sent Command ID: ' + commandNum);
    }
  });
}

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'A/C Web Control App' });
});

/* GET commands to send to Arduino. */
app.get('/:command', function(req, res, next) {
  var command = req.params.command;
  res.send('You sent ' + command);
  console.log(command);
  //serial.repeatCommand(command);
    
  if (command == 'power') {
    sendCommand('p');
  } else if (command == 'cool') {
    sendCommand('1');
  } else if (command == 'energySaver') {
    sendCommand('2');
  } else if (command == 'fan') {
    sendCommand('3');
  } else if (command == 'sleep') {
    sendCommand('4');
  } else if (command == 'autoFan') {
    sendCommand('5');
  } else if (command == 'timer') {
    sendCommand('6');
  } else if (command == 'up') {
    sendCommand('u');
  } else if (command == 'down') {
    sendCommand('d');
  } else if (command == 'left') {
    sendCommand('l');
  } else if (command == 'right') {
    sendCommand('r');
  } else {
    //res.send('Invalid choice.  Please try again.');
    console.log('Invalid choice.  Please try again.')
  }
});

//app.listen sets up the server, 3000 is the port
app.listen(3000, function(){
  console.log("The app server is running on port 3000!");
});
