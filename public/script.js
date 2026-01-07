const username = window.location.pathname.replace("/", "");

async function carregar() {
  const res = await fetch(`/api/user/${username}`);
  const data = await res.json();

  avatar.src = data.avatar;
  nickname.innerText = data.nickname;
  document.getElementById("username").innerText = "@" + data.username;

  seguidores.innerText = data.seguidores;
  videos.innerText = data.videos;
  curtidas.innerText = data.curtidas;

  const live = document.getElementById("live");
  if (data.isLive) {
    live.innerText = "🔴 Ao vivo";
    live.className = "online";
  } else {
    live.innerText = "⚫ Offline";
    live.className = "offline";
  }
}

carregar();
setInterval(carregar, 30000);
