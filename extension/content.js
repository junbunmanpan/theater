// WebSocketでサーバーに接続
const socket = new WebSocket(
  location.hostname === "localhost"
    ? "ws://localhost:3000"
    : "wss://theater-8xcq.onrender.com"
);

// ログイン確認用
socket.addEventListener('open', () => {
  console.log("🔌 Connected to WebSocket server");
});

// メッセージを受け取ったときの処理
socket.addEventListener('message', (event) => {
  const message = event.data;
  console.log("📩 Message received:", message);

  if (message === 'play') {
    tryToPlay();
  }
});

// 再生ボタンを探してクリックする関数
function tryToPlay() {
  const playButton = document.querySelector('a[data-testid="dp-atf-play-button"]');
  if (playButton) {
    playButton.click();
    console.log("✅ Play button clicked!");
  } else {
    console.log("⏳ Play button not found, retrying...");
    setTimeout(tryToPlay, 1000);  // 1秒ごとに再試行
  }
}

socket.addEventListener("message", (event) => {
  if (event.data === "play") {
    let countdown = 5;
    const interval = setInterval(() => {
      console.log(`🎬 再生まで: ${countdown}秒`);
      if (countdown === 0) {
        clearInterval(interval);
        tryToPlay();
      }
      countdown--;
    }, 1000);
  }
});
