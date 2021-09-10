## Popcorn is an open-source, simple and easy-to-use bot which aims to make your server more fun and to get rid of single-use bots.
![stars](https://img.shields.io/github/stars/Dennis-5618/Popcorn?style=flat-square)

# Features
* A robust command and error handling system
* Economy system, complete with a shop
* A ticketing system allowing you to create up to 10 tickets per server
* Moderation and utility commands
* Modlog system
* An easy way to make and manage channels and roles

# Plans
Below you can read some of the features that are being worked on and will be added soon

* Member count channel
* User verification
* Custom prefixes
* Leveling system
* More ways to moderate and manage your server.

#### Please keep in mind that this bot is in the early stages of development. If you encounter any bugs, please report them by using the report command.


# Installation

### Requirements
* [Discord bot token](https://discord.com/developers/applications)
* [MongoDB token](https://www.mongodb.com/)
* [Node.js V14 or newer](https://nodejs.org/en/)
#### **Never share your Discord bot token or MongoDB token as those are the login details to your bot and database**

### Packages used
* [discord.js](https://github.com/discordjs/discord.js)
* [discord-buttons](https://github.com/AngeloCore/discord-buttons)
* [node-glob](https://github.com/isaacs/node-glob)
* [ms](https://github.com/vercel/ms)
* [mongoose](https://github.com/Automattic/mongoose)
* [node-fetch](https://github.com/node-fetch/node-fetch)
* [@topgg-sdk](https://github.com/top-gg/node-sdk)

Use `npm i [package name]` or `yarn add [package name]` to install

### Configuration
* Create a file in your folder named *config.json*
* Paste the text below in your *config.json* file
```
{
"token": "[Discord bot token]",
"database": "[MongoDB token]"
}
```
* replace **[Discord bot token]** and **[MongoDB token]** with the tokens you've generated before
