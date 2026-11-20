const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 3000);
const app = express();
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const players = new Map();

function safeSend(ws, payload) {
  if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(payload));
}
function broadcast(payload, except) {
  const data = JSON.stringify(payload);
  for (const client of wss.clients) {
    if (client !== except && client.readyState === WebSocket.OPEN) client.send(data);
  }
}
function publicPlayers() {
  return [...players.values()].map(({ id, name, x, z, color }) => ({ id, name, x, z, color }));
}

wss.on("connection", (ws) => {
  const id = crypto.randomUUID();
  const palette = ["#39a0ed", "#f4a261", "#90be6d", "#c77dff", "#ff6b6b"];
  const player = {
    id,
    name: `Warga-${id.slice(0, 4)}`,
    x: Math.random() * 8 - 4,
    z: Math.random() * 8 - 4,
    color: palette[Math.floor(Math.random() * palette.length)]
  };
  players.set(id, player);

  safeSend(ws, { type: "welcome", id, players: publicPlayers() });
  broadcast({ type: "player_joined", player }, ws);

  ws.on("message", (raw) => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch { return; }

    if (msg.type === "move") {
      const x = Number(msg.x), z = Number(msg.z);
      if (!Number.isFinite(x) || !Number.isFinite(z)) return;
      player.x = Math.max(-45, Math.min(45, x));
      player.z = Math.max(-45, Math.min(45, z));
      broadcast({ type: "player_moved", player }, ws);
    }

    if (msg.type === "rename" && typeof msg.name === "string") {
      player.name = msg.name.trim().slice(0, 18) || player.name;
      broadcast({ type: "player_moved", player });
    }

    if (msg.type === "chat" && typeof msg.text === "string") {
      const text = msg.text.trim().slice(0, 180);
      if (text) broadcast({ type: "chat", name: player.name, text, at: Date.now() });
    }
  });

  ws.on("close", () => {
    players.delete(id);
    broadcast({ type: "player_left", id });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Indonesia Virtual World running on port ${PORT}`);
});
