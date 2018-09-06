# Balasan sang Kelinci

Proof of concept, using Koa as API Gateway that encapsulate pub/sub messaging system using RabbitMQ

# Why

I want to have microservices which is literally decoupled from each others. Thus, the API Gateway doesn't have to know the location of other services. All communication are handled by the messaging system.

However, this introduce a new problem as most clients are already built to handle request/reply protocol.

# The Approach

I make 2 services. `resepsionis`, that act as API Gateway, and `koki` that act as internal service.

Whenever the `resepsionis` got any http request from client, it will publish a message `Es teh dua` to `pesanMakanan` queue.

`koki` listen to `pesanMakanan` queue and publish the reply (i.e: `Es teh dua maPuluhRebu which is literally goban`) to `pesananDiterima` queue.

Still in the same request handler, `resepsionis` listen to the `pesananDiterima` queue and yield the message as http response.

Thus, `koki` and `resepsionis` doesn't have to know each other. Furthermore, the client doesn't have to implement `pub/sub` mechanism by itself (i.e: the old-school AJAX Jquery will serve well).

# Try it

* Invoke `npm install`
* Create `pesanMakanan` and `pesananDiterima` queue in your rabbitMq. (I use this connection string: `amqp://root:toor@localhost:5672`, but feel free to change it).
* Run `koki` by invoking `node koki.js`
* Run `resepsionis` by invoking `resepsionis.js`
* Open browser/postman, send any http request to  `http://localhost:3000`, and you will get `Es teh dua maPuluhRebu which is literally goban`