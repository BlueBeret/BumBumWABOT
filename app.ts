import {  Client, LocalAuth} from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { CommandHandler } from "./src/bot/commandsHandler";

const client = new Client({
    authStrategy: new LocalAuth,
    puppeteer: {
        headless: true,
        executablePath: "/usr/bin/google-chrome-stable",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    }
});
const prefix = 'bb'
const command_handler = new CommandHandler(prefix, client);




client.on('qr', (qr:string) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg=> {
    if (msg.body.startsWith(prefix)) {
        command_handler.handleCommand(msg)
    }
    else {
        msg.reply("I don't understand what you mean. Try using the prefix: " + prefix)
    }
});

client.initialize();