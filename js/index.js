const API = "https://script.google.com/macros/s/AKfycbxqZ-T43eqzijcVYaOTDjXGQAWIVSwLaKVruhOnYyVSXKr7XFRE0qG2O5x5C2ZVhHpdLA/exec";

/* SIDEBAR */
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
  document.body.classList.toggle("sidebar-open");
}

/* CATEGORIAS */
async function carregarCategorias() {
  const res = await fetch(API + "?tipo=categorias");
  const categorias = await res.json();
  const container = document.getElementById("categorias");

  container.innerHTML = "";

  categorias.forEach(cat => {
    container.innerHTML += `
      <div class="card" onclick="abrirCategoria('${cat}')">
        <img src="img/${cat}.png" alt="${cat}">
        <h3>${cat}</h3>
        <span class="tag">Ver despesas</span>
      </div>
    `;
  });
}

function abrirCategoria(tipo) {
  window.location.href = `categoria.html?tipo=${tipo}`;
}

carregarCategorias();

/* PESQUISA */
document.getElementById("search").addEventListener("input", () => {
  const txt = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll(".card").forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(txt) ? "block" : "none";
  });
});

/* MARQUEE */
async function carregarMarquee() {
  const marquee = document.getElementById("marqueeMsg");

  try {
    const resposta = await fetch(API);
    const dados = await resposta.json();

    marquee.textContent = dados.length
      ? dados.map(i => i.titulo).join(" • ")
      : "Nenhum tópico encontrado...";
  } catch {
    marquee.textContent = "Erro ao carregar tópicos...";
  }
}

carregarMarquee();

/* DASHBOARD */
function dashboard() {
  window.location.href = "dashboard.html";
}

function toggleSubmenu(element) {
  const menuItem = element.parentElement;

  // fecha outros submenus (opcional)
  document.querySelectorAll(".menu-item").forEach(item => {
    if (item !== menuItem) item.classList.remove("active");
  });

  menuItem.classList.toggle("active");
}