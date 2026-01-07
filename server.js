const express = require("express");
const TikTokScraper = require("tiktok-scraper");
const app = express();

const USERNAME = "tiktok"; // coloque o @ aqui

app.get("/api/user", async (req, res) => {
  try {
    const user = await TikTokScraper.getUserProfileInfo(USERNAME);

    res.json({
      username: user.user.uniqueId,
      nickname: user.user.nickname,
      avatar: user.user.avatarLarger,
      seguidores: user.stats.followerCount,
      curtidas: user.stats.heartCount,
      videos: user.stats.videoCount,
      seguindo: user.stats.followingCount,
      isLive: user.user.isLive || false
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
