const username = window.location.pathname.split("/")[1];

async function carregar() {
  try {
    const res = await fetch(`/api/user/${username}`);
    const data = await res.json();

    if (data.error) {
      document.body.innerHTML = `<h2>${data.error}</h2>`;
      return;
    }

    document.getElementById("avatar").src = data.avatar;
    document.getElementById("nickname").innerText = data.nickname;
    document.getElementById("username").innerText = "@" + data.username;

    document.getElementById("seguidores").innerText = data.seguidores;
    document.getElementById("videos").innerText = data.videos;
    document.getElementById("curtidas").innerText = data.curtidas;

    const live = document.getElementById("live");
    if (data.isLive) {
      live.innerText = "🔴 Ao vivo";
      live.className = "online";
    } else {
      live.innerText = "⚫ Offline";
      live.className = "offline";
    }
  } catch {
    document.body.innerHTML = "<h2>Erro ao carregar dados</h2>";
  }
}

carregar();
setInterval(carregar, 30000);
