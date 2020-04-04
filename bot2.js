const Bot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const appID = process.env.WEATHER_ID;

const axios = require('axios');
const openGeocoder = require('node-open-geocoder');

function formatDateToString(today){
   var dd = (today.getDate() < 10 ? '0' : '') + today.getDate();
   var mm = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
   var yyyy = today.getFullYear();
   return (yyyy + "-" + mm + "-" + dd);
};

const bot2 = new Bot(token, {polling: true});

// ask ATMO server for todays pollution value at a specific zipcode
const sendTodaysValue = (chatId, today) => {

  //send Villeurbanne today's data
  axios.get(`https://api.atmo-aura.fr/communes/69100/indices?api_token=${appID}`).then((resp) => {
    let {indices} = resp.data;
    var i;
    for (i = 0; i < indices.data.length; i++) {
      if (formatDateToString(today) === indices.data[i].date) {
        bot2.sendMessage(chatId, `<b>Indice ${indices.data[i].qualificatif}</b> à Villeurbanne (${indices.data[i].date})`, { parse_mode: "HTML" });
        break;
      };
    };
  }, error => {
    bot2.sendMessage(chatId, `Ooops...les coordonnées sont trop précisent`, { parse_mode: "HTML" });
  });

  //send Lyon 01 today's data
  axios.get(`https://api.atmo-aura.fr/communes/69001/indices?api_token=${appID}`).then((resp) => {
    let {indices} = resp.data;
    var i;
    for (i = 0; i < indices.data.length; i++) {
      if (formatDateToString(today) === indices.data[i].date) {
        bot2.sendMessage(chatId, `<b>Indice ${indices.data[i].qualificatif}</b> à Lyon-1 (${indices.data[i].date})`, { parse_mode: "HTML" });
        break;
      };
    };
  }, error => {
    bot2.sendMessage(chatId, `Ooops...les coordonnées sont trop précisent`, { parse_mode: "HTML" });
  });
};

// ask ATMO server for tomorrow's pollution value at a specific zipcode
let sendTomorrowsValue = (chatId, today) => {

  //send Villeurbanne tomorrow's data
  axios.get(`https://api.atmo-aura.fr/communes/69100/indices?api_token=${appID}`).then((resp) => {
    let {indices} = resp.data;
    var i;
    for (i = 0; i < indices.data.length; i++) {
      if (formatDateToString(today) === indices.data[i].date) {
        bot2.sendMessage(chatId, `<b>Indice ${indices.data[i-1].qualificatif}</b> à Villeurbanne (${indices.data[i-1].date})`, { parse_mode: "HTML" });
        break;
      };
    };
  }, error => {
    bot2.sendMessage(chatId, `Ooops...les coordonnées sont trop précisent`, { parse_mode: "HTML" });
  });

  //send Lyon 01 tomorrow's data
  axios.get(`https://api.atmo-aura.fr/communes/69001/indices?api_token=${appID}`).then((resp) => {
    let {indices} = resp.data;
    var i;
    for (i = 0; i < indices.data.length; i++) {
      if (formatDateToString(today) === indices.data[i].date) {
        bot2.sendMessage(chatId, `<b>Indice ${indices.data[i-1].qualificatif}</b> à Lyon-1 (${indices.data[i-1].date})`, { parse_mode: "HTML" });
        break;
      };
    };
  }, error => {
    bot2.sendMessage(chatId, `Ooops...les coordonnées sont trop précisent`, { parse_mode: "HTML" });
  });
};

bot2.onText(/\/ajd/, (msg) => {
  const chatId = msg.chat.id;
  var today = new Date();

  sendTodaysValue(chatId, today);
});

bot2.onText(/\/demain/, (msg) => {
  const chatId = msg.chat.id;
  var today = new Date();

  sendTomorrowsValue(chatId, today);
});
