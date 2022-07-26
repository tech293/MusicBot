const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
name: "filter",
description: "Adds audio filter to ongoing music.",
permissions: "0x0000000000000800",
options: [{
name: 'filtre',
description: 'Type the filter you want to apply. (bassboost, 8D, nightcore)',
type: ApplicationCommandOptionType.String,
required: true
}],
run: async (client, interaction) => {

const queue = client.player.getQueue(interaction.guild.id);

if (!queue || !queue.playing) return interaction.reply({ content: `There is no music currently playing!. ❌`, ephemeral: true }).catch(e => { })
const filtre = interaction.options.getString('filtre')

if (!filtre) return interaction.reply({ content: `Please enter a valid filter name. ❌\n\`bassboost, 8D, nightcore\``, ephemeral: true }).catch(e => { })

const filters = ["bassboost","8d","nightcore"];
//other filters: https://discord-player.js.org/docs/main/master/typedef/AudioFilters
  
queue.getFiltersEnabled().map(x => filters.push(x));
queue.getFiltersDisabled().map(x => filters.push(x));

const filter = filters.find((x) => x.toLowerCase() === filtre.toLowerCase());

if (!filter) return interaction.reply({ content: `I couldn't find a filter with your name. ❌\n\`bassboost, 8D, nightcore\``, ephemeral: true }).catch(e => { })
const filtersUpdated = {};

filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

await queue.setFilters(filtersUpdated);

interaction.reply({ content: `Applied: **${filter}**, Filter Status: **${queue.getFiltersEnabled().includes(filter) ? 'Active' : 'Inactive'}** ✅\n **Remember, if the music is long, the filter application time may be longer accordingly.**` }).catch(e => { })
},
};
