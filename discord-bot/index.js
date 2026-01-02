import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import {pool, createUrlBot} from './db.js';
import { nanoid } from 'nanoid';
import express from 'express';

const app = express();
const PORT = process.env.SERVER_PORT;

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ] 
});

client.on("messageCreate", message =>{
    if(message.author.bot) return;

    if(message.content == "hi"){
          console.log("chal raha hai");
    }
});


client.on("interactionCreate", async interaction => {

    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName == "ping"){
      await interaction.reply("Pong!!");
      return
    };
    
    if(interaction.commandName == 'create'){
        await interaction.deferReply();

      try{
       const shortId = nanoid(8);
       let url = interaction.options.getString('url');

       if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
      }

       const result = await createUrlBot(shortId,url);
    
      await interaction.editReply(`http://localhost:${PORT}/${shortId}`);
     }
     catch(err){
     console.log(err);
     await interaction.editReply("Couldn't get the URL");
     }
    
    } 

});

client.login(process.env.TOKEN);

app.get("/:shortId", async (req,res)=>{
    try{
        const shortUrl = req.params.shortId;
        const result = await pool.query('SELECT * FROM miniurl WHERE short_url = $1',[shortUrl]);
        res.redirect(result.rows[0].redirect_url)
    }
    catch(err){
     console.log(err);
     res.status(500).json({message: "Could'nt get the URL!"})
    }
});

app.listen(PORT, ()=>{console.log('server is running!!')})