import { SlashCommandBuilder } from "@discordjs/builders";
import cafe from "../core/cafe.js";
import music from "../core/music/index.js";

const name = "cafe";

const cafeCommand = new SlashCommandBuilder()
  .setName(name)
  .setDescription("Pour Clément et sa pause café")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("start")
      .setDescription("Estimation du temps de pause café de Clément")
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("stop")
      .setDescription("Retour de la pause café de Clément")
  );

export default {
  name,
  command: cafeCommand.toJSON(),
  execute: async (interaction) => {
    const { options } = interaction;
    const subcommand = options.getSubcommand();
    await interaction.deferReply();
    if (subcommand === "start") {
      const message = await cafe.start();
      await music.init(interaction);
      await music.play("https://www.youtube.com/watch?v=VBlFHuCzPgY")
      await interaction.editReply(message);
    } else if (subcommand === "stop") {
      const message = await cafe.stop();
      await music.delete();
      await interaction.editReply(message);
    }
  },
};
