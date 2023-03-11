# chatroom-with-nodejs

This is a Node.js implementation of a TCP-based chatroom. The chatroom allows multiple clients to connect to a server, join a chat session, and communicate with each other through text messages. 

The chatroom uses 
- TCP protocol (reliable data transmission) 
- Node.js(event-driven programming) 

We use 'net' and 'events' modules for handling client-server communication. 

The chatroom also supports broadcasting messages to all connected clients.