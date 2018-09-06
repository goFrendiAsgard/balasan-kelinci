// imports
const amqp = require('amqplib/callback_api');

// constants
const rabbitmqUrl = 'amqp://root:toor@localhost:5672';

amqp.connect(rabbitmqUrl, function (error, conn) {
    if (error) {
        return console.error(error);
    }
    conn.createChannel(function (error, ch) {
        if (error) {
            return console.error('[koki] encounter error');
        }
        ch.consume('pesanMakanan', (message) => {
            console.log('[koki] accept pesananMakanan');
            const pesanan = String(message.content);
            const reply = `${pesanan} maPuluhRebu which is literally goban`;
            console.log(reply);
            ch.sendToQueue('pesananDiterima', new Buffer(reply));
            console.log('[koki] send pesananDiterima');
        });
    });
});