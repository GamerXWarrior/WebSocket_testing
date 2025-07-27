const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', function connection(ws) {
  console.log('🔌 New client connected');
  clients.push(ws);

  ws.on('message', function incoming(message) {
    console.log('📨 Received:', message);

    // Broadcast to all other connected clients
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
    clients = clients.filter(client => client !== ws);
  });

  ws.on('error', (err) => {
    console.log('⚠️ WebSocket error:', err);
  });
});

console.log('🚀 WebSocket server running on ws://localhost:8080');