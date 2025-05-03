const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const log = `${new Date().toISOString()} - ${ip}\n`;
  fs.appendFileSync('ips.txt', log);  // Renderでは永続化されないことに注意！

  console.log(log);  // 確認用
  res.send('アクセスありがとう！');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`サーバー起動中 on port ${port}`);
});
