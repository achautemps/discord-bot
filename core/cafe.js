import { getMinutesFromMillis } from "../helper/date.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { users } = require("../config.json");
class Cafe {
  constructor() {
    this.state = {
      dateStart: null,
      dateEnd: null,
      estimatedDuration: 0,
    };
  }
  estimate() {
    const min = 240000;
    const max = 2400000;

    this.state = {
      ...this.state,
      estimatedDuration: Math.random() * (max - min) + min,
    };
  }
  start() {
    this.state = {
      ...this.state,
      dateStart: new Date(),
    };
    this.estimate();
    return `L'Estimation du temps de préparation du café de <@${
      users.clement.id
    }> est de : **${getMinutesFromMillis(this.state.estimatedDuration)}**`;
  }
  stop() {
    this.state = {
      ...this.state,
      dateEnd: new Date(),
    };
    return this.end();
  }
  end() {
    const time = this.state.dateEnd.getTime() - this.state.dateStart.getTime();

    if (time < this.state.estimatedDuration) {
      return `Bravo à <@${
        users.clement.id
      }> qui a été plus rapide que le temps estimé ! Il a mis **${getMinutesFromMillis(
        time
      )}** pour faire son café. Belle perf !`;
    } else if (time === this.state.estimatedDuration) {
      return `Quel incroyable scenario ! Il a égalé l'estimation de : **${getMinutesFromMillis(
        time
      )}** pour faire son café. Magnifique !`;
    } else {
      return `Je sous-estime la longueur de la pause café de ce bon vieux <@${
        users.clement.id
      }> ! Il a mis **${getMinutesFromMillis(time)}** pour faire son café !`;
    }
  }
}
export default new Cafe();
