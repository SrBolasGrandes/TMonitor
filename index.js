async function carregar() {
  const res = await fetch("http://localhost:3000/api/user");
  const data = await res.json();

  avatar.src = data.avatar;
  nickname.innerText = data.nickname;
  username.innerText = "@" + data.username;
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
