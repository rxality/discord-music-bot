const {Events} = require('discord.js');


module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * The function initializes a client and logs in as a user.
     * @param client - The "client" parameter is an instance of the Discord.js client class, which
     * represents a connection to the Discord API. It is used to interact with the API and perform
     * actions such as sending messages, joining voice channels, and managing guilds. In this code
     * snippet, the "client" parameter is
     */
    execute(client) {

        console.log(`Ready! Logged in as ${
            client.user.tag
        }`);

        client.poru.init(client);
    }
};
