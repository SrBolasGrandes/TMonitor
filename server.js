const express = require("express");
const path = require("path");
const TikTokScraper = require("tiktok-scraper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/user/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const user = await TikTokScraper.getUserProfileInfo(username);

    if (!user || !user.user) {
      return res.json({ error: "Usuário não encontrado" });
    }

    res.json({
      username: user.user.uniqueId,
      nickname: user.user.nickname,
      avatar: user.user.avatarLarger,
      seguidores: user.stats.followerCount,
      curtidas: user.stats.heartCount,
      videos: user.stats.videoCount,
      isLive: user.user.isLive === true
    });
  } catch (err) {
    console.error(err.message);
    res.json({ error: "Falha ao buscar dados do TikTok" });
  }
});

/* rota dinâmica /{username} */
app.get("/:username", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "monitor.html"));
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
