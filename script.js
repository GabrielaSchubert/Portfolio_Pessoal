function atualizarRelogio() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");
  document.getElementById("clock").textContent = `${horas}:${minutos}:${segundos}`;
}

setInterval(atualizarRelogio, 1000);

atualizarRelogio();

function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains("dark");

  if (isDark) {
    body.classList.remove("dark");
    body.classList.add("light");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
  }
}
