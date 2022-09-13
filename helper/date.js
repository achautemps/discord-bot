export function getMonth(date) {
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
export function getDay(date) {
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
export function getDayNumberBetweenTwoDates(dateStart, dateEnd) {
  return (dateEnd.getTime() - dateStart.getTime()) / (1000 * 3600 * 24);
}
export function getMinutesFromMillis(duration) {
  var minutes = Math.floor(duration / 60000);
  var seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
