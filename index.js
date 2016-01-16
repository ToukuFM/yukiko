'use strict';

// REQUIRES ================================================================= #

var slack = require('easy-slackbot');
var SlackBot = slack.Bot;

// COMMANDS ================================================================= #

var touku = require('./lib/commands/touku');
var ToukuScheduleCommand = touku.ToukuScheduleCommand;
var ToukuTeamCommand = touku.ToukuTeamCommand;
var ToukuNowPlayingCommand = touku.ToukuNowPlayingCommand;
var HelloCommand = require('./lib/commands/hello');
var WelcomeCommand = require('./lib/commands/welcome');
var FaqCommand = require('./lib/commands/faq');
var IpCommand = require('./lib/commands/ip');
var WaifuCommand = require('./lib/commands/waifu');
var SuggestCommand = require('./lib/commands/suggest');
var HelpCommand = require('./lib/commands/help');
var AnimeCommand = require('./lib/commands/anime');
var SayCommand = require('./lib/commands/say');

// Anonymous commands
var PomfCommand = (data, ctx, slack, callback) => {
    callback('*Wahh!* What are we gonna do on the bed?');
};

// SETUP ==================================================================== #

var bot = new SlackBot({
    token: 'TOP SEKRIT',
    name: 'U0J1BG81G',
    welcome: console.log,
    prefix: '!',
    commands: [
        new HelloCommand(),
        new WelcomeCommand(),
        new FaqCommand(),
        new IpCommand(),
        new WaifuCommand(),
        new SuggestCommand(), // Replace channel ID in this file
        new HelpCommand(),
        new AnimeCommand(),
        new ToukuScheduleCommand(),
        new ToukuNowPlayingCommand(),
        new ToukuTeamCommand(),
        new SayCommand(),
    ],
});

// Add anonymous commands
bot.addCommandDirectly('pomf', PomfCommand);

// Initialize and connect
bot.connect();


// TODO:
// - add a real welcome handler
// - multiple word commands such as 'who made you'
// - change HelpCommand to lookup all commands in solution