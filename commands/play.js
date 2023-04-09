const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    InteractionCollector
} = require('discord.js');

const {readableTime} = require('../utils/readableTime');
const config = require('../config.json');


module.exports = {
    data: new SlashCommandBuilder().setName('play').setDescription('Plays a song.').addStringOption(option => option.setName('song').setDescription('The song you want to play.').setRequired(true)),

    /**
     * This function allows a user to search for and add a song or playlist to a music player queue in
     * a Discord server.
     * @param interaction - The interaction object that represents the user's interaction with the bot,
     * such as a slash command or button click.
     * @returns {null}
     */
    async execute(interaction) {
        await interaction.deferReply(ephemeral = true);

        if (config.designatedChannelId && interaction.channelId != config.designatedChannelId) {
            const embed = new EmbedBuilder().setDescription(`You can only use this command in <#${
                config.designatedChannelId
            }.`).setColor(0x2F3136);

            return interaction.editReply({embeds: [embed], ephemeral: true});
        };


        const resolve = await interaction.client.poru.resolve({
            query: interaction.options.getString('song', true),
            source: "spotify",
            requester: interaction.member
        });


        const {loadType, playlistInfo, tracks} = resolve;

        if (loadType == "NO_MATCHES") {
            const embed = new EmbedBuilder().setTitle("No matches found.").setColor(0x2F3136);

            return interaction.editReply({embeds: [embed], ephemeral: true});

        } else if (loadType == "LOAD_FAILED") {
            const embed = new EmbedBuilder().setTitle("Failed to load the track.").setColor(0x2F3136);

            return interaction.editReply({embeds: [embed], ephemeral: true})

        } else if (loadType == "TRACK_LOADED" && tracks.length == 0) {
            const embed = new EmbedBuilder().setTitle("Unsupported request.").setColor(0x2F3136);

            return interaction.editReply({embeds: [embed], ephemeral: true});
        };

        const player = interaction.client.poru.createConnection({
            guildId: interaction.guildId,
            voiceChannel: interaction.member.voice.channelId,
            textChannel: interaction.channel.id,
            deaf: true,
            volume: 75
        });


        if (loadType == "TRACK_LOADED" && tracks.length == 1) {
            const track = tracks[0];
            track.info.requester = interaction.user.tag;
            track.info.requesterId = interaction.user.id

            player.queue.add(track);

            let duration = readableTime(track.info.length);

            const embed = new EmbedBuilder().setDescription(`**Added [${
                track.info.title
            }](${
                track.info.uri
            }) by ${
                track.info.author
            } to the queue**`).setThumbnail(track.info.image).setColor(0x2F3136).addFields([{
                    name: "Duration",
                    value: duration,
                    inline: true
                },]);

            await interaction.editReply({embeds: [embed], components: [], ephemeral: true});


            if (! player.isPlaying) 
                player.play();
            


        } else if (loadType == "SEARCH_RESULT" || loadType == "TRACK_LOADED") {

            const row = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('songs').setPlaceholder('Select the song you want to play.').addOptions(tracks.map((track, index) => {
                return {
                    label: track.info.title.slice(0, 100),
                    value: index.toString(),
                    description: track.info.author.slice(0, 100)
                }
            })))


            const embed = new EmbedBuilder().setTitle(`${
                tracks.length
            } results found.`).setDescription(`Select the song you want to play.`).setColor(0x2F3136);

            await interaction.editReply({embeds: [embed], components: [row], ephemeral: true});

            const values = new InteractionCollector(interaction.client, {
                interaction: interaction,
                time: 10000,
                max: 1,
                filter: (i) => i.user.id === interaction.user.id
            })

            values.on('collect', async (interaction) => {

                const track = tracks[interaction.values[0]];
                track.info.requester = interaction.user.tag;
                track.info.requesterId = interaction.user.id

                player.queue.add(track);

                let duration = readableTime(track.info.length);

                const embed = new EmbedBuilder().setDescription(`**Added [${
                    track.info.title
                }](${
                    track.info.uri
                }) by ${
                    track.info.author
                } to the queue**`).setThumbnail(track.info.image).setColor(0x2F3136).addFields([{
                        name: "Duration",
                        value: duration,
                        inline: true
                    },]);

                await interaction.update({embeds: [embed], components: [], ephemeral: true});


                if (! player.isPlaying) 
                    player.play();
                


            })
        } else if (loadType == "PLAYLIST_LOADED") {
            let playlistMilliseconds = 0;

            for (const track of tracks) {
                track.info.requester = interaction.user.tag;
                track.info.requesterId = interaction.user.id
                player.queue.add(track);

                playlistMilliseconds += track.info.length;
            }

            let playlistDuration = readableTime(playlistMilliseconds);

            const embed = new EmbedBuilder().setDescription(`**${
                tracks.length
            } tracks added to the queue from [${
                playlistInfo.name
            }](${
                interaction.options.getString('song', true)
            }).**`).setColor(0x2F3136).addFields([{
                    name: "Duration",
                    value: playlistDuration,
                    inline: true
                },]);

            await interaction.editReply({embeds: [embed], ephemeral: true});


            if (! player.isPlaying) 
                player.play();
            


        }
    }

}
