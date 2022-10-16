import { SlashCommandBuilder } from "@discordjs/builders";
const name = "fredboat";

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
  );
export default {
  name,
  command: djCommand.toJSON(),
  execute: async (interaction) => {
    const { options } = interaction;
    const subcommand = options.getSubcommand();
    if (subcommand === "play") {
      await interaction.deferReply();
      //connection.destroy();
      interaction.editReply("Ce n'est pas encore fini de dev mais ça arrive !");
    }
  },
};
