const {Events} = require('discord.js');


module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,

    execute(oldState, newState) {

        const player = newState.client.guildPlayer[newState.guild.id];
        if (player && newState.guild.members.me.id == newState.id) {
            if (!newState.channel) {
                player.destroy();
                delete oldState.client.guildPlayer[oldState.guild.id];

                return;
            }

            if (player.isPaused) {
                player.pause(false)

            }
        }
    }
}
