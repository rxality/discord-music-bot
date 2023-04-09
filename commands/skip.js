const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder().setName('skip').setDescription('Skips current playing song.'),

    /**
     * This function stops the current audio track being played by the bot and clears the queue if
     * there are no remaining tracks.
     * @param interaction - The interaction object represents the interaction between the user and the
     * bot. It contains information about the user, the command that was invoked, and any arguments
     * provided.
     * @returns {null}
     */
    async execute(interaction) {
        await interaction.deferReply();

        if (config.designatedChannelId && interaction.channelId != config.designatedChannelId) {
            const embed = new EmbedBuilder().setDescription(`You can only use this command in <#${
                config.designatedChannelId
            }.`).setColor(0x2F3136);

            return interaction.editReply({embeds: [embed], ephemeral: true});
        };

        const player = interaction.client.poru.players.get(interaction.guild.id);

        if (! player || ! player.queue) {
            const embed = new EmbedBuilder().setColor(0x2F3136).setDescription('**There is nothing playing.**');

            interaction.editReply({embeds: [embed]});
            return;
        }

        if (player.queue.length == 0) {
            const embed = new EmbedBuilder().setColor(0x2F3136).setTitle('No tracks remaining in queue.');

            interaction.editReply({embeds: [embed]});
            return;
        }

        player.stop()

    }
}
