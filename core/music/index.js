import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {
  createAudioPlayer,
  joinVoiceChannel,
  AudioPlayerStatus,
} = require("@discordjs/voice");
import Track from "./track.js";

class Music {
  constructor() {
    this.player = createAudioPlayer();
    this.queue = [];
    this.player.on("error", (error) => {
      console.error(
        `Error: ${error.message} with resource ${error.resource.metadata.title}`
      );
    });
    this.player.on(AudioPlayerStatus.Idle, (error) => {
      console.error(
        `LAUNCH: ${error.message} with resource ${error.resource.metadata.title}`
      );
    });
  }
  async init(interaction) {
    this.voiceConnection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfDeaf: false,
    });
    this.voiceConnection.subscribe(this.player);
    this.play();
  }

  async delete() {
    this.voiceConnection.disconnect();
  }

  async play() {
    const track = new Track({
      url: "https://www.youtube.com/watch?v=VBlFHuCzPgY",
    });
    const resource = await track.getAudioResource();
    return this.player.play(resource);
  }
}
export default new Music();
