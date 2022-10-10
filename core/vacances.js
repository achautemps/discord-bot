import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { users } = require("../config.json");

class Vacances {
  getDateByName = (name) => {
    if (name === "clément" || name === "clement") {
      return `Les prochaines vacances de <@${users.clement.id}> sont prévues pour la semaine prochaine. Comme toutes les 2 semaines, pourquoi tu demandes ?`;
    } else {
      return `Des va...quoi ?`;
    }
  };
}

export default new Vacances();
