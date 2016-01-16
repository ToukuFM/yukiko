'use strict';
var Command = require('easy-slackbot').Command;
var Nyaa = require('node-nyaa-api');

class AnimeCommand extends Command {
    constructor() {
        super('anime');
    }

    static parseAnimeFeed(header, results) {
        var response = '_*' + header + '*_\n';

        var i = 0;

        for (var anime in results) {
            response += results[anime].title + ' - ';
            response += results[anime].link + '\n';
            i++;
            if (i > 6) break;
        }

        if (response == '_*' + header + '*_\n')
            return 'Sorry! I couldn\'t find anything about that... :disappointed:';
        else
            return response;
    }

    static animeHelpString() {
        var response = '_*You can use the following commands for this tool:*_ \n';
        response += '!anime latest\n';
        response += '!anime search [term]\n';
        return response;
    }

    handler(data, ctx, slack, callback) {
        if (ctx[1] != null) {
            var term = ctx[1].toLowerCase();

            if (term == 'latest') {
                Nyaa.get_latest(function(err, results) {
                    if (err) {
                        callback('Sorry! Something went wrong... Please try again' +
                            ' in a few minutes.');
                    }
                    else {
                        var header = 'Here\'s the latest and greatest for you:';
                        callback(AnimeCommand.parseAnimeFeed(header, results));
                    }
                });
            }
            else if (term.startsWith('search ')) {
                console.log(term);
                var searchterm = term.split('search ');
                Nyaa.search(searchterm[1], function(err, results) {
                    if (err) {
                        callback('Sorry! Something went wrong... Please try again' +
                            ' in a few minutes.');
                    }
                    else {
                        var header = 'I found this for you: ';
                        callback(AnimeCommand.parseAnimeFeed(header, results));
                    }
                });
            }
            else {
                callback(AnimeCommand.animeHelpString());
            }
        }
        else {
            callback(AnimeCommand.animeHelpString());
        }
    }
}

module.exports = AnimeCommand;