'use strict';
var Command = require('easy-slackbot').Command;

class SayCommand extends Command {
    constructor() {
        super('say');
    }

    handler(data, ctx, slack, callback) {
        var response;

        if (data.text.split('!say ')[1]) response = data.text.split('!say ')[1];
        else if (data.text.split('say ')[1]) response = data.text.split('say ')[1];
        else response = "Huh? I didn't quite catch that...";
        callback(response);
    }
}

module.exports = SayCommand;