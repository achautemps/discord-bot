import { SlashCommandBuilder } from "@discordjs/builders";

const jourferieCommand = new SlashCommandBuilder()
  .setName("jourferie")
  .setDescription("Tout savoir sur les jours feriés")
  .addSubcommand((subcommand) =>
    subcommand.setName("next").setDescription("Le prochain jour ferié")
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("all").setDescription("Les jours feriés de l'année")
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("year")
      .setDescription("Les jours feriés de cette année")
      .addNumberOption((option) =>
        option
          .setName("année")
          .setDescription("Les jours feriés de l'année choisie")
          .setRequired(true)
      )
  );

export default jourferieCommand.toJSON();
