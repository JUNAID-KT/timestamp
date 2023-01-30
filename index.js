// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// // your first API endpoint... 
// app.get("/api/:date", function (req, res) {
//   inputdate = req.params.date;
//   console.log(inputdate);
//   if(!IsDateValid(inputdate)){
//     res.json({ error : "Invalid daaate" });
//   }
//   unixDate = new Date(inputdate).valueOf();
//   utcDate = new Date(inputdate);
//   if ((!unixDate ) || (!utcDate )){
//     res.json({ error : "Invalid Date" });
//   }
//   res.json({unix: unixDate,utc:utcDate});
// });

function IsDateValid(date){
  if (moment(date, 'X', true).isValid()){
    return true
  }
  if (moment(date, 'Thu, 01 Jan 1970 00:00:00 GMT', true).isValid()){
    return true
  }
  return false
}

app.get("/api/:date", (req, res) => {
 // let dateString = req.params.date_string;
  let time = req.params.date;
  let msdate = new Date(Number(time));
  if (!IsDateValid(time)){
    res.json({ error: "Invalid Date......." });
  }

  if (!time.includes('-') && time.length >= 6) time = +time

  if (msdate.toUTCString() === "Invalid Date") res.json({error: msdate.toUTCString()})
  else res.json({unix: msdate.valueOf(), utc: msdate.toUTCString()})
  
  let dateObject = new Date(time);
 
  if (dateObject.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  }
  
});
// listen for requests :)
var listener = app.listen("8080", function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
