import { getMinutesFromMillis } from "./helper/date.js";

class Cafe {
  constructor() {
    this.state = {
      dateStart: null,
      dateEnd: null,
      estimatedDuration: 0,
    };
  }
  estimate() {
    const min = 240000
    const max = 2400000

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
    return `L'Estimation du temps de préparation du café de Clément est de : ${getMinutesFromMillis(
      this.state.estimatedDuration
    )}`;
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
      return `Bravo à Clément qui a été plus rapide que le temps estimé ! Il a mis **${getMinutesFromMillis(
        time
      )}** pour faire son café. Belle perf !`;
    } else if (time === this.state.estimatedDuration) {
      return `Quel incroyable scenario ! Il a égalé l'estimation de : **${getMinutesFromMillis(
        time
      )}** pour faire son café. Magnifique !`;
    } else {
      return `Je sous-estime la longueur de la pause café de ce bon vieux Clément ! Il a mis **${getMinutesFromMillis(
        time
      )}** pour faire son café !`;
    }
  }
}
export default new Cafe();
