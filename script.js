const serverIP = "play.PuffySMP.org";

async function updateServerStatus() {
  const el = document.getElementById("server-status");

  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${serverIP}`);
    const data = await res.json();

    if (!data.online) {
      el.innerHTML = `
        <span class="w-3 h-3 bg-red-500 rounded-full"></span>
        Server Offline
      `;
      return;
    }

    const players = data.players?.online ?? 0;
    const max = data.players?.max ?? "?";

    el.innerHTML = `
      <span class="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
      ${players} / ${max} players online
    `;

  } catch (err) {
    el.innerHTML = `
      <span class="w-3 h-3 bg-yellow-400 rounded-full"></span>
      Unable to check status
    `;
  }
}

updateServerStatus();

setInterval(updateServerStatus, 5000);