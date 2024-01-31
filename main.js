const { channel } = require('diagnostics_channel');
const { Client, ChannelType ,GatewayIntentBits, ActivityType ,PermissionsBitField , Guild, ButtonBuilder, ButtonStyle, ActionRowBuilder,SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [ 
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,] 
});
const mongo = require
const fs = require('fs');

function resfreshData() {
    // read in data.json
    let data = fs.readFileSync('./config.json')
        return JSON.parse(data);
}
// async function adjustconfig(key, value) {
//     let botdata = await resfreshData();
//     botdata[key] = value;
//     const data = JSON.stringify(botdata, null, 2);
//     fs.writeFileSync('./config.json', data);
// }

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const data = resfreshData();
    // remove all slash commands
    client.application.commands.cache.forEach(async command => {
        await client.application.commands.delete(command);
    });
    // clear slash commands
    client.application.commands.cache.clear();
    // slash commands for bot from data.json
    var commands = [];
    for(var i = 0; i < data.commands.length; i++) {
        const command = data.commands[i];
        const commandData = new SlashCommandBuilder()
        commandData.setName(command.name)
        commandData.setDescription(command.description);
        if(command.perams != undefined){
            
        for(var j = 0; j < command.perams.length; j++) {
            const optione = command.perams[j];
            switch (optione.type) {
                case 'STRING':
            commandData.addStringOption(option => option.setName(optione.name).setDescription(optione.description).setRequired(optione.required));
            break;
            case 'INTEGER':
            commandData.addIntegerOption(option => option.setName(optione.name).setDescription(optione.description).setRequired(optione.required));
            break;
            case 'BOOLEAN':
            commandData.addBooleanOption(option => option.setName(optione.name).setDescription(optione.description).setRequired(optione.required));
            break;
            case 'USER':
            commandData.addUserOption(option => option.setName(optione.name).setDescription(optione.description).setRequired(optione.required));
            break;
        }
        if(optione.choices != undefined){
            for(var k = 0; k < optione.choices.length; k++) {
                const choice = optione.choices[k];
                commandData.addChoice(choice.name, choice.value);
            }
        }
    }
    }
    if(command.permissions != undefined){
        commandData.setDefaultMemberPermissions(command.permissions);
    }
    commands.push(commandData);
    }
    // add slash commands
    client.application.commands.set(commands);

    client.user.setPresence({
        activities: [{
            name: "Cat Battles",
            type: ActivityType.Playing,

        }]
});
})

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()){
        switch (interaction.commandName) {
            case 'meow':
                return interaction.reply('Meow!');
                break;
            case 'info':
                const infoembed = new EmbedBuilder()
                .setTitle('Battle Cats Bot')
                .setDescription('A bot made for the funnis for discord battles cat style')
                .setFooter('Made by: NekaouMike')
                return interaction.reply({ embeds: [infoembed] });
                break;
            case 'battle':
                
            break;

        }
    }
});

client.login(resfreshData().token);