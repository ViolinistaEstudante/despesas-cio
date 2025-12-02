const API = "https://script.google.com/macros/s/AKfycbxqZ-T43eqzijcVYaOTDjXGQAWIVSwLaKVruhOnYyVSXKr7XFRE0qG2O5x5C2ZVhHpdLA/exec";

async function carregarCategorias() {
  const res = await fetch(API + "?tipo=categorias");
  const categorias = await res.json();

  const container = document.getElementById("categorias");

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

document.getElementById("search").addEventListener("input", () => {
  const txt = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(txt) ? "block" : "none";
  });
});

async function carregarMarquee() {
    const marquee = document.getElementById("marqueeMsg");

    try {
        const resposta = await fetch("https://script.google.com/macros/s/AKfycbxqZ-T43eqzijcVYaOTDjXGQAWIVSwLaKVruhOnYyVSXKr7XFRE0qG2O5x5C2ZVhHpdLA/exec");
        const dados = await resposta.json();

        // supondo que seu JSON retorna algo como:
        // [{titulo: "...", descricao:"..."}, {...}]
        
        if (dados && dados.length > 0) {
            // gera um texto com os títulos
            const lista = dados.map(item => item.titulo).join(" • ");

            marquee.textContent = lista;
        } else {
            marquee.textContent = "Nenhum tópico encontrado...";
        }

    } catch (erro) {
        marquee.textContent = "Erro ao carregar tópicos...";
        console.error("Erro no marquee:", erro);
    }
}

// inicia
carregarMarquee();

function gerarNomeImagem(tipoDespesa) {
  return tipoDespesa
    .trim()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[/]/g, "")                              // remove barra
    .replace(/\s+/g, "-") + ".png";                   // troca espaço por -
}

const nomeImg = gerarNomeImagem(item.tipoDespesa);
const caminhoImg = `assets/img/${nomeImg}`;


