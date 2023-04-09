const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'trackError',
    once: false,
    /**
     * This function sends an error message to a Discord channel when a track fails to play and skips
     * to the next track.
     * @param error - The error that occurred while playing the track.
     * @param track - The track parameter is likely an object that contains information about the audio
     * track that was attempted to be played but encountered an error. This could include properties
     * such as the track title, artist, duration, URL, etc.
     * @param message - The message object represents the message that triggered the error. It is used
     * to send the error message to the same channel where the command was executed.
     * @returns {null}
     */
    execute(error, track, message) {
        const embed = new EmbedBuilder()

        embed.setTitle('Error')
        embed.setDescription(`There was an error playing the track: ${
            track.title
        }. Skipping to the next track.`)
        embed.setColor(0x2F3136)

        message.channel.send(embed)

    }
}
