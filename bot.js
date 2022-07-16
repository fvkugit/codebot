require('dotenv').config();
const tmi = require('tmi.js');
const { ocultarCodigo } = require('./traductor')

const client = new tmi.Client({
    connection: {
      reconnect: true
    },
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [
      'fhakk'
    ]
});
  
client.connect();

var code = ''
var claimed = true

setInterval(()=>{

    code = Math.random().toString(36).slice(2, 20);
    var oculto = ocultarCodigo(code)
    client.say('#fhakk', `Codigo: ${oculto}`)
    claimed = false

}, 20000)

client.on('message', async (channel, context, message) => {
    if (message === code){
        if (claimed) return;
        client.say('#fhakk', `El ganador es: ${context.username}`);
        claimed = true
    }
});