const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {shuffleArray} = require('../utils/shuffleArray');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder().setName('shuffle').setDescription('Shuffles the queue.'),

    /**
     * This function shuffles the current queue of a music player and sends a message indicating how
     * many tracks were shuffled.
     * @param interaction - The interaction object represents the interaction between the user and the
     * bot. It contains information about the user, the command that was invoked, and any arguments
     * provided with the command.
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
        const queue = player.queue;

        if (! player || ! queue) {
            const embed = new EmbedBuilder().setColor(0x2F3136).setTitle('There is nothing playing.');

            interaction.editReply({embeds: [embed]});
            return;
        }


        let shuffledQueue = shuffleArray(queue);

        const embed = new EmbedBuilder().setColor(0x2F3136).setDescription(`**${
            shuffledQueue.length
        } tracks have been shuffled.**`);

        interaction.editReply({embeds: [embed]});

    }
}
