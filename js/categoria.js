const API = "https://script.google.com/macros/s/AKfycbxqZ-T43eqzijcVYaOTDjXGQAWIVSwLaKVruhOnYyVSXKr7XFRE0qG2O5x5C2ZVhHpdLA/exec";
const params = new URLSearchParams(window.location.search);
const tipo = params.get("tipo");

document.getElementById("tituloCategoria").innerText = "Despesas: " + tipo;

async function carregarSolicitacoes() {
  const res = await fetch(API + "?tipo=" + tipo);
  const dados = await res.json();

  const lista = document.getElementById("lista");

  dados.forEach(item => {
    lista.innerHTML += `
      <div class="card">
        <h3>Ocorrência ${item.ocorrencia}</h3>
        <p><b>Número NF:</b> ${item.numeroNF || "—"}</p>
        <p><b>Valor:</b> R$ ${item.valorNF}</p>
        ${item.linkNF ? `<a href="${item.linkNF}" target="_blank">Ver Documento</a>` : ""}
      </div>
    `;
  });
}

carregarSolicitacoes();

document.getElementById("search").addEventListener("input", () => {
  const txt = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(txt) ? "block" : "none";
  });
});

function voltar() {
    window.location.href = "index.html"; 
}

