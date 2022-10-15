

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const ytdl = require("ytdl-core-discord");
const {
  createAudioResource,
} = require("@discordjs/voice");

export default class Track {
  constructor({ url }) {
    this.url = url;
  }
  async getAudioResource() {
    const stream = await ytdl(this.url, { filter: 'audioonly' });
    return createAudioResource(stream);
  }
}
