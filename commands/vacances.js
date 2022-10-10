import { SlashCommandBuilder } from "@discordjs/builders";

const vacancesCommand = new SlashCommandBuilder()
  .setName("vacances")
  .setDescription("Demander la date des prochaines vacances d'une personne")
  .addStringOption((option) =>
        option
          .setName("prénom")
          .setDescription("Prénom de la personne")
          .setRequired(true)
      )
export default vacancesCommand.toJSON();
