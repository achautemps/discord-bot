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
      this.voiceConnection.disconnect();
    });
    this.player.on(AudioPlayerStatus.Idle, () => {
      this.voiceConnection.disconnect();
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
  }

  async delete() {
    this.voiceConnection.disconnect();
  }

  async play(url) {
    const track = new Track({
      url,
    });
    const resource = await track.getAudioResource();
    return this.player.play(resource);
  }
}
export default new Music();
