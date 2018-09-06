// imports
const amqp = require('amqplib/callback_api');
const Koa = require('koa');

// constants
const rabbitmqUrl = 'amqp://root:toor@localhost:5672';

function hubungiKoki() {
    return new Promise((resolve, reject) => {
        amqp.connect(rabbitmqUrl, function (error, conn) {
            if (error) {
                return reject(error);
            }
            conn.createChannel(function (error, ch) {
                if (error) {
                    return reject(error);
                }
                ch.sendToQueue('pesanMakanan', new Buffer('Es teh dua'));
                ch.consume('pesananDiterima', (message) => {
                    return resolve(String(message.content));
                });
            });
        });
    });
}

// init koa
const app = new Koa();
app.use(async ctx => {
    console.log('[resepsionis] accept httpRequest');
    try {
        const response = await hubungiKoki();
        ctx.body = response;
    } catch (error) {
        console.error('[resepsionis] encounter error');
        console.error(error);
        ctx.status = 400;
    }
});

app.listen(3000);