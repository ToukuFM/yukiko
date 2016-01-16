'use strict';
var Command = require('easy-slackbot').Command;
var strings = require('./strings/help');

class HelpCommand extends Command {
    constructor() {
        super('help');
    }

    handler(data, ctx, slack, callback) {
        var response = '';
        for (var string in strings)
            response += strings[string] + '\n';
        callback(response);
    }
}

module.exports = HelpCommand;