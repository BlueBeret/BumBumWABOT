
import WAWebJS, { Client, List } from "whatsapp-web.js";

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
        this.commands['bbig'] = this.bbigHandler;
    }

    handleCommand(msg: WAWebJS.Message): void {
        if (msg.body.startsWith(this.prefix)) {
            const command = msg.body.split(' ')[0].slice(this.prefix.length);
            const args = msg.body.split(' ').slice(1);
            console.log("command:", command, "args:", args)
            if (this.commands[command]) {
                this.commands[command](msg,args);
            }
        }
    }

    pingHandler(msg: WAWebJS.Message, args:Array<string>): void {
        msg.react('👍');
    }

    sayHandler( msg: WAWebJS.Message, args:Array<string>): void {
        msg.reply(args.join(' '));
    }

    bbigHandler(msg: WAWebJS.Message, args: Array<string>): void {
    }
}
export { CommandHandler };