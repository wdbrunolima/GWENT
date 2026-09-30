const state = {
  selectedRow: 0,
  nextId: 1,
  cards: [
    { id: 1, row: 0, value: 4, effects: [] },
    { id: 2, row: 0, value: 6, effects: [] },
    { id: 3, row: 1, value: 2, effects: [] },
    { id: 4, row: 1, value: 2, effects: [] },
    { id: 5, row: 2, value: 1, effects: [] }
  ],
  rows: [
    { horn: false },
    { horn: false },
    { horn: false }
  ],
  weather: "none",
  leader: "none",
  gems: [true, true],
  selectedCardId: null
};

state.nextId = 6;

const rowNames = ["Corpo a Corpo", "À Distância", "Cerco"];

const board = document.getElementById("board");
const totalScore = document.getElementById("totalScore");

function cardBaseValue(card) {
  return card.value;
}

function cardScore(card) {
  let value = cardBaseValue(card);

  // Heróis não recebem modificadores de carta.
  if (!card.effects.includes("hero")) {
    if (card.effects.includes("morale")) {
      value += 1;
    }

    // Tight Bond é tratado em grupo abaixo.
  }

  return value;
}

function calculateRow(rowIndex) {
  const cards = state.cards.filter(c => c.row === rowIndex);

  // Clima: na versão inicial, o clima reduz a unidade afetada a 1,
  // exceto Heróis. Os tipos são aplicados à(s) fileira(s) correspondente(s).
  const weatherHits =
    state.weather === "frost" && rowIndex === 0 ||
    state.weather === "fog" && rowIndex === 1 ||
    state.weather === "rain" && rowIndex === 2 ||
    state.weather === "storm" && (rowIndex === 0 || rowIndex === 1);

  const grouped = {};

  cards.forEach(card => {
    const key = card.value;
    grouped[key] ??= [];
    grouped[key].push(card);
  });

  let total = 0;

  cards.forEach(card => {
    let value = cardScore(card);

    if (weatherHits && !card.effects.includes("hero")) {
      value = Math.min(value, 1);
    }

    if (card.effects.includes("bond") && !card.effects.includes("hero")) {
      const groupSize = grouped[card.value].filter(c => c.effects.includes("bond")).length;
      value *= Math.max(1, groupSize);
    }

    total += value;
  });

  if (state.rows[rowIndex].horn) {
    total *= 2;
  }

  return total;
}

function render() {
  board.innerHTML = "";

  state.cards.sort((a, b) => a.id - b.id);

  rowNames.forEach((name, rowIndex) => {
    const row = document.createElement("section");
    row.className = "row";

    const score = calculateRow(rowIndex);
    const cards = state.cards.filter(c => c.row === rowIndex);

    row.innerHTML = `
      <div class="row-head">
        <div class="row-name">${name}</div>
        <div class="row-score">${score}</div>
        <div class="row-controls">
          <button class="row-control ${state.selectedRow === rowIndex ? "active" : ""}" data-select-row="${rowIndex}">
            + carta
          </button>
          <button class="row-control ${state.rows[rowIndex].horn ? "active" : ""}" data-horn="${rowIndex}">
            🎺 ×2
          </button>
        </div>
      </div>
      <div class="cards">
        ${
          cards.length
            ? cards.map(card => `
              <button class="card" data-card="${card.id}">
                <span class="card-value">${card.value}</span>
                <span class="card-icons">
                  ${card.effects.includes("bond") ? "🔗" : ""}
                  ${card.effects.includes("morale") ? "❤️" : ""}
                  ${card.effects.includes("hero") ? "👑" : ""}
                </span>
              </button>
            `).join("")
            : `<div class="empty">Nenhuma carta</div>`
        }
      </div>
      <div class="row-total">${cards.length} carta${cards.length === 1 ? "" : "s"}</div>
    `;

    board.appendChild(row);
  });

  totalScore.textContent = state.cards.length
    ? state.cards.reduce((sum, _, i) => {
        // soma cada fileira uma única vez
        return sum;
      }, 0) || [0,1,2].reduce((sum, r) => sum + calculateRow(r), 0)
    : 0;

  document.querySelectorAll("[data-select-row]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.selectedRow = Number(btn.dataset.selectRow);
      render();
    });
  });

  document.querySelectorAll("[data-horn]").forEach(btn => {
    btn.addEventListener("click", () => {
      const row = Number(btn.dataset.horn);
      state.rows[row].horn = !state.rows[row].horn;
      render();
    });
  });

  document.querySelectorAll("[data-card]").forEach(btn => {
    btn.addEventListener("click", () => openCardModal(Number(btn.dataset.card)));
  });
}

document.querySelectorAll("[data-add]").forEach(btn => {
  btn.addEventListener("click", () => {
    state.cards.push({
      id: state.nextId++,
      row: state.selectedRow,
      value: Number(btn.dataset.add),
      effects: []
    });
    render();
  });
});

document.querySelectorAll(".gem").forEach(btn => {
  btn.addEventListener("click", () => {
    const i = Number(btn.dataset.gem);
    state.gems[i] = !state.gems[i];
    btn.classList.toggle("active", state.gems[i]);
  });
});

function openCardModal(id) {
  state.selectedCardId = id;
  const card = state.cards.find(c => c.id === id);
  if (!card) return;

  document.getElementById("modalNumber").textContent = card.value;
  document.querySelectorAll(".effect-btn").forEach(btn => {
    btn.classList.toggle("active", card.effects.includes(btn.dataset.effect));
  });

  document.getElementById("cardModal").classList.remove("hidden");
}

document.querySelectorAll(".effect-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = state.cards.find(c => c.id === state.selectedCardId);
    if (!card) return;

    const effect = btn.dataset.effect;
    const has = card.effects.includes(effect);

    if (has) {
      card.effects = card.effects.filter(e => e !== effect);
    } else {
      // Herói é mutuamente exclusivo com os efeitos de aumento.
      if (effect === "hero") {
        card.effects = card.effects.filter(e => e !== "bond" && e !== "morale");
      }
      card.effects.push(effect);
    }

    btn.classList.toggle("active", !has);
    render();
  });
});

document.getElementById("deleteCard").addEventListener("click", () => {
  state.cards = state.cards.filter(c => c.id !== state.selectedCardId);
  closeAllModals();
  render();
});

document.getElementById("closeModal").addEventListener("click", closeAllModals);

document.getElementById("weatherBtn").addEventListener("click", () => {
  document.getElementById("weatherModal").classList.remove("hidden");
});

document.getElementById("leaderBtn").addEventListener("click", () => {
  document.getElementById("leaderModal").classList.remove("hidden");
});

document.getElementById("closeWeather").addEventListener("click", closeAllModals);
document.getElementById("closeLeader").addEventListener("click", closeAllModals);

document.querySelectorAll("[data-weather]").forEach(btn => {
  btn.addEventListener("click", () => {
    state.weather = btn.dataset.weather;
    closeAllModals();
    render();
  });
});

document.querySelectorAll("[data-leader]").forEach(btn => {
  btn.addEventListener("click", () => {
    state.leader = btn.dataset.leader;
    closeAllModals();
    render();
  });
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Reiniciar a partida?")) return;

  state.selectedRow = 0;
  state.nextId = 1;
  state.cards = [];
  state.rows = [{ horn: false }, { horn: false }, { horn: false }];
  state.weather = "none";
  state.leader = "none";
  state.gems = [true, true];
  state.selectedCardId = null;

  document.querySelectorAll(".gem").forEach(g => g.classList.add("active"));
  render();
});

function closeAllModals() {
  document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));
}

render();
