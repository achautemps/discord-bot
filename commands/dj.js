import { SlashCommandBuilder } from "@discordjs/builders";
import music from "../core/music/index.js";
import { validateUrl } from "../helper/youtube.js";

const name = "dj";

const djCommand = new SlashCommandBuilder()
  .setName(name)
  .setDescription("Le Fredboat fait maison")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("play")
      .setDescription("Jouer un son youtube via une URL")
      .addStringOption((option) =>
        option
          .setName("url")
          .setDescription("URL de la video")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("stop").setDescription("Stop le son en cours")
  );
export default {
  name,
  command: djCommand.toJSON(),
  execute: async (interaction) => {
    const { options } = interaction;
    const subcommand = options.getSubcommand();

    if (subcommand === "play") {
      //
      const url = options.getString("url");
      if (validateUrl(url)) {
        interaction.reply(`Ajout de ${url} dans la liste !`);
        await music.init(interaction);
        await music.play(url);
      } else {
        interaction.reply("Lien Youtube invalide");
      }
    } else if (subcommand === "stop") {
      await music.delete();
      interaction.reply({ content: "Son coupé", ephemeral: true });
    }
  },
};
