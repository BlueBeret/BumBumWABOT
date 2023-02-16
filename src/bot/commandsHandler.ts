
import WAWebJS, { Client, List } from "whatsapp-web.js";
var spawn = require('child_process').spawn;

type command = {
    [key: string]: Function
}

class CommandHandler {
    prefix: string;
    client: Client;
    commands: command;
    constructor(prefix: string, client: any = null) {
        this.prefix = prefix;
        this.client = client;
        this.commands = {};
        this.commands['ping'] = this.pingHandler;
        this.commands['say'] = this.sayHandler;
        this.commands['ig'] = this.bbigHandler;
        this.commands['cputemp'] = this.cputempHandler;
        this.commands['sticker'] = this.stickerHandler;
    }

    isOwner(owner: string): boolean {
        return (owner === process.env.OWNER)
    }

    handleCommand(msg: WAWebJS.Message): void {
        if (msg.body.startsWith(this.prefix)) {
            const command = msg.body.split(' ')[0].slice(this.prefix.length);
            const args = msg.body.split(' ').slice(1);
            console.log("command:", command, "args:", args)
            if (this.commands[command]) {
                this.commands[command](msg, args);
            }
        }
    }

    pingHandler(msg: WAWebJS.Message, args: Array<string>): void {
        msg.react('👍');
    }

    sayHandler(msg: WAWebJS.Message, args: Array<string>): void {
        msg.reply(args.join(' '));
    }

    bbigHandler(msg: WAWebJS.Message, args: Array<string>): void {
    }

    cputempHandler(msg: WAWebJS.Message, args: Array<string>): void {
        if (msg.from === process.env.OWNER) {
            msg.react('👍')
            let temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp']);

            temp.stdout.on('data', function (data: number) {
                msg.reply('Result: ' + data / 1000 + ' degrees Celcius');
            });
            return
        }
        msg.react('👎')
        msg.reply("You are not mighty enough to use this command!")
    }

    async stickerHandler(msg: WAWebJS.Message, args: Array<string>) {
        // resend user image as sticker
        if (!msg.hasMedia) {
            msg.reply("Please attach an image :D")
            return
        }
        const media = await msg.downloadMedia()
        ;(await msg.getChat()).sendMessage(media, {sendMediaAsSticker: true})

        
    }
}
export { CommandHandler };