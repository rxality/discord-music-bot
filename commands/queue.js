const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {readableTime} = require('../utils/readableTime');

module.exports = {
    data: new SlashCommandBuilder().setName('queue').setDescription('Displays the current queue.'),
    /**
     * This function displays the current queue of songs in a Discord voice channel, including the
     * remaining duration of the queue and up to 25 songs.
     * @param interaction - The interaction object represents the interaction between the user and the
     * bot, and contains information such as the user who triggered the interaction, the command that
     * was invoked, and any options or arguments provided.
     */
    async execute(interaction) {
        await interaction.deferReply(ephemeral = true);
        const player = interaction.client.poru.players.get(interaction.guild.id);
        const queue = player.queue;

        let queueMilliseconds = 0;

        for (const track of queue) {
            queueMilliseconds += track.info.length;
        };

        const queueDuration = readableTime(queueMilliseconds);

        let index = 1;
        let queueString = '';
        for (const track of queue) {
            if (index > 25) 
                break;
            


            const title = track.info.title;

            queueString += `${index}. [${title}](${
                track.info.uri
            })\n`;

            index++;
        }

        const embed = new EmbedBuilder().setColor(0x2F3136).setTitle(`Current queue up to ${index} songs (${queueDuration} remaining):`).setDescription(`**${queueString}**`.slice(0, 2048));

        interaction.editReply({embeds: [embed], ephemeral: true});

    }
}
