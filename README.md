# Popcorn is a free and open-source bot which aims to make your server more fun and easier to manage.

![Stars](https://img.shields.io/github/stars/Dennis-5618/Popcorn?style=flat-square)
![Forks](https://img.shields.io/github/forks/Dennis-5618/Popcorn?style=flat-square)
![Issues](https://img.shields.io/github/issues/Dennis-5618/Popcorn?style=flat-square)

## Features:
* An economy system, complete with a shop
* Tickets, allowing you to create upto 10 different tickets per server
* Various moderation and utility commands
* Memes, wallpapers and other images
* Modlogging, keeping you up to date on what's happening in your server
* An easy way to make and manage channels and roles

##### Please do keep in mind that Popcorn is still in development and new commands will be added.

## Installation

### Required information:
* [Discord bot token](https://discord.com/developers/applications)
* [MongoDB token](https://www.mongodb.com/)
* [Node.js V16 or newer](https://nodejs.org/en/)

### Packages used:
* [discord.js](https://github.com/discordjs/discord.js)
* [node-glob](https://github.com/isaacs/node-glob)
* [ms](https://github.com/vercel/ms)
* [mongoose](https://github.com/Automattic/mongoose)
* [node-fetch](https://github.com/node-fetch/node-fetch)
* [@topgg-sdk](https://github.com/top-gg/node-sdk)
* [@iamtraction/google-translate](https://github.com/iamtraction/google-translate)

## Step 1:
Go to the Discord developer dashboard and create a new application, next go to the tab called 'bot' and copy the token from that page.

Make sure to *never* share this token with anyone as this is how you login to your bot

## Step 2:
Clone the Popcorn repo

## Step 3:
Install the required packages using either `npm` or `yarn`

npm: `npm install <package name>`

yarn: `yarn add <package name>`

## Step 4:
Create a file named `config.json` in your main folder and paste the code below:
```
{
	"token": [Discord bot token],
	"database": [MongoDB token]
}
```
Make sure to replace **[Discord bot token]** and **[MongoDB token]** with the actual token you have generated.
