'use strict';
var Command = require('easy-slackbot').Command;
var strings = require('./strings/welcome');

class WelcomeCommand extends Command {
    constructor() {
        super('welcome');
    }

    handler(data, ctx, slack, callback) {
        var response = 'Hey, @' + slack.getUser(data.user).name + ', ';
        for (var string in strings)
            response += strings[string] + '\n';
        callback(response);
    }
}

module.exports = WelcomeCommand;