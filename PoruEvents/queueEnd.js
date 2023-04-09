const {EmbedBuilder} = require("discord.js")

module.exports = {
    name: "queueEnd",
    once: false,
    /**
     * This function sends a message to the text channel and destroys the player if there are no
     * remaining tracks in the queue.
     * @param player - The "player" parameter is likely an instance of a music player object, which
     * contains information about the current state of the music player, such as the current track
     * being played, the queue of upcoming tracks, and the text channel where the player is being used.
     * @param track - The `track` parameter is likely a reference to the current track that is being
     * played by the music player. It may contain information such as the track's title, artist,
     * duration, and source. However, it is not used in the provided code snippet.
     * @returns {null}
     */
    execute(player, track) {

        const client = player.poru.client;
        const textChannel = client.channels.cache.get(player.textChannel);

        if (! textChannel) 
            return;
        


        const embed = new EmbedBuilder().setTitle("No remaining tracks in queue. Now leaving the channel.").setColor(0x2F3136)

        textChannel.send({embeds: [embed]});
        player.destroy()

    }
};
