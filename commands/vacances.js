import { SlashCommandBuilder } from "@discordjs/builders";
import vacances from "../core/vacances.js";

const name = "vacances";

const vacancesCommand = new SlashCommandBuilder()
  .setName(name)
  .setDescription("Demander la date des prochaines vacances d'une personne")
  .addStringOption((option) =>
    option
      .setName("prénom")
      .setDescription("Prénom de la personne")
      .setRequired(true)
  );

export default {
  name,
  command: vacancesCommand.toJSON(),
  execute: async (interaction) => {
    const { options } = interaction;
    const name = options.getString("prénom");
    await interaction.deferReply();
    const data = await vacances.getDateByName(name.toLowerCase());
    await interaction.editReply(data);
  },
};
