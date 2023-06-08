const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');

const client = new Client({
  puppeteer: {headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions']}
});

// const client = new Client();

const main = async () => {

    await client.on('qr', (qr: any) => {
            qrcode.generate(qr, {small: true});
    });

    client.on('ready', () => {
            console.log('Client is ready!');
    });

    // client.on('message', async msg => {
    //         const args = msg.body.split(' ');
    //         const command = args[0].toLowerCase();

    //         switch (command){

    //             case '/test':
    //                 msg.reply('Hello');
    //                 break;

    //             // default:
    //             //     msg.reply('Masukan sesuai format yang ada');
    //         }

    //     });

    client.initialize();

}

// module.exports = {client, qrcode, main};

// exports client, qrcode, main
export {client, qrcode, main};