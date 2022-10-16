import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { createAudioResource, demuxProbe } = require("@discordjs/voice");
const ytdl = require("ytdl-core");

export default class Track {
  constructor(url, { onStart, onFinish, onError }) {
    this.url = url;
    this.onStart = onStart ? onStart : () => {};
    this.onFinish = onFinish ? onFinish : () => {};
    this.onError = onError ? onError : () => {};
  }
  async getAudioResource() {
    /*const stream = await ytdl(this.url, { filter: "audioonly" });
    return createAudioResource(stream, { metadata: this });*/
    const stream = ytdl(this.url, {
      filter: "audioonly",
    });
    return createAudioResource(stream, {
      metadata: this,
    });
  }
}
