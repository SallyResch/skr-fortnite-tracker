let express = require('express');
let app = express();
let path = require('path');
let request = require('request');
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/static/index.html'))
});

var uri = 'https://api.fortnitetracker.com/v1/profile/';
//https://api.fortnitetracker.com/v1/profile/{platform}/{epic-nickname}
//kbm, gamepad, touch
//API nyckel: 14df28ad-d605-40b7-87f8-5596a4cb0140
app.post('/', function (req, res) {
  console.log(req.body);
  request.get(uri + req.body.dropDownValue + '/' + req.body.epicNickName, {
    headers: {
      'TRN-Api-Key': '14df28ad-d605-40b7-87f8-5596a4cb0140'
    }
  }, function (error, response, body) {
    console.log(body);
    res.json(body);
  });
});

var port = process.env.PORT || 3002;
app.listen(port);