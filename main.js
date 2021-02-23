'use strict'; // Defines that JavaScript code should be executed in 'strict mode'.

const {token} = require('./config.json'),
    {Client, Collection} = require('eris'),
    {readdirSync} = require('fs'),
    {join} = require("path"),
    Enmap = require('enmap'),
    {green, red, blue} = require('colors'),
    {text} = require('figlet')

class Class extends Client {
    constructor(token) {
        super(token, {messageLimit: 10});
        this.bot = this;
        this.config = require('./config.json');
        this.maincolor = 3092790;
        this.prefix = 'b?';
        this.red = 16711680;
        this.green = 32560;
        this.cool = new Collection();
        this.orange = 16501254;
        this.reloadCommand = function(reload_command) {
            return new Promise((resolve) => {
                const folders = readdirSync(join(__dirname, "commands"));
                for (let i = 0; i < folders.length; i++) {
                    const commands = readdirSync(join(__dirname, "commands", folders[i]));
                    if (commands.includes(`${reload_command}.js`)) {
                        try {
                            delete require.cache[require.resolve(join(__dirname, "commands", folders[i], `${reload_command}.js`))]
                            const command = require(join(__dirname, "commands", folders[i], `${reload_command}.js`));
                            this.commands.delete(command.name)
                            this.commands.set(command.name, command);
                            console.log(`${green('[Commands]')} Reloaded ${reload_command}`)
                            resolve(`> Commande \`${reload_command}\` a été rechargée`)
                        } catch (error) {
                            console.log(`${red('[Commands]')} Failed to load command ${reload_command}: ${error.stack || error}`)
                            resolve(`> Commande \`${reload_command}\` a eu un problème au rechargement!`)
                        }
                    }
                }
                resolve("> Commande pas trouvée!")
            })
        }
        this.footer = 'Copyright 2020 © ArviX#8443';
        this.userdb = new Enmap({
            name: "userdb",
            dataDir: './databases/users/'
        })
        this.cooldown = new Enmap({
            name: "cooldown",
            dataDir: './databases/cooldowns/'
        })
        this.warn = new Enmap({
            name: "warn",
            dataDir: './databases/warns/'
        })
        this.warn_user = new Enmap({
            name: "warn_user",
            dataDir: './databases/warns_users/'
        })
        this.guilddb = new Enmap({
            name: "guilddb",
            dataDir: './databases/guilds/'
        })
        this.ads = new Enmap({
            name: "ads",
            dataDir: './databases/ads/'
        })
        this.adsVerif = new Enmap({
            name: "adsVerif",
            dataDir: "./databases/verif_ads/"
        })
        this.adsReport = new Enmap({
            name: "adsReport",
            dataDir: "./databases/ads_report/"
        })

        try {
            this.launch().then(() => {
                console.log(blue('Tout a été lancé, connexion à Discord...'));
            })
        } catch (e) {
            throw new Error(e)
        }
        this.connect();
    }

    async launch() {
        console.log("Starting the bot");
        this.commands = new Collection();
        this._commandsHandler();
        this._eventsHandler();
        await this._dbHandler();
        text('BalanceTonServeur', {
            font: "Standard"
        }, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            const data2 = data;
            text('Powered By: BalanceTonLien', {
            }, function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log("================================================================================================================================"+"\n"+
                    data2+"\n\n"+ data +"\n"+
                    "================================================================================================================================"

                );
            });

        });
    }

    _commandsHandler() {
        let count = 0;
        const folders = readdirSync(join(__dirname, "commands"));
        for (let i = 0; i < folders.length; i++) {
            const commands = readdirSync(join(__dirname, "commands", folders[i]));
            count = count + commands.length;
            for (const c of commands) {
                try {
                    const command = require(join(__dirname, "commands", folders[i], c));
                    this.commands.set(command.name, command);
                } catch (error) {
                    console.log(`${red('[Commands]')} Failed to load command ${c}: ${error.stack || error}`)
                }
            }
        }
        console.log(`${green('[Commands]')} Loaded ${this.commands.size}/${count} commands`)
    }

    _eventsHandler() {
        let count = 0;
        const files = readdirSync(join(__dirname, "events"));
        files.forEach((e) => {
            try {
                count++;
                const fileName = e.split('.')[0];
                const file = require(join(__dirname, "events", e))
                this.on(fileName, file.bind(null, this));
                delete require.cache[require.resolve(join(__dirname, "events", e))];
            } catch (error) {
                throw new Error(`${red('[Events]')} Failed to load event ${e}: ${error.stack || error}`)
            }
        });
        console.log(`${green('[Events]')} Loaded ${count}/${files.length} events`);
    }

    async _dbHandler() {
        const folders = readdirSync(join(__dirname, "databases"));
        const count = folders.length;
        let load = 0;
        try {
            await this.guilddb.defer;
            load++;
        } catch(error) {
            throw new Error(`${red('[Database]')} Failed to load database guild: ${error.stack || error}`)
        }
        try {
            await this.userdb.defer;
            load++;
        } catch(error) {
            throw new Error(`${red('[Database]')} Failed to load database user: ${error.stack || error}`)
        }
        try {
            await this.ads.defer;
            load++;
        } catch(error) {
            throw new Error(`${red('[Database]')} Failed to load database ads: ${error.stack || error}`)
        }
        try {
            await this.adsVerif.defer;
            load++;
        } catch(error) {
            throw new Error(`${red('[Database]')} Failed to load database adsVerif: ${error.stack || error}`)
        }
        try {
            await this.adsReport.defer;
            load++;
        } catch(error) {
            throw new Error(`${red('[Database]')} Failed to load database adsReport: ${error.stack || error}`)
        }
        try {
            await this.cooldown.defer;
            load++;
        } catch(error) {
            throw new Error(`${red('[Database]')} Failed to load database cooldown: ${error.stack || error}`)
        }
        try {
            await this.warn.defer;
            load++;
        } catch(error) {
            throw new Error(`${red('[Database]')} Failed to load database warn: ${error.stack || error}`)
        }
        try {
            await this.warn_user.defer;
            load++;
        } catch(error) {
            throw new Error(`${red('[Database]')} Failed to load database warn_user : ${error.stack || error}`)
        }

        console.log(`${green('[Databases]')} Loaded ${load}/${count} databases`)
    }


}

module.exports = new Class(token);
