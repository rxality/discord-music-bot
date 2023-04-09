const fs = require('node:fs');
const path = require('node:path');

const {Client, GatewayIntentBits, Collection} = require('discord.js');
const {Poru} = require('poru');
const {Spotify} = require('poru-spotify');

const config = require('./config.json');


/* These lines of code are reading the contents of three different directories (`commands`, `events`,
and `poruEvents`) and filtering out only the files that end with `.js`. The resulting arrays of file
names are stored in `commandFiles`, `eventFiles`, and `poruEventFiles`, respectively. These arrays
will be used later in the code to require each file as a module and execute its contents. */
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const poruEventsPath = path.join(__dirname, 'poruEvents');
const poruEventFiles = fs.readdirSync(poruEventsPath).filter(file => file.endsWith('.js'));

/* This line of code is creating a new instance of the `Spotify` class from the `poru-spotify` package,
passing in an object with the `clientID` and `clientSecret` properties from the `config.json` file
as arguments. This instance of the `Spotify` class will be used as a plugin for the `Poru` instance
created later in the code. */
let spotify = new Spotify({clientID: config.spotify.spotifyClientId, clientSecret: config.spotify.spotifyClientSecret});

/* `const PoruOptions` is an object that is being used to configure the `Poru` instance created later
in the code. It specifies that the `discord.js` library should be used, sets the default platform to
`ytmsearch`, and includes the `spotify` plugin as one of the plugins to be used by `Poru`. */
const PoruOptions = {
    library: "discord.js",
    defaultPlatform: "ytmsearch",
    plugins: [spotify]
}


const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent,]
});


/* `client.poru = new Poru(client, config.nodes, PoruOptions)` creates a new instance of the `Poru`
class and assigns it to the `poru` property of the `client` object. The `Poru` class is a wrapper
for the `ytpl` and `ytsr` packages that provides a unified interface for searching and playing
YouTube videos. The `client.commands = new Collection()` creates a new `Collection` object and
assigns it to the `commands` property of the `client` object. This `Collection` object will be used
to store all the commands that the bot can execute. */
client.poru = new Poru(client, config.nodes, PoruOptions);
client.commands = new Collection();


/* This code block is reading all the files in the `commands` directory and filtering out only the ones
that end with `.js`. It then loops through each file and requires it as a module, storing it in the
`command` variable. It checks if the `command` module has both a `data` and `execute` property, and
if it does, it adds the command to the `client.commands` collection with the command name as the
key. If the `command` module is missing either the `data` or `execute` property, it logs a warning
message to the console. */
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}


/* This code block is reading all the files in the `events` directory and filtering out only the ones
that end with `.js`. It then loops through each file and requires it as a module, storing it in the
`event` variable. It checks if the `event` module has a `once` property, and if it does, it adds the
event listener to the `client` object using `client.once()`, passing in the event name and a
function that executes the `event.execute()` method with any arguments passed to it. If the `event`
module does not have a `once` property, it adds the event listener to the `client` object using
`client.on()`. */
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


/* This code block is reading all the files in the `poruEvents` directory and filtering out only the
ones that end with `.js`. It then loops through each file and requires it as a module, storing it in
the `event` variable. It checks if the `event` module has a `once` property, and if it does, it adds
the event listener to the `client.poru` object using `client.poru.once()`, passing in the event name
and a function that executes the `event.execute()` method with any arguments passed to it. If the
`event` module does not have a `once` property, it adds the event listener to the `client.poru`
object using `client.poru.on()`. */
for (const file of poruEventFiles) {
    const filePath = path.join(poruEventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.poru.once(event.name, (...args) => event.execute(...args));
    } else {
        client.poru.on(event.name, (...args) => event.execute(...args));
    }
}


client.login(config.token);
