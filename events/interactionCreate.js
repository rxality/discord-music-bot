const {Events} = require('discord.js');


module.exports = {
    name: Events.InteractionCreate,
    once: false,
    /**
     * This function executes a command in response to a chat input interaction and handles errors.
     * @param interaction - The interaction object represents an interaction between the user and the
     * bot. It contains information about the user who initiated the interaction, the command that was
     * invoked, and any arguments or options that were provided. The interaction object is passed as a
     * parameter to the execute function, which is responsible for handling the interaction and
     * @returns {null}
     */
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);


            if (! command) 
                return;
            


            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
                } else {
                    await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
                }
            }
        }

    }
};
