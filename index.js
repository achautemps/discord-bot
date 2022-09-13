import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import jourferie from "./jourferie.js";
import formula1 from "./formula1.js";
import { isAnagram } from "./helper/string.js";
// eslint-disable-next-line no-undef
const token = process.env.BOT_TOKEN;
const cmdRaceWeek = "!raceweek";

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
  ],
});
client.once("ready", () => {
  console.log("Bot ready !");
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (msg.content.includes("!jourferie")) {
    const [, param, value] = msg.content.split(" ");
    if (param) {
      switch (param) {
        case "-year":
          return jourferie
            .getAll(value)
            .then((data) => {
              msg.channel.send(
                `Salut <@${
                  msg.author.id
                }>, je vois que tu anticipes déjà petit malin ^^ 😉  \n ${data.join(
                  "\n"
                )}`
              );
            })
            .catch(() => {
              msg.channel.send("Désolé, je ne trouve pas l'information");
            });
        case "-all":
          return jourferie
            .getAll()
            .then((data) => {
              msg.channel.send(
                `Salut <@${
                  msg.author.id
                }>, je vois que tu as besoin de repos ^^ 😉 \n ${data.join(
                  "\n"
                )}`
              );
            })
            .catch(() => {
              msg.channel.send("Désolé, je ne trouve pas l'information");
            });
        default:
          break;
      }
    }
    return jourferie
      .getNext()
      .then((data) => {
        msg.channel.send(data);
      })
      .catch(() => {
        msg.channel.send("Désolé, je ne trouve pas l'information");
      });
  }
  if (isAnagram(msg.content, cmdRaceWeek)) {
    return formula1.isRaceWeek().then((data) => {
      msg.channel.send(data);
    });
  }
  if (msg.content.includes("!vacances")) {
    const [, param] = msg.content.split(" ");
    if(param === '-clement'){
      msg.channel.send(
        `Salut <@${
          msg.author.id
        }>,\nLes prochaines vacances de Clément sont prévues pour la semaine prochaine`
      );
    } else {
      msg.channel.send(
        `Salut <@${
          msg.author.id
        }>,\nDes va...quoi ?`
      );
    }

  }
});

client.login(token).catch((err) => console.log(err));
