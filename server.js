const express = require("express");
const path = require("path");
const TikTokScraper = require("tiktok-scraper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/user/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const user = await TikTokScraper.getUserProfileInfo(username);

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
    res.status(500).json({ error: "Usuário não encontrado" });
  }
});

/* rota dinâmica /{username} */
app.get("/:username", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "monitor.html"));
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
