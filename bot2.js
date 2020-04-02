const Bot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const appID = process.env.WEATHER_ID;

const axios = require('axios');
const openGeocoder = require('node-open-geocoder');

const bot2 = new Bot(token, {polling: true});

// ask ATMO server for todays pollution value at a specific zipcode
const sendTodaysValue = (chatId) => {

  //send Villeurbanne today's data
  axios.get(`https://api.atmo-aura.fr/communes/69100/indices?api_token=${appID}`).then((resp) => {
    const {indices} = resp.data;
    let indiceO3 = indices.data[1].qualificatif;
    bot2.sendMessage(chatId, `<b>Indice ${indiceO3}</b> à Villeurbanne (${indices.data[1].date})`, { parse_mode: "HTML" });
  }, error => {
    bot2.sendMessage(chatId, `Ooops...les coordonnées sont trop précisent`, { parse_mode: "HTML" });
  });

  //send Lyon 01 today's data
  axios.get(`https://api.atmo-aura.fr/communes/69001/indices?api_token=${appID}`).then((resp) => {
    const {indices} = resp.data;
    let indiceO3 = indices.data[1].qualificatif;
    bot2.sendMessage(chatId, `<b>Indice ${indiceO3}</b> à Lyon-1 (${indices.data[1].date})`, { parse_mode: "HTML" });
  }, error => {
    bot2.sendMessage(chatId, `Ooops...les coordonnées sont trop précisent`, { parse_mode: "HTML" });
  });
};

// ask ATMO server for tomorrow's pollution value at a specific zipcode
const sendTomorrowsValue = (chatId) => {

  //send Villeurbanne tomorrow's data
  axios.get(`https://api.atmo-aura.fr/communes/69100/indices?api_token=${appID}`).then((resp) => {
    const {indices} = resp.data;
    let indiceO3 = indices.data[0].qualificatif;
    bot2.sendMessage(chatId, `<b>Indice ${indiceO3}</b> à Villeurbanne (${indices.data[0].date})`, { parse_mode: "HTML" });
  }, error => {
    bot2.sendMessage(chatId, `Ooops...les coordonnées sont trop précisent`, { parse_mode: "HTML" });
  });

  //send Lyon 01 tomorrow's data
  axios.get(`https://api.atmo-aura.fr/communes/69001/indices?api_token=${appID}`).then((resp) => {
    const {indices} = resp.data;
    let indiceO3 = indices.data[0].qualificatif;
    bot2.sendMessage(chatId, `<b>Indice ${indiceO3}</b> à Lyon-1 (${indices.data[0].date})`, { parse_mode: "HTML" });
  }, error => {
    bot2.sendMessage(chatId, `Ooops...les coordonnées sont trop précisent`, { parse_mode: "HTML" });
  });
};

bot2.onText(/\/ajd/, (msg) => {
  const chatId = msg.chat.id;
  sendTodaysValue(chatId);
});

bot2.onText(/\/demain/, (msg) => {
  const chatId = msg.chat.id;
  sendTomorrowsValue(chatId);
});
