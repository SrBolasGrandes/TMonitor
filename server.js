const express = require("express");
const path = require("path");
const { chromium } = require("playwright");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static("public"));

let browser;

// inicia o navegador uma vez só
async function getBrowser() {
  if (!browser) {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage"
      ]
    });
  }
  return browser;
}

// API
app.get("/api/user/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.goto(`https://www.tiktok.com/@${username}`, {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });

    await page.waitForTimeout(3000);

    const data = await page.evaluate(() => {
      const el = document.querySelector("#SIGI_STATE");
      if (!el) return null;

      const state = JSON.parse(el.textContent);
      const user = Object.values(state.UserModule.users)[0];
      const stats = Object.values(state.UserModule.stats)[0];

      return {
        username: user.uniqueId,
        nickname: user.nickname,
        avatar: user.avatarLarger,
        seguidores: stats.followerCount,
        curtidas: stats.heartCount,
        videos: stats.videoCount,
        isLive: user.isLive === true
      };
    });

    await page.close();

    if (!data) {
      return res.json({ error: "Não foi possível coletar dados" });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.json({ error: "Erro ao acessar o TikTok" });
  }
});

// rota dinâmica /{usuario}
app.get("/:username", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "monitor.html"));
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
