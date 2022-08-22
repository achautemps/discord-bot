import axios from "axios";
import { parseString } from "xml2js";
const API_URL = "http://ergast.com/api/f1/current";

async function xml2json(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, function (err, json) {
      if (err) reject(err);
      else resolve(json);
    });
  });
}

class Formula1 {
  constructor() {
    this.state = {
      isNextFounded: false,
    };
  }

  fetch() {
    this.state = {
      ...this.state,
      isNextFounded: false,
    };
    return axios.get(`${API_URL}`);
  }
  async checkWeek(xml) {
    try {
      const data = await xml2json(xml);
      const today = new Date();
      const sunday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + (7 - today.getDay()),
        23,
        59,
        59
      );
      let text = "";
      data.MRData.RaceTable[0].Race.forEach((race) => {
        const date = new Date(race.Date[0]);
        if (
          date.getTime() > today.getTime() &&
          date.getTime() <= sunday.getTime()
        ) {
          console.log(race.RaceName[0]);
          text = `Oui mon pote, c'est bien une race week ! C'est le **${race.RaceName[0]}** ce week-end`;
        }
      });
      if (text === "") {
        text = "Et non ! Déso mon pote mais ce n'est pas une race week";
      }
      return text;
    } catch (error) {
      console.error(error);
    }
  }
  async isRaceWeek() {
    try {
      const { data } = await this.fetch();
      return this.checkWeek(data);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Formula1();
