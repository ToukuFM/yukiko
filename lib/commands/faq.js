'use strict';
var Command = require('easy-slackbot').Command;
var strings = require('./strings/faq');

class FaqCommand extends Command {
    constructor() {
        var commands = [
            'faq',
            'who made you',
            'who made this'
        ];
        super(commands);
    }

    handler(data, ctx, slack, callback) {
        var response = '';
        for (var string in strings)
            response += strings[string] + '\n';
        callback(response);
    }
}

module.exports = FaqCommand;