const {EmbedBuilder} = require("discord.js")
const {readableTime} = require("../utils/readableTime")

module.exports = {
    name: "trackStart",
    once: false,
    /**
     * This function sends a message to a Discord text channel with information about the currently
     * playing track in a music player.
     * @param player - The `player` parameter is likely an object that contains information about the
     * current player, such as the client, text channel, and other relevant data.
     * @param track - The current track that is being played. It contains information such as the
     * title, author, duration, and requester.
     * @returns {null}
     */
    execute(player, track) {

        const client = player.poru.client;
        const textChannel = client.channels.cache.get(player.textChannel);

        if (! textChannel) 
            return;
        


        let duration = readableTime(track.info.length);

        const embed = new EmbedBuilder().setDescription(`**Now playing [${
            track.info.title
        }](${
            track.info.uri
        }) by ${
            track.info.author
        }**`).setThumbnail(track.info.image).setFooter({
                text: `Requested by ${
                track.info.requester
            }`
        }).setColor(0x2F3136).addFields([{
                name: "Duration",
                value: duration,
                inline: true
            },])

        textChannel.send({embeds: [embed]});

    }
};
