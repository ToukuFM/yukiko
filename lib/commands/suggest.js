'use strict';
var Command = require('easy-slackbot').Command;

class SuggestCommand extends Command {
    constructor() {
        var commands = [
            'suggest',
            'suggestion:',
            'suggestion',
        ];
        super(commands);
    }

    handler(data, ctx, slack, callback) {
        var response = '_*Hey! Somebody has suggested the following:*_ \n```';
        response += data.text;
        response += '``` \n_Sent by @' + slack.getUser(data.user).name + '_';

        callback('Thanks for letting me know! ' +
            'I\'ll take your suggestion to heart!~ :heart:');
            
        slack.sendPM('D0J1948HZ', response); // Replace with your own slack channel id
    }
}

module.exports = SuggestCommand;