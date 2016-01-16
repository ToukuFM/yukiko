'use strict';
var Command = require('easy-slackbot').Command;
var extIP = require('external-ip')();

class IpCommand extends Command {
    constructor() {
        var commands = [
            'ip',
            'showip',
            'what\'s your ip?',
            'what\'s your ip'
        ];
        super(commands);
    }

    handler(data, ctx, slack, callback) {
        extIP(function(err, ip) {
            if (err) {
                callback('Uhhh... Something has gone wrong...' +
                    ' Maybe later, okay? :disappointed:');
            }
            else {
                callback('*Don\'t abuse it*, okay? Here: ' + ip);
            }
        });
    }
}

module.exports = IpCommand;