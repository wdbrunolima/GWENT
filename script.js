// Moral: +1 às OUTRAS unidades do campo, conforme a regra solicitada.
// Ordem: clima → laço do grupo → moral → corneta/líder. Heróis são imunes.
const translations = {
  pt: {
    appTitle: 'Assistente de pontuação', start: 'Começar jogo', coin: 'Moeda', score: 'PONTUAÇÃO',
    addTitle: 'ADICIONAR CARTA', hint: 'Escolha a fileira e toque em um valor. Toque na carta para configurar seus efeitos.',
    exit: 'sair', bond: 'Laço forte', bondPlus: 'Laço forte +1', morale: 'Moral', hero: 'Herói',
    effects: 'Efeitos da carta', delete: 'Excluir carta', weather: 'Clima', none: 'Dia limpo',
    frost: 'Geada', fog: 'Névoa', rain: 'Chuva', storm: 'Tempestade', leader: 'Líder', leaderTitle: 'Efeito do líder',
    weatherNote: 'Apenas um clima por vez. Dia limpo remove o clima e restaura as cores.',
    leaderNote: 'Escolha a fileira que recebe ×2 do líder. Não acumula com a corneta e não afeta heróis. “Nenhum” remove o efeito.',
    noLeader: 'Nenhum', double: 'Dobrar', rows: ['Corpo a Corpo', 'À Distância', 'Cerco'],
    group: 'Grupo', card: 'carta', cards: 'cartas', empty: 'Nenhuma carta', base: 'base', horn: 'Corneta',
    currentScore: 'Pontuação atual', bondNote: '“Laço forte +1” adiciona uma cópia abaixo desta carta, no mesmo grupo.',
    effectNote: 'Ative Laço forte para criar um grupo. Moral dá +1 às outras cartas do campo, exceto heróis.',
    resetQuestion: 'Reiniciar a partida? Todas as cartas e efeitos serão removidos.', reset: 'Reiniciar partida',
    gameOver: 'FIM DE JOGO', lost: 'PERDEU', restart: 'Recomeçar', finishQuestion: 'Finalizar jogo?',
    finishNote: 'Você ficou sem pedras de vida.', yes: 'Sim', no: 'Não', close: 'Fechar', life: 'Pedra de vida',
    castle: 'Castelo', torch: 'Tocha', flip: 'Girar moeda', spinning: 'Girando…', flipAgain: 'Girar novamente',
    coinHint: 'Castelo ou tocha? Gire a moeda.', languageName: 'Português'
  },
  en: {
    appTitle: 'Score assistant', start: 'Start game', coin: 'Coin toss', score: 'SCORE',
    addTitle: 'ADD CARD', hint: 'Choose a row and tap a value. Tap a card to configure its effects.',
    exit: 'exit', bond: 'Tight Bond', bondPlus: 'Tight Bond +1', morale: 'Morale', hero: 'Hero',
    effects: 'Card effects', delete: 'Delete card', weather: 'Weather', none: 'Clear Weather',
    frost: 'Frost', fog: 'Fog', rain: 'Rain', storm: 'Storm', leader: 'Leader', leaderTitle: 'Leader effect',
    weatherNote: 'Only one weather card at a time. Clear Weather removes weather and restores row colors.',
    leaderNote: 'Choose the row that gets ×2 from the leader. Does not stack with a horn or affect heroes. “None” removes the effect.',
    noLeader: 'None', double: 'Double', rows: ['Close Combat', 'Ranged', 'Siege'],
    group: 'Group', card: 'card', cards: 'cards', empty: 'No cards', base: 'base', horn: 'Horn',
    currentScore: 'Current score', bondNote: '“Tight Bond +1” adds a copy below this card in the same group.',
    effectNote: 'Enable Tight Bond to create a group. Morale gives +1 to the other cards on the board, except heroes.',
    resetQuestion: 'Restart the game? All cards and effects will be removed.', reset: 'Restart game',
    gameOver: 'GAME OVER', lost: 'YOU LOST', restart: 'Play again', finishQuestion: 'End game?',
    finishNote: 'You have no life gems left.', yes: 'Yes', no: 'No', close: 'Close', life: 'Life gem',
    castle: 'Castle', torch: 'Torch', flip: 'Flip coin', spinning: 'Spinning…', flipAgain: 'Flip again',
    coinHint: 'Castle or torch? Flip the coin.', languageName: 'English'
  }
};
let language = 'pt';
try { const saved = localStorage.getItem('gwent-language'); if (saved === 'en' || saved === 'pt') language = saved; } catch {}
const t = key => translations[language][key];

const climates = {
  frost: { icon: '❄️', rows: [0] },
  fog: { icon: '🌫️', rows: [1] },
  rain: { icon: '🌧️', rows: [2] },
  storm: { icon: '⛈️', rows: [0, 1] }
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
  return `<button class="card ${has(card, 'hero') ? 'hero-card' : ''}" data-card="${card.id}" aria-label="${t('card')} ${card.value}, ${t('currentScore')} ${cardScore(card)}. ${t('effects')}">
    <span class="card-numbers"><span class="card-value">${cardScore(card)}</span><small>${t('base')} ${card.value}</small></span>
    <span class="card-icons">${has(card, 'bond') ? '🔗 +'  : ''}${has(card, 'morale') ? '❤️' : ''}${has(card, 'hero') ? '👑' : ''}</span>
  </button>`;
}
function render() {
  board.innerHTML = '';
  t('rows').forEach((name, rowIndex) => {
    const row = document.createElement('section');
    const weather = weatherFor(rowIndex);
    row.className = `row ${weather.length ? 'weather-affected weather-' + weather[weather.length - 1] : ''} ${state.selectedRow === rowIndex ? 'selected-row' : ''}`;
    const cards = state.cards.filter(c => c.row === rowIndex);
    const seen = new Set();
    const markup = cards.map(card => {
      if (!has(card, 'bond')) return cardMarkup(card);
      if (seen.has(card.groupId)) return '';
      seen.add(card.groupId);
      return `<div class="bond-group"><span class="group-label">🔗 + ${t('group')}</span>${cards.filter(c => c.groupId === card.groupId && has(c, 'bond')).map(cardMarkup).join('')}</div>`;
    }).join('');
    row.innerHTML = `<div class="row-head"><div class="row-name">${name}</div>
      <div class="row-score">${calculateRow(rowIndex)}</div>
      <div class="row-controls"><button class="row-control ${state.selectedRow === rowIndex ? 'active' : ''}" data-select-row="${rowIndex}" aria-pressed="${state.selectedRow === rowIndex}">+ ${t('card')}</button>
      <button class="row-control ${state.rows[rowIndex].horn ? 'active' : ''}" data-horn="${rowIndex}" aria-pressed="${state.rows[rowIndex].horn}" aria-label="${t('horn')} · ${name}">🎺 ×2</button></div>
      ${weather.length ? `<div class="row-status">${weather.map(w => climates[w].icon + ' ' + t(w)).join(' · ')}</div>` : ''}
      ${state.leaderRow === rowIndex ? `<div class="leader-status">👑 ${t('leader')} ×2</div>` : ''}</div>
      <div class="cards">${markup || `<div class="empty">${t('empty')}</div>`}</div>
      <div class="row-total">${cards.length} ${t(cards.length === 1 ? 'card' : 'cards')}</div>`;
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
let pendingGem = null;
function showModal(id) {
  closeAllModals();
  lastFocus = document.activeElement;
  const modal = document.getElementById(id);
  modal.classList.remove('hidden');
  modal.querySelector('button').focus();
}
function closeAllModals() {
  if (pendingGem !== null) {
    state.gems[pendingGem] = true; pendingGem = null; render();
  }
  stopCoin();
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
  document.getElementById('cardNote').textContent = `${t('currentScore')}: ${cardScore(card)}. ` + t(has(card, 'bond') ? 'bondNote' : 'effectNote');
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
  state.weather = w === 'none' || state.weather.includes(w) ? [] : [w];
  render(); closeAllModals();
}));
document.querySelectorAll('[data-leader]').forEach(b => b.addEventListener('click', () => {
  state.leaderRow = b.dataset.leader === 'none' ? null : Number(b.dataset.leader);
  render(); closeAllModals();
}));
document.querySelectorAll('.gem').forEach(b => b.addEventListener('click', () => {
  const i = Number(b.dataset.gem);
  state.gems[i] = !state.gems[i]; render();
  if (state.gems.every(g => !g)) {
    showModal('finishModal'); pendingGem = i;
  }
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
  if (!confirm(t('resetQuestion'))) return;
  state = initialState(); closeAllModals(); render();
});

let coinTimer = null;
let coinBusy = false;
let coinAngle = 0;
let coinOutcome = null;
function renderCoinText() {
  document.getElementById('coinResult').textContent = coinBusy ? t('spinning') : coinOutcome ? t(coinOutcome) : t('coinHint');
  document.getElementById('flipBtn').textContent = t(coinBusy ? 'spinning' : coinOutcome ? 'flipAgain' : 'flip');
  document.getElementById('flipBtn').disabled = coinBusy;
}
function stopCoin() {
  clearTimeout(coinTimer); coinTimer = null;
  if (coinBusy) {
    coinBusy = false; coinOutcome = null; coinAngle = 0;
    const disc = document.getElementById('coinDisc');
    disc.style.transition = 'none'; disc.style.transform = 'rotateY(0deg)';
    renderCoinText();
  }
}
function setScreen(screen) {
  closeAllModals();
  document.getElementById('menuScreen').hidden = screen !== 'menu';
  document.getElementById('gameScreen').hidden = screen !== 'game';
  document.getElementById('lossScreen').hidden = screen !== 'loss';
  const focusId = screen === 'menu' ? 'startBtn' : screen === 'loss' ? 'restartBtn' : 'resetBtn';
  document.getElementById(focusId).focus();
  window.scrollTo(0, 0);
}
function startGame() {
  closeAllModals(); state = initialState(); render(); setScreen('game');
}
function applyLanguage() {
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  document.title = 'Gwent — ' + t('appTitle');
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-lang]').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === language);
    b.setAttribute('aria-pressed', b.dataset.lang === language);
  });
  document.getElementById('languageLabel').textContent = t('languageName');
  document.querySelectorAll('[data-leader]').forEach(b => {
    b.textContent = b.dataset.leader === 'none' ? t('noLeader') : `🎺 ${t('double')} ${t('rows')[Number(b.dataset.leader)]}`;
  });
  document.querySelectorAll('.close').forEach(b => b.setAttribute('aria-label', t('close')));
  document.querySelectorAll('.modal').forEach(m => m.setAttribute('aria-label', m.querySelector('.modal-title').textContent));
  document.querySelectorAll('.gem').forEach(b => b.setAttribute('aria-label', `${t('life')} ${Number(b.dataset.gem) + 1}`));
  [['resetBtn', 'reset'], ['restartBtn', 'restart'], ['weatherBtn', 'weather'], ['leaderBtn', 'leader']].forEach(([id, key]) => {
    const el = document.getElementById(id); el.setAttribute('aria-label', t(key)); el.title = t(key);
  });
  render(); updateCardModal(); renderCoinText();
}
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
  language = b.dataset.lang;
  try { localStorage.setItem('gwent-language', language); } catch {}
  applyLanguage();
}));
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('exitBtn').addEventListener('click', () => setScreen('menu'));
document.getElementById('restartBtn').addEventListener('click', startGame);
document.getElementById('cancelFinish').addEventListener('click', closeAllModals);
document.getElementById('confirmFinish').addEventListener('click', () => {
  pendingGem = null; setScreen('loss');
});
document.getElementById('coinBtn').addEventListener('click', () => {
  showModal('coinModal'); renderCoinText();
});
document.getElementById('flipBtn').addEventListener('click', () => {
  if (coinBusy) return;
  coinBusy = true; coinOutcome = null; renderCoinText();
  const random = new Uint32Array(1);
  window.crypto.getRandomValues(random);
  const torch = random[0] % 2 === 1;
  coinAngle = Math.ceil(coinAngle / 360) * 360 + 1800 + (torch ? 180 : 0);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reduced ? 150 : 2200;
  const disc = document.getElementById('coinDisc');
  disc.style.transition = `transform ${duration}ms cubic-bezier(.18,.65,.28,1)`;
  disc.style.transform = `rotateY(${coinAngle}deg)`;
  coinTimer = setTimeout(() => {
    coinBusy = false; coinTimer = null; coinOutcome = torch ? 'torch' : 'castle'; renderCoinText();
  }, duration);
});
applyLanguage();
