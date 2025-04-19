const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = 3000;

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
    
    // 受け取ったメッセージをすべてのクライアントに送信
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  
  // クライアントが切断されたとき
  ws.on('close', () => {
    console.log('A client disconnected');
  });
});

// ホストが ENTER を押すと「play」信号を送る
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', () => {
  console.log("📤 Sending play command to all clients...");
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send('play');
    }
  });
});
