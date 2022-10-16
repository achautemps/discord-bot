import "dotenv/config";
import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { createRequire } from "module";
import getCommands from './helper/getCommands.js';
const require = createRequire(import.meta.url);
const { TOKEN, GUILD_ID, CLIENT_ID } = require("./config.json");

const commands = await getCommands()

const rest = new REST({ version: "10" }).setToken(TOKEN);
// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
client.once("ready", () => {
  console.log("Bot ready !");
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  const command = commands.find(({name}) => name === commandName)
  if(command) {
    command.execute(interaction)
  } else {
    interaction.reply("Commande invalide")
  }
});

async function main() {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands.map(({command}) => command) ,
    });
    client.login(TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();
