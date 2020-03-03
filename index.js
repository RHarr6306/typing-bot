const { Client, Collection } = require('discord.js')
const dotenv = require('dotenv').config()
const command = require('./command')
const prefix = 't.'

const client = new Client({
    disableEveryone: true,
    fetchAllMembers: true,
    sync: true
})

require('./command')(client)

client.commands = new Collection()
client.aliases = new Collection()

client.on('ready', () => {
    console.log('Discord client: ready')
    client.user.setPresence({
        status: "online", 
        game: {
            name: "typists type",
            type: "WATCHING"
        }
    })
})

client.on('message', msg => {
    
    if (msg.author.bot || !msg.content.startsWith(prefix))
        return

    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()

    if (cmd.length != 0) 
        command(cmd, client, msg, args)

})

client.login(process.env.TOKEN)
    .then(() => console.log('Successfully logged into Discord.'))
    .catch(err => console.err(`Failed to login to Discord: ${err}`))
