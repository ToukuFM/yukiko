'use strict';
var Command = require('easy-slackbot').Command;
var Imoji = require('imoji-node');

var imojiClient = new Imoji({
    apiKey: '',
    apiSecret: ''
});

class ImojiCommand extends Command {
    constructor() {
        var commands = [
            'imoji',
            'emoji',
        ];
        super(commands);
    }

    handler(data, ctx, slack, callback) {
        var query = data.text.split(' ');
        query.splice(0, 1);
        query = query.join(' ');

        imojiClient.search({
                query: query
            })
            .then(function(randomResults) {
                if (randomResults.results.length > 0) {
                    callback(randomResults.results[0].urls.png.full);
                }
                else {
                    callback('Sorry, I couldn\'t quite find anything like that...');
                }
            });
    }
}

module.exports = ImojiCommand;
