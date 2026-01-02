import { REST, Routes } from 'discord.js';
import 'dotenv/config';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'create',
    description: 'Makes a url shortener for a given url',
     options: [
      {
        name: 'url',
        description: 'The URL to shorten',
        type: 3, 
        required: true
      }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands("1456102130363535585"), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}