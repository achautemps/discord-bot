import { SlashCommandBuilder } from "@discordjs/builders";
import formula1 from "../core/formula1.js";

const name = "raceweek";

const raceWeekCommand = new SlashCommandBuilder()
  .setName(name)
  .setDescription("Est-on en raweceek ?");

export default {
  name,
  command: raceWeekCommand.toJSON(),
  execute: async (interaction) => {
    await interaction.deferReply();
    try {
      const data = await formula1.isRaceWeek();
      await interaction.editReply(data);
    } catch (error) {
      await interaction.editReply("Erreur API formula 1");
    }
  },
};
