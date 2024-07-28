[![Discord](https://img.shields.io/discord/348195341717209093?style=flat-square)](https://discord.gg/rxality)
![Github Stars](https://img.shields.io/github/stars/rxality/Discord-Music-Bot?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues-raw/rxality/Discord-Music-Bot?style=flat-square)

# About

A discord bot built on discord.js for playing music via discord.

# Getting Started

- [How to create your bot application](https://discord.com/developers/docs/getting-started)
- [Quickstart guide to discord.js](https://discordjs.guide/#before-you-begin)

# Requirements

Prerequisites:
- [Node.js](https://nodejs.org/en/download)

Required npm packages:
- [discord.js](https://www.npmjs.com/package/discord.js)
- [poru](https://www.npmjs.com/package/poru)
- [poru-spotify](https://www.npmjs.com/package/poru-spotify)

# Installation

1. Clone the Github repository
`git clone https://github.com/rxality/Discord-Music-Bot`
2. Update the `config.example.json` to `config.json` along with updating \
the configurations within the file.
3. Run `node guild-deploy-commands.js` or `node global-deploy-commands.js` depending on if you want the command only in your guild or globally.
4. Run `node .` in the same directory as the `index.js` file in your terminal

# Config
```json
{
	"token": "bot token [required]",
	"clientId": "bot client id [required]",
	"guildId": "testing guild id [required]",
	"designatedChannelId": "channel id for bot to only listen to [optional]", 
	
	"spotify": {
		"spotifyClientId": "spotify client id [required]",
		"spotifyClientSecret": "spotify client secret [required]"
	},
	"nodes": [
		{
		  "name": "name of node [required]",
		"host": "ip of node [required]",
		"port": "port of node as an integer [required]",
		"password": "password of node [required]"
	  }
	  ]
}
```

`clientId` and `guildId` are only required if you intend on only using\
application commands. Feel free to make modifications to transition to your\
own approach of text-based commands.

# Features

- /play - Searches Spotify for a requested track and plays it through YouTube music.
- /queue - Displays the songs that have been requested.
- /shuffle - Randomly sorts the songs present in the queue.
- /skip - Skips the currently playing song (and stops the music player if no more tracks are available to be played).
- /stop - Clears the queue and exits the music player.
