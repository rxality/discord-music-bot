const {REST, Routes} = require('discord.js');
const {clientId, guildId, token} = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

/* `const commands = [];` is initializing an empty array called `commands`. This array is later used to
store the application commands for a Discord bot after they are dynamically loaded from the
`commands` directory and converted to JSON format. */
const commands = [];

/* These lines of code are setting the `commandsPath` variable to the absolute path of the `commands`
directory relative to the current file's directory using the `path.join()` method. The
`commandFiles` variable is then set to an array of file names in the `commands` directory that end
with the `.js` extension using the `fs.readdirSync()` method and the `filter()` method. This code is
used to dynamically load all JavaScript files in the `commands` directory. */
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


/* This code block is iterating through an array of file names (`commandFiles`) and requiring each file
as a module using `require()`. It then accesses the `data` property of the exported object from each
module and converts it to JSON format using the `toJSON()` method. The resulting JSON object is then
pushed into an array called `commands`. This code is likely used to dynamically load and register
application commands for a Discord bot. */
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

/* This line of code is creating a new instance of the `REST` class from the `discord.js` library and
setting the version to '10' using the `version` option. It then sets the token for the instance
using the `setToken()` method and the `token` variable imported from the `config.json` file. This
instance of the `REST` class is used to make HTTP requests to the Discord API for actions such as
refreshing application commands. */
const rest = new REST({version: '10'}).setToken(token);


/* An immediately invoked async function expression (IIFE) that refreshes the application commands for
a Discord bot. It logs a message indicating the start of the refresh, sends a PUT request to the
Discord API to update the guild's commands with the commands stored in the `commands` array, and
logs a message indicating the successful completion of the refresh. If an error occurs during the
refresh, it logs the error message. */
(async () => {
    try {
        console.log(`Started refreshing ${
            commands.length
        } application (/) commands.`);


        const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands
        },);

        console.log(`Successfully reloaded ${
            data.length
        } application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
