import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function getCommands(ignoreList) {
  ignoreList = ignoreList || [];

  const commandsDirectory = "./../commands/";
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "..", "commands"))
    .filter((file) => file.endsWith(".js") && !ignoreList.includes(file));
  const commands = {};
  for (const file of commandFiles) {
    console.debug(`Loading command : ${file}`);
    commands[file] = (await import(commandsDirectory + file)).default;
  }


  return Object.values(commands).map(command => command);
}
