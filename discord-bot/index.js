import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ] 
});

client.on("messageCreate", message =>{
    console.log(Events)
});

client.on("interactionCreate", interaction => {
   interaction.reply("Pong!!")
})

client.login(process.env.TOKEN);
