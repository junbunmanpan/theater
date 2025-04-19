const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const app = express();
const port = 3000;

// publicフォルダを静的に読み込む
app.use(express.static(path.join(__dirname, 'public')));

// HTTPサーバーを立ち上げる
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// WebSocketサーバーを作成
const wss = new WebSocket.Server({ server });

// WebSocket接続の処理
wss.on('connection', ws => {
  console.log('A client connected');
  
  // メッセージを受け取ったとき
  ws.on('message', message => {
    console.log('Received: %s', message);
    
  // メッセージが "play" のときは全クライアントに転送
  if (message === 'play') {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('play');
      }
    });
  }
});
  
  // クライアントが切断されたとき
  ws.on('close', () => {
    console.log('A client disconnected');
  });
});


