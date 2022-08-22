import axios from "axios";
const API_URL = "https://calendrier.api.gouv.fr/jours-feries/metropole";

class Jourferie {
  constructor() {
    this.state = {
      isNextFounded: false,
    };
  }
  getCustomMessage(place) {
    const customMessages = [
      `Tu vas devoir attendre un peu mon pote, le prochain jour férié est le ${place}`,
      `${place}, SAVE THE DAY !`,
      `${place} mon pote, n'oublie pas, note le dans ton p'tit calendrier !!!`,
    ];
    return customMessages[Math.floor(Math.random() * customMessages.length)];
  }
  getStatus(date) {
    const today = new Date();
    const diff = date.getTime() - today.getTime();
    if (date.toDateString() === today.toDateString()) {
      return " - [aujourd'hui !!!]";
    }
    if (diff < 0) {
      return " - [passé]";
    } else {
      if (!this.state.isNextFounded) {
        this.state = { ...this.state, isNextFounded: true };
        return " - **[next !!!]**";
      }
    }
    return "";
  }
  getMonth(date) {
    const months = [
      "janvier",
      "fevrier",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    return months[date.getMonth()];
  }
  getDay(date) {
    const days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    return days[date.getDay()];
  }
  parseDate(date) {
    return `${this.getDay(date)} ${date.getDate()} ${this.getMonth(
      date
    )} ${date.getFullYear()}${this.getStatus(date)}`;
  }

  parseData(initialData) {
    const data = [];
    for (const [dateString, name] of Object.entries(initialData)) {
      const date = this.parseDate(new Date(dateString));
      data.push(`${name} : ${date}`);
    }
    return data;
  }
  findNext(initialData) {
    for (const [dateString] of Object.entries(initialData)) {
      const date = new Date(dateString);
      if (this.getStatus(date).includes("next")) {
        return this.getCustomMessage(this.parseDate(date));
      }
    }
    return "Pas avant l'année prochaine mon pote !";
  }
  fetch(year = new Date().getFullYear()) {
    this.state = {
      ...this.state,
      isNextFounded: false,
    };
    return axios.get(`${API_URL}/${year}.json`);
  }
  async getAll(year = new Date().getFullYear()) {
    try {
      const { data } = await this.fetch(year);
      return [`Voici les jours fériés en ${year} :`, ...this.parseData(data)];
    } catch (error) {
      console.log(error);
    }
  }
  async getNext() {
    try {
      const { data } = await this.fetch();
      return this.findNext(data);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Jourferie()
