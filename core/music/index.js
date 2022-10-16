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
    this.queueLock = false;
    this.player.on("error", (error) => {
      console.error(error);
      this.voiceConnection.disconnect();
    });
    this.player.on("stateChange", (oldState, newState) => {
      if (
        newState.status === AudioPlayerStatus.Idle &&
        oldState.status !== AudioPlayerStatus.Idle
      ) {
        oldState.resource.metadata.onFinish();
        void this.processQueue();
      } else if (newState.status === AudioPlayerStatus.Playing) {
        newState.resource.metadata.onStart();
      }
    });
  }
  async init(interaction) {
    this.interaction = interaction;
    if (!interaction.member.voice.channel.id) {
      return interaction.followUp(
        "Il faut rejoindre un chan vocal avant de lancer une musique !"
      );
    }
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
    const _this = this
    const track = new Track(url, {
      onStart() {
        console.log(this.interaction)
        _this.interaction
          .followUp({ content: "Now playing!", ephemeral: true })
          .catch(console.warn);
      },
      onFinish() {
        _this.interaction
          .followUp({ content: "Now finished!", ephemeral: true })
          .catch(console.warn);
      },
      onError(error) {
        console.warn(error);
        _this.interaction
          .followUp({ content: `Error: ${error.message}`, ephemeral: true })
          .catch(console.warn);
      },
    });
    this.queue.push(track);
    return this.processQueue();
  }
  async processQueue() {
    if (
      this.queueLock ||
      this.player.state.status !== AudioPlayerStatus.Idle ||
      this.queue.length === 0
    ) {
      return;
    }
    this.queueLock = true;
    const nextTrack = this.queue.shift();
    try {
      const resource = await nextTrack.getAudioResource();
      this.player.play(resource);
      this.queueLock = false;
    } catch (error) {
      console.log(error);
      this.queueLock = false;
      return this.processQueue();
    }
  }
}
export default new Music();
