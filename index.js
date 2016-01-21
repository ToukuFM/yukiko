'use strict';

// REQUIRES ================================================================= #

var slack = require('easy-slackbot');
var SlackBot = slack.Bot;
var touku = require('./lib/commands/touku');

// COMMANDS ================================================================= #

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
var ImojiCommand = require('./lib/commands/imoji');
var WhisperCommand = require('./lib/commands/whisper');
var JokeCommand = require('./lib/commands/joke');

// Anonymous commands
var PomfCommand = (data, ctx, slack, callback) => {
    callback('*Wahh!* What are we gonna do on the bed?');
};

// SETUP ==================================================================== #

var slackbot = new SlackBot({
    token: '',
    name: 'U0J1BG81G',
    welcome: console.log,
    prefix: '!',
    commands: [
        new HelloCommand(),
        new WelcomeCommand(),
        new FaqCommand(),
        new IpCommand(),
        new WaifuCommand(),
        new SuggestCommand(), // Channel ID
        new HelpCommand(),
        new AnimeCommand(),
        new ToukuScheduleCommand(),
        new ToukuNowPlayingCommand(),
        new ToukuTeamCommand(),
        new SayCommand(),
        new ImojiCommand(), // Imoji API Key
        new WhisperCommand(), // Channel ID
        new JokeCommand(),
    ],
});

// Add anonymous commands
slackbot.addCommandDirectly('pomf', PomfCommand);

// Initialize and connect
slackbot.connect();


// IRC ====================================================================== #
var irc = require("irc");

var ircbot = new irc.Client('irc.rizon.net', 'Yukiko', {
    channels: ['#touku']
});

ircbot.addListener("message", function(from, to, text, message) {
    // Pipe the message to #irc
    slackbot.sendMsg('C0JLRQ6RY', `*${from}:* ${text}`);
});

ircbot.addListener('pm', function(nick, text, message) {
    slackbot.sendPM('D0J1948HZ', `*PM* from _${nick}_: ${message.command}`);
});

ircbot.addListener('error', function(message) {
    slackbot.sendMsg('C0JLRQ6RY', `*IRC Error: * \`${message}\``);
});

// TODO:
// - add a real welcome handler
// - multiple word commands such as 'who made you'
// - change HelpCommand to lookup all commands in solution
// - retweet command
// - roundup integration, somehow?
// - Send messages from slack to irc?
