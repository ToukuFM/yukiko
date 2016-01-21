'use strict';
var Command = require('easy-slackbot').Command;

class WhisperCommand extends Command {
    constructor() {
        super('whisper');
    }

    handler(data, ctx, slack, callback) {
        var command = data.text.split(' ');
        var channel, text, func, pm;
        if (ctx[1][0] == '<' && command[0][1] != '@') {
            pm = (ctx[1][1] == '@');
            channel = ctx[1].substring(2, 11);
            text = ctx[1].split(command[1])[1];
        } else if (ctx[1][0] == '<' && command[0][1] == '@') {
            pm = (ctx[1][1] == '@');
            channel = ctx[1].substring(2, 11);
            text = ctx[1].split(command[2])[1];
        } else {
            callback('Huh? I didn\'t quite catch that...');
            return;
        }

        if (pm)
            slack.sendPM(channel, text);
        else
            slack.sendMsg(channel, text);

        callback('Alright! I\'ll pass on the message~');

        // Log to admin to prevent abuse
        var usr = slack.getUser(data.user).name;
        var ch = ctx[1].split(' ')[0];
        var pm = `*Hey, @${usr} just whispered this to ${ch}:*\n\`${text}\``;
        slack.sendPM('D0J1948HZ', pm); // Replace with your own slack channel id
    }
}

module.exports = WhisperCommand;
