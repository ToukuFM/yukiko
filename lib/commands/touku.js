'use strict';
var Command = require('easy-slackbot').Command;
var ToukuFM = require('node-toukufm-api');
var moment = require('moment-timezone');

class ToukuScheduleCommand extends Command {
    constructor() {
        var commands = [
            'schedule',
            'upcoming',
            'sch',
            'show me the schedule',
        ];
        super(commands);
    }

    handler(data, ctx, slack, callback) {

        var parseResults = function(err, result) {
            if (err == true) {
                callback("Sorry! Something went wrong while downloading " +
                    "the ToukuFM schedule... Please try again in a minute.");
                console.log(err);
                console.log(result);
            }
            else {
                var response = '_*Upcoming shows:*_\n';

                for (var item in result.result) {
                    var showtime = moment.tz(result.result[item].start_time,
                        'YYYY-MM-DD HH:mm:ss', 'UTC');

                    // Build a schedule row
                    response += '*' + showtime.format('HH:mm') + '*: ';
                    response += result.result[item].name + ' with *';
                    response += result.result[item].host + '* _(';
                    response += showtime.fromNow() + ')_\n';
                }
                response += '_All timezones are in UTC. Current time: ' +
                    moment.tz('UTC').format('HH:mm') + ' UTC_';

                callback(response);
            }
        };

        // Check which schedule to get
        var days = parseInt(ctx[1], 10);

        if (days >= 0)
            ToukuFM.get_schedule_days_ahead(days, parseResults);
        else
            ToukuFM.get_schedule(parseResults);
    }
}

class ToukuTeamCommand extends Command {
    constructor() {
        var commands = [
            'team',
            'members',
            'member'
        ];
        super(commands);
    }

    handler(data, ctx, slack, callback) {
        ToukuFM.get_team(function(err, result) {
            if (err == true) {
                callback('Sorry! Something went wrong while downloading ' +
                    'the ToukuFM team... Please try again in a minute.');
                console.log(err);
                console.log(result);
            }
            else {
                var response = '_*Lookie! I found this:*_\n';
                var search = ctx[1] != '' && ctx[1] != null;

                for (var item in result.result) {
                    if (search) {
                        var name = result.result[item].displayname.toLowerCase();
                        var needle = ctx[1].toLowerCase();

                        if (name.indexOf(needle) == -1)
                            continue;
                    }

                    response += '*' + result.result[item].displayname + '*: ';
                    response += 'http://toukufm.com/team/' + result.result[item].id;

                    if (result.result[item].showtext != '')
                        response += ' _(' + result.result[item].showtext + ')_';
                    response += '\n';
                }

                if (response == '_*Lookie! I found this:*_\n')
                    response = 'Sorry, I don\'t know anyone by that name...';
                callback(response);
            }
        });
    }
}

class ToukuNowPlayingCommand extends Command {
    constructor() {
        var commands = [
            'np',
            'nowplaying',
            'now playing',
            'what\'s this song?',
            'what\'s this song',
            'songname'
        ];
        super(commands);
    }

    handler(data, ctx, slack, callback) {
        ToukuFM.get_now_playing(function(err, result) {
            if (err == true) {
                callback('Sorry! Something went wrong while downloading ' +
                    'the current song name... Please try again in a minute.');
                console.log(err);
                console.log(result);
            }
            else {
                var res = '';

                for (var channel in result) {
                    res += 'Now playing on *' + channel + '* with *' +
                        result[channel].listeners + ' listeners* _(On air: ' +
                        result[channel].onair + ')_\n';

                    res += '*Song:* ' + result[channel].title;
                    res += ' _by_ ' + result[channel].artist + '\n';
                    res += '*Album:* ' + result[channel].album + '\n';
                    res += '*Series:* ' + result[channel].series + '\n';
                    res += '*Link:* ' + result[channel].link + '\n';
                }

                callback(res);
            }
        });
    }
}

module.exports.ToukuScheduleCommand = ToukuScheduleCommand;
module.exports.ToukuTeamCommand = ToukuTeamCommand;
module.exports.ToukuNowPlayingCommand = ToukuNowPlayingCommand;