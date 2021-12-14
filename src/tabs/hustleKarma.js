require('dotenv').config();
var discord = require('../utils/discord.js')
module.exports = {
    
    populatePage: async function (){

        discord.populateDiscordRoles('Hustle Karma-TEST',parseInt(process.env.HUSTLE_KARMA_START_INDEX));



}

}