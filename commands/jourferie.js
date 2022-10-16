import { SlashCommandBuilder } from "@discordjs/builders";
import jourferie from "../core/jourferie.js";

const name = "jourferie";

const jourferieCommand = new SlashCommandBuilder()
  .setName(name)
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

export default {
  name,
  command: jourferieCommand.toJSON(),
  execute: async (interaction) => {
    const { options, user } = interaction;
    await interaction.deferReply();
    const subcommand = options.getSubcommand();
    let message = "Désolé, je ne trouve pas l'information";
    if (subcommand === "next") {
      try {
        message = await jourferie.getNext();
      } catch (error) {
        console.log(error);
      }
    } else if (subcommand === "all") {
      try {
        const data = await jourferie.getAll();
        message = `Salut <@${
          user.id
        }>, je vois que tu as besoin de repos ^^ 😉 \n ${data.join("\n")}`;
      } catch (error) {
        console.log(error);
      }
    } else if (subcommand === "year") {
      const year = options.getNumber("année");
      try {
        const data = await jourferie.getAll(year);
        message = `Salut <@${
          user.id
        }>, je vois que tu anticipes déjà petit malin ^^ 😉  \n ${data.join(
          "\n"
        )}`;
      } catch (error) {
        console.log(error);
      }
    }
    await interaction.editReply(message);
  },
};
