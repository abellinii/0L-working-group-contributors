const { Client, Intents } = require('discord.js');
const {loadDocument} = require('./googleSheets')
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//TESTROLES- While we wait for discord bot authentication
var discordRoles = ['Moderators',	'Design Contributor',	'Econ Contributor',	'Onboarding Contributor',	'Dev Contributor',	'Discord Police- Hustle Karma',	'FAQ-Admin',	'admin',	'announcements-admin'];  //TEST
var discordRowRange =  {
    "startRowIndex": 0,
    "endRowIndex": 1,
    "startColumnIndex": 4,
    "endColumnIndex": discordRoles.length + 4 //TEST
  }

var colors = require('./colors.js')

module.exports = {
    
    populateDiscordRoles: async function (tab,startIndex){

                            client.on("ready", async () => {

                            var doc = await loadDocument();

                            //set hustle karma test sheet
                            const sheet = doc.sheetsByTitle[tab]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]


                            //get rows that are not empty
                            await sheet.loadCells('A1:A100'); // loads a range of cells
                            var users = sheet.cellStats.nonEmpty - 1 //  populated user cell with github raw link

                                //populate discord info
                                await sheet.loadCells('A1:Z10'); // loads a range of cells


                                //get discord roles
                                // const guild = client.guilds.cache.get(process.env.OL_GUILD_ID);
                                // const roles = guild.roles.cache.map(role => role.name)
                                //discordRowRange.endColumnIndex = roles.length + 4

                                await sheet.mergeCells(discordRowRange);
                                sheet.getCell(0,startIndex).value = 'Discord Roles'
                                sheet.getCell(0,startIndex).horizontalAlignment= 'CENTER'
                                sheet.getCell(0,startIndex).backgroundColor= colors.purple

                                //Add discord Roles to columns
                                for (let index = 0; index < discordRoles.length ; index++) {
                                    console.log(startIndex + index)
                                    sheet.getCell(1, startIndex + index).value = discordRoles[index];
                                    sheet.getCell(1, startIndex + index).backgroundColor = colors.purpleLigther;
                                    
                                }

                                //identify members 
                                //get members from discord and create a map of <Member:Roles[]>   map


                                //Allocate shading

                                // for (let i = 1; i <= users; i++) {
                                //     var discordName = sheet.getCell(i + 1, 1).value
                                //     var userRoles = null; //map.get(discordName)
                                //     for (let j = 0; j < discordRoles.length ; j++) {
                                //         if(userRoles.contains(sheet.getCell(1, startIndex + index).value)){

                                //             sheet.getCell(i + 1, startIndex + index).backgroundColor = colors.green;
                                //         }else{

                                //             sheet.getCell(i + 1, startIndex + index).backgroundColor = colors.purpleLigther;
                                //         } 
                                        
                                        
                                //     }
                                    
                                // }

                                await sheet.saveUpdatedCells();


                            })

                            client.login(process.env.BOT_TOKEN);

}

}