import "dotenv/config";
import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
//commands
import JourFerieCommand from "./commands/jourferie.js";
import CafeCommand from "./commands/cafe.js";
import RaceWeekCommand from "./commands/raceweek.js";
import VacancesCommand from "./commands/vacances.js";
import djCommand from "./commands/dj.js";
//core
import jourferie from "./core/jourferie.js";
import cafe from "./core/cafe.js";
import formula1 from "./core/formula1.js";
import vacances from "./core/vacances.js";
import music from "./core/music/index.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { TOKEN, GUILD_ID, CLIENT_ID } = require("./config.json");

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
  const { commandName, options } = interaction;
  if (commandName === "jourferie") {
    await interaction.deferReply();
    const subcommand = options.getSubcommand();
    let message = "Désolé, je ne trouve pas l'information";
    if (subcommand === "next") {
      try {
        message = await jourferie.getNext();
      } catch (error) {
        console.log(error);
      }
    } else if (subcommand === "all") {
      try {
        const data = await jourferie.getAll();
        message = `Salut <@${
          interaction.user.id
        }>, je vois que tu as besoin de repos ^^ 😉 \n ${data.join("\n")}`;
      } catch (error) {
        console.log(error);
      }
    } else if (subcommand === "year") {
      const year = options.getNumber("année");
      try {
        const data = await jourferie.getAll(year);
        message = `Salut <@${
          interaction.user.id
        }>, je vois que tu anticipes déjà petit malin ^^ 😉  \n ${data.join(
          "\n"
        )}`;
      } catch (error) {
        console.log(error);
      }
    }
    await interaction.editReply(message);
  } else if (commandName === "cafe") {
    const subcommand = options.getSubcommand();
    if (subcommand === "start") {
      await interaction.deferReply();
      const message = await cafe.start();
      await music.init(interaction)
      await interaction.editReply(message);
    } else if (subcommand === "stop") {
      await interaction.deferReply();
      const message = await cafe.stop();
      await music.delete()
      await interaction.editReply(message);
    }
  } else if (commandName === "raceweek") {
    await interaction.deferReply();
    try {
      const data = await formula1.isRaceWeek();
      await interaction.editReply(data);
    } catch (error) {
      await interaction.editReply("Erreur API formula 1");
    }
  } else if (commandName === "vacances") {
    const name = options.getString("prénom");
    await interaction.deferReply();
    const data = await vacances.getDateByName(name.toLowerCase());
    await interaction.editReply(data);
  } else if (commandName === "fredboat") {
    const subcommand = options.getSubcommand();
    if (subcommand === "play") {
      await interaction.deferReply()
      //connection.destroy();
      interaction.editReply("Ce n'est pas encore fini de dev mais ça arrive !")
    }
  }
});

async function main() {
  const commands = [
    JourFerieCommand,
    CafeCommand,
    RaceWeekCommand,
    VacancesCommand,
    djCommand,
  ];
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    client.login(TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();
