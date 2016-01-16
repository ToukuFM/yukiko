'use strict';
var Command = require('easy-slackbot').Command;
var strings = require('./strings/waifu');
var options = require('./strings/yukiko_options');
var responses = require('./strings/yukiko_responses');

class WaifuCommand extends Command {
    constructor() {
        var commands = [
            'waifu',
            'ratemywaifu',
            'rate my waifu',
        ];
        super(commands);
    }

    handler(data, ctx, slack, callback) {
        var response = '';

        if (options.indexOf(ctx[1].toLowerCase()) >= 0) {
            response = Math.floor(Math.random() * responses.length);
            response = responses[response];
        }
        else {
            response = Math.floor(Math.random() * strings.length);
            response = strings[response];

            if (response.includes('[WAIFU]')) {
                var waifu = ctx[1];
                response = response.replace('[WAIFU]', waifu);
            }
        }

        callback(response);
    }
}

module.exports = WaifuCommand;