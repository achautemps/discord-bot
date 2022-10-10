import { SlashCommandBuilder } from "@discordjs/builders";

const djCommand = new SlashCommandBuilder()
  .setName("fredboat")
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
  );
export default djCommand.toJSON();
