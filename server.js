const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};

channel.on('join',function(id,client) {
    this.clients[id] = client;
    this.subscriptions[id] = (senderId,message) => {
        if(id != senderId){
            this.clients[id].write(message);
        }
    };
    this.on('broadcast',this.subscriptions[id]);
    this.on('shutdown',() => {
        channel.emit('broadcast','','The server has shut down. \n');
        channel.removeAllListeners('broadcast');
    })
});

// Connection listener
const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    channel.emit('join',id,client);
    let buffer = '';
    client.on('data',data => {
        data = data.toString();
        buffer += data;
        if(buffer.endsWith('\n')){
            const message = buffer.trim();
            if(message == 'shutdown\n'){
                channel.emit('shutdown');
            }else {
                channel.emit('broadcast',id,message);
            }
        }
        
    });
    channel.on('leave',function(id){
        channel.removeListener('broadcast', this.subscriptions[id]);
        channel.emit('broadcast',id,`${id} has left the chatroom. \n`);
    });
    client.on('close',() => {
        channel.emit('leave',id);
    });
}).listen(8888);