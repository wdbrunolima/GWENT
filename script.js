// Moral: +1 às OUTRAS unidades do campo, conforme a regra solicitada.
// Ordem: clima → laço do grupo → moral → corneta/líder. Heróis são imunes.
const rowNames = ['Corpo a Corpo', 'À Distância', 'Cerco'];
const climates = {
  frost: { label: '❄️ Geada', rows: [0] },
  fog: { label: '🌫️ Névoa', rows: [1] },
  rain: { label: '🌧️ Chuva', rows: [2] },
  storm: { label: '⛈️ Tempestade', rows: [0, 1] }
};
function initialState() {
  return { selectedRow: 0, nextId: 1, nextGroup: 1, cards: [],
    rows: [{ horn: false }, { horn: false }, { horn: false }],
    weather: [], leaderRow: null, gems: [true, true], selectedCardId: null };
}
let state = initialState();
const board = document.getElementById('board');
const has = (card, effect) => card.effects.includes(effect);
const weatherFor = row => state.weather.filter(w => climates[w].rows.includes(row));
function cardScore(card) {
  if (has(card, 'hero')) return card.value;
  let value = weatherFor(card.row).length ? 1 : card.value;
  if (has(card, 'bond') && card.groupId !== null) {
    value *= state.cards.filter(c => c.row === card.row && c.groupId === card.groupId && has(c, 'bond') && !has(c, 'hero')).length;
  }
  value += state.cards.filter(c => c.id !== card.id && has(c, 'morale') && !has(c, 'hero')).length;
  if (state.rows[card.row].horn || state.leaderRow === card.row) value *= 2;
  return value;
}
function calculateRow(row) {
  return state.cards.filter(c => c.row === row).reduce((sum, c) => sum + cardScore(c), 0);
}
function setEffect(card, effect) {
  if (has(card, effect)) {
    card.effects = card.effects.filter(e => e !== effect);
    if (effect === 'bond') card.groupId = null;
  } else if (effect === 'hero') {
    card.effects = ['hero'];
    card.groupId = null;
  } else {
    card.effects = card.effects.filter(e => e !== 'hero');
    card.effects.push(effect);
    if (effect === 'bond') card.groupId = state.nextGroup++;
  }
}
function addBondCopy(card) {
  if (!has(card, 'bond') || has(card, 'hero')) return;
  const copy = { id: state.nextId++, row: card.row, value: card.value,
    effects: [...card.effects], groupId: card.groupId };
  state.cards.splice(state.cards.indexOf(card) + 1, 0, copy);
  return copy;
}
function cardMarkup(card) {
  return `<button class="card ${has(card, 'hero') ? 'hero-card' : ''}" data-card="${card.id}" aria-label="Carta ${card.value}, pontuação ${cardScore(card)}. Editar efeitos">
    <span class="card-numbers"><span class="card-value">${cardScore(card)}</span><small>base ${card.value}</small></span>
    <span class="card-icons">${has(card, 'bond') ? '🔒' : ''}${has(card, 'morale') ? '❤️' : ''}${has(card, 'hero') ? '👑' : ''}</span>
  </button>`;
}
function render() {
  board.innerHTML = '';
  rowNames.forEach((name, rowIndex) => {
    const row = document.createElement('section');
    const weather = weatherFor(rowIndex);
    row.className = `row ${weather.length ? 'weather-affected weather-' + weather[weather.length - 1] : ''} ${state.selectedRow === rowIndex ? 'selected-row' : ''}`;
    const cards = state.cards.filter(c => c.row === rowIndex);
    const seen = new Set();
    const markup = cards.map(card => {
      if (!has(card, 'bond')) return cardMarkup(card);
      if (seen.has(card.groupId)) return '';
      seen.add(card.groupId);
      return `<div class="bond-group"><span class="group-label">🔒 Grupo ${card.groupId}</span>${cards.filter(c => c.groupId === card.groupId && has(c, 'bond')).map(cardMarkup).join('')}</div>`;
    }).join('');
    row.innerHTML = `<div class="row-head"><div class="row-name">${name}</div>
      <div class="row-score">${calculateRow(rowIndex)}</div>
      <div class="row-controls"><button class="row-control ${state.selectedRow === rowIndex ? 'active' : ''}" data-select-row="${rowIndex}" aria-pressed="${state.selectedRow === rowIndex}">+ carta</button>
      <button class="row-control ${state.rows[rowIndex].horn ? 'active' : ''}" data-horn="${rowIndex}" aria-pressed="${state.rows[rowIndex].horn}" aria-label="Corneta em ${name}">🎺 ×2</button></div>
      ${weather.length ? `<div class="row-status">${weather.map(w => climates[w].label).join(' · ')}</div>` : ''}
      ${state.leaderRow === rowIndex ? '<div class="leader-status">👑 Líder ×2</div>' : ''}</div>
      <div class="cards">${markup || '<div class="empty">Nenhuma carta</div>'}</div>
      <div class="row-total">${cards.length} carta${cards.length === 1 ? '' : 's'}</div>`;
    board.appendChild(row);
  });
  document.getElementById('totalScore').textContent = [0, 1, 2].reduce((sum, r) => sum + calculateRow(r), 0);
  document.getElementById('weatherBtn').classList.toggle('active', state.weather.length > 0);
  document.getElementById('leaderBtn').classList.toggle('active', state.leaderRow !== null);
  document.querySelectorAll('[data-weather]').forEach(b => {
    const active = b.dataset.weather === 'none' ? !state.weather.length : state.weather.includes(b.dataset.weather);
    b.classList.toggle('active', active); b.setAttribute('aria-pressed', active);
  });
  document.querySelectorAll('[data-leader]').forEach(b => {
    const active = b.dataset.leader === 'none' ? state.leaderRow === null : state.leaderRow === Number(b.dataset.leader);
    b.classList.toggle('active', active); b.setAttribute('aria-pressed', active);
  });
  document.querySelectorAll('.gem').forEach(b => {
    b.classList.toggle('active', state.gems[Number(b.dataset.gem)]);
    b.setAttribute('aria-pressed', state.gems[Number(b.dataset.gem)]);
  });
}
let lastFocus = null;
function showModal(id) {
  closeAllModals();
  lastFocus = document.activeElement;
  const modal = document.getElementById(id);
  modal.classList.remove('hidden');
  modal.querySelector('button').focus();
}
function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  if (lastFocus?.isConnected) lastFocus.focus();
}
function updateCardModal() {
  const card = state.cards.find(c => c.id === state.selectedCardId);
  if (!card) return;
  document.getElementById('modalNumber').textContent = card.value;
  document.querySelectorAll('[data-effect]').forEach(b => {
    b.classList.toggle('active', has(card, b.dataset.effect));
    b.setAttribute('aria-pressed', has(card, b.dataset.effect));
  });
  document.getElementById('bondPlus').hidden = !has(card, 'bond');
  document.getElementById('cardNote').textContent = `Pontuação atual: ${cardScore(card)}. ` + (has(card, 'bond') ? `Grupo ${card.groupId}: “Laço forte +1” adiciona uma cópia abaixo desta carta, no mesmo grupo.` : 'Ative Laço forte para criar um grupo. Moral dá +1 às outras cartas do campo, exceto heróis.');
}
function openCardModal(id) {
  state.selectedCardId = id;
  updateCardModal(); showModal('cardModal');
}
board.addEventListener('click', event => {
  const b = event.target.closest('button');
  if (!b) return;
  if (b.hasAttribute('data-select-row')) { state.selectedRow = Number(b.dataset.selectRow); render(); }
  if (b.hasAttribute('data-horn')) { const r = Number(b.dataset.horn); state.rows[r].horn = !state.rows[r].horn; render(); }
  if (b.hasAttribute('data-card')) openCardModal(Number(b.dataset.card));
});
document.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => {
  state.cards.push({ id: state.nextId++, row: state.selectedRow, value: Number(b.dataset.add), effects: [], groupId: null }); render();
}));
document.querySelectorAll('[data-effect]').forEach(b => b.addEventListener('click', () => {
  const card = state.cards.find(c => c.id === state.selectedCardId);
  if (!card) return;
  setEffect(card, b.dataset.effect); render(); updateCardModal();
}));
document.getElementById('bondPlus').addEventListener('click', () => {
  const card = state.cards.find(c => c.id === state.selectedCardId);
  if (!card) return;
  addBondCopy(card); closeAllModals(); render();
});
document.getElementById('deleteCard').addEventListener('click', () => {
  state.cards = state.cards.filter(c => c.id !== state.selectedCardId);
  state.selectedCardId = null; closeAllModals(); render();
});
document.querySelectorAll('[data-weather]').forEach(b => b.addEventListener('click', () => {
  const w = b.dataset.weather;
  state.weather = w === 'none' ? [] : state.weather.includes(w) ? state.weather.filter(x => x !== w) : [...state.weather, w];
  render(); closeAllModals();
}));
document.querySelectorAll('[data-leader]').forEach(b => b.addEventListener('click', () => {
  state.leaderRow = b.dataset.leader === 'none' ? null : Number(b.dataset.leader);
  render(); closeAllModals();
}));
document.querySelectorAll('.gem').forEach(b => b.addEventListener('click', () => {
  const i = Number(b.dataset.gem); state.gems[i] = !state.gems[i]; render();
}));
document.getElementById('weatherBtn').addEventListener('click', () => showModal('weatherModal'));
document.getElementById('leaderBtn').addEventListener('click', () => showModal('leaderModal'));
document.querySelectorAll('.close').forEach(b => b.addEventListener('click', closeAllModals));
document.querySelectorAll('.modal').forEach(m => {
  m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
  m.setAttribute('aria-label', m.querySelector('.modal-title').textContent);
  m.addEventListener('click', e => { if (e.target === m) closeAllModals(); });
});
document.addEventListener('keydown', e => {
  const modal = document.querySelector('.modal:not(.hidden)');
  if (!modal) return;
  if (e.key === 'Escape') closeAllModals();
  if (e.key === 'Tab') {
    const buttons = [...modal.querySelectorAll('button')].filter(b => !b.hidden && !b.disabled);
    const first = buttons[0], last = buttons[buttons.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Reiniciar a partida? Todas as cartas e efeitos serão removidos.')) return;
  state = initialState(); closeAllModals(); render();
});
render();
