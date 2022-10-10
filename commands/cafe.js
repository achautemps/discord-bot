import { SlashCommandBuilder } from "@discordjs/builders";

const cafeCommand = new SlashCommandBuilder()
  .setName("cafe")
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

export default cafeCommand.toJSON();
