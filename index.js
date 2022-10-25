require('dotenv').config();
const winston = require('winston');
const Discord = require('discord.js');
var last = -1;

// Winston Logger Declarations
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({format: winston.format.combine(winston.format.colorize(), winston.format.simple())}),
    new winston.transports.File({filename: 'logs/combined.log'})
  ]
});

const TOKEN = process.env.TOKEN;
const PREFIX = '&';

// Discord.js Declarations
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Load Commands
const botCommands = require('./commands');
Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

// Start Bot
bot.login(TOKEN);

bot.on('ready', () => {
  logger.info(`Logged in as ${bot.user.tag}!`);
});

// Process Messages
bot.on('message', msg => {
  // Check to make sure that the message starts with the prefix.  Otherwise, quietly ignore
  if (msg.content.startsWith(PREFIX)) {
    // Remove the prefix and then split the command by arguments.
    const args = msg.content.substring(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();
    logger.info(`Called command: ${command}`);

    try {
      bot.commands.get(command).execute(msg, args);
    } catch (error) {
      logger.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
  } else if (msg.author.id == "734874076585132172") {
    console.log("Message by target!")
    canadaDay(msg, 5);
  } else if (msg.author.bot == false) {
    canadaDay(msg, 50);
  }
});


function canadaDay(msg, chanceMax) {
  const randomInt = Math.floor(Math.random() * chanceMax);
  logger.info("randomInt: " + randomInt + " -- last: " + last);

  if (randomInt != last) {
    last = randomInt;

    switch (randomInt) {
      case 0:
        msg.react('🇨🇦');
        break;
      
      case 1:
        msg.reply("fellow Canadian, eh?")
        break;

      case 2:
        const canadianSay = [
          "The Vancouver Canucks will just mop the floor of those Maple Leafs.",
          "You know how a Canadian spells Canada right?  :regional_indicator_c:, eh, :regional_indicator_n:, eh, :regional_indicator_d:, eh.",
          "It's Canada Day today.  It means that the Tim Horton's is giving away free bear claws!  That's better than all the poutine in the world!",
          "The Great Maple Syrup robbery is Canada's most nortorious crime."
        ];

        msg.channel.send(canadianSay[Math.floor(Math.random() * canadianSay.length)]);
        break;

      case 3:
        const gifs = [
          "https://media.giphy.com/media/Gnvk5QoQcNala/giphy.gif",
          "https://media.giphy.com/media/5FiuCZoL0Ab1m/giphy.gif",
          "https://media.giphy.com/media/uAZGTdYXRqLVWqpNIn/giphy.gif",
          "https://media.giphy.com/media/l0Ex0GiS5QZSrMO6k/giphy.gif",
          "https://media.giphy.com/media/l0Ex0GiS5QZSrMO6k/giphy.gif",
          "https://media.giphy.com/media/dq9eT0JxapGi4/giphy.gif"
        ];

        msg.channel.send(gifs[Math.floor(Math.random() * gifs.length)]);
        break;
  
      default:
        break;
    }
  }
}