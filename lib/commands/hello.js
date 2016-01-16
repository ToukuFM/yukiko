'use strict';
var Command = require('easy-slackbot').Command;
var strings = require('./strings/hello');

class HelloCommand extends Command {
    constructor() {
        var commands = [
            'hi',
            'hello',
            'hey',
            '\'sup',
            'wassup',
        ];
        super(commands);
    }

    handler(data, ctx, slack, callback) {
        var index = Math.floor(Math.random() * strings.length);
        var username = '@' + slack.getUser(data.user).name;
        callback(strings[index].replace('[USERNAME]', username));
    }
}

module.exports = HelloCommand;