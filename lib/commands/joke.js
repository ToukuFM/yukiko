'use strict';
var Command = require('easy-slackbot').Command;
var request = require('request');

class JokeCommand extends Command {
    constructor() {
        var commands = [
            'joke',
            'randomjoke',
            'yomama'
        ];
        super(commands);
    }

    handler(data, ctx, slack, callback) {
        var url = 'http://api.yomomma.info/';

        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body.joke);
            } else {
                callback('I made an oopsie... Something went wrong... :disappointed:');
            }
        })
    }
}

module.exports = JokeCommand;
