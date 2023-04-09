const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder().setName('stop').setDescription('Clears the queue and leaves the channel.'),

    /**
     * This function clears the queue of a music player and leaves the voice channel.
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
            }>.`).setColor(0x2F3136);

            return interaction.editReply({embeds: [embed], ephemeral: true});
        };

        const player = interaction.client.poru.players.get(interaction.guild.id);

        if (! player) {
            const embed = new EmbedBuilder().setColor(0x2F3136).setDescription('I\'m not playing anything right now.');
            return interaction.editReply({embeds: [embed]});
        }


        let remainingTracks = player.queue.length || 1;

        const embed = new EmbedBuilder().setColor(0x2F3136).setTitle(`${remainingTracks} track(s) cleared from the queue. Now leaving the channel.`);

        player.destroy();

        interaction.editReply({embeds: [embed]});

    }
}
