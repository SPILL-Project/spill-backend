"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.qrcode = exports.client = void 0;
const qrcode = require('qrcode-terminal');
exports.qrcode = qrcode;
const { Client } = require('whatsapp-web.js');
// const client = new Client({
//   puppeteer: {headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions']}
// });
const client = new Client();
exports.client = client;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
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
});
exports.main = main;
//# sourceMappingURL=wa.js.map