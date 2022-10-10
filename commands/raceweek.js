import { SlashCommandBuilder } from "@discordjs/builders";

const raceWeekCommand = new SlashCommandBuilder()
  .setName("raceweek")
  .setDescription("Est-on en raweceek ?");

export default raceWeekCommand.toJSON();
