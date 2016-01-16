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


// SETUP ==================================================================== #

var bot = new SlackBot({
    token: 'xoxb-18045552050-MPghwfcuruBICzWLvS8MuJqc',
    name: 'U0J1BG81G',
    welcome: console.log, // TODO: change into real welcome handler
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

// Initialize and connect
bot.connect();


// TODO:
// - multiple word commands such as 'who made you'
// - change HelpCommand to lookup all commands in solution