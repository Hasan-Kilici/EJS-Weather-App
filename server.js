const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = "APIKEY"; //https://weatherstack.com/ DAN ALINACAK

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

router.get('/',  (req, res)=> {
  res.render(`${__dirname}/src/pages/index.ejs`, {weather: null, error: null});
});

router.post('/',  (req, res)=> {
  let city = req.body.city;
  let url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
   request(url, (err, response, body)=> {
    if(err){
      return res.render(`${__dirname}/src/pages/index.ejs`, {weather: null, error: 'Hata, Lütfen tekrar Deneyin'});
    }
    let weather = JSON.parse(body);
    if(weather.current == undefined){
      return res.render('index', {weather: null, error: 'Hata, Lütfen tekrar Deneyin'});
    }
    let weatherText = `${weather.location.name}, ${weather.location.country} ${weather.current.temperature}`;
    res.render(`${__dirname}/src/pages/index.ejs`, {weather: weatherText, error: null});
  });
});

app.use('/', router);

app.listen(3000,  ()=>{
  console.log('Site 3000 Portunda Çalıştırılıyor')
});
