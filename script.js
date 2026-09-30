// Ordem: clima → laço forte → moral → corneta/líder.
// Moral afeta somente as OUTRAS cartas da mesma fileira.
// Heróis não recebem modificadores.

const translations = {
  pt: {
    appTitle: 'Assistente de Pontuação para o Boardgame',
    start: 'Começar novo jogo',
    continueGame: 'Continuar partida anterior',
    coin: 'Moeda',
    score: 'PONTUAÇÃO',
    addTitle: 'ADICIONAR CARTA',
    hint: 'Escolha a fileira e toque em um valor. Toque na carta para configurar seus efeitos.',
    exit: 'sair',
    exitToMenu: 'Sair',
    footerDisclaimer: 'GuentorScore é um aplicativo independente, desenvolvido por terceiros, sem vínculo, afiliação, patrocínio ou endosso de quaisquer empresas, marcas ou propriedades intelectuais de terceiros.',
    bond: 'Laço forte',
    bondPlus: 'Laço forte +1',
    morale: 'Moral',
    hero: 'Herói',
    effects: 'Efeitos da carta',
    delete: 'Excluir carta',
    weather: 'Clima',
    none: 'Dia limpo',
    frost: 'Geada',
    fog: 'Névoa',
    rain: 'Chuva',
    storm: 'Tempestade',
    leader: 'Líder',
    leaderTitle: 'Efeito do líder',
    weatherNote: 'Apenas um clima por vez. Dia limpo remove o clima e restaura as cores.',
    leaderNote: 'Escolha a fileira que recebe ×2 do líder. Não acumula com a corneta e não afeta heróis. “Nenhum” remove o efeito.',
    noLeader: 'Nenhum',
    double: 'Dobrar',
    rows: ['Corpo a Corpo', 'À Distância', 'Cerco'],
    group: 'Grupo',
    card: 'carta',
    cards: 'cartas',
    empty: 'Nenhuma carta',
    base: 'Base',
    horn: 'Corneta',
    currentScore: 'Pontuação atual',
    bondNote: '“Laço forte +1” adiciona uma cópia abaixo desta carta, no mesmo grupo.',
    effectNote: 'Moral dá +1 às outras cartas da mesma fileira, exceto heróis.',
    heroNote: 'Herói: mantém o valor original.',
    resetQuestion: 'Reiniciar a partida?',
    resetNote: 'As cartas e os efeitos serão removidos. As duas pedras serão restauradas.',
    reset: 'Reiniciar partida',
    gameOver: 'FIM DE JOGO',
    lost: 'PERDEU',
    restart: 'Recomeçar',
    finishQuestion: 'Finalizar jogo?',
    finishNote: 'Você ficou sem pedras de vida.',
    yes: 'Sim',
    no: 'Não',
    close: 'Fechar',
    life: 'Pedra de vida',
    castle: 'Castelo',
    torch: 'Tocha',
    flip: 'Girar moeda',
    spinning: 'Girando…',
    flipAgain: 'Girar novamente',
    coinHint: 'Castelo ou tocha? Gire a moeda.',
    languageName: 'Português',
    chooseDeck: 'Escolha seu baralho',
    deckHint: 'Selecione um baralho para começar.',
    begin: 'Começar',
    back: 'Voltar',
    bestas: 'Bestas',
    reinos_cima: 'Reinos de cima',
    povos_floresta: 'Forest Peoples',
    imperio_dourado: 'Golden Empire',
    clas_ilhas: 'Island Clans',
    round: 'Rodada',
    nextRound: 'Próxima rodada',
    nextQuestion: 'Avançar para a próxima rodada?',
    nextNote: 'As cartas, o clima, a corneta e o efeito do líder serão limpos. As pedras restantes serão mantidas.',
    roundResultQuestion: 'Você ganhou ou perdeu a rodada?',
    roundResultNote: 'O resultado define se você perde uma pedra de vida antes de avançar.',
    roundWon: 'Ganhei',
    roundLost: 'Perdi',
    victory: 'VENCEU',
    victoryEyebrow: 'FIM DE JOGO',
    playAgain: 'Jogar novamente',
    finalRoundResult: 'Registrar resultado da rodada',
    roundReady: 'Prepare suas cartas',
    lastRound: 'Última rodada. Reinicie para começar outra partida.',
    replaceQuestion: 'Começar uma nova partida?',
    replaceNote: 'A partida salva será substituída.',
    saveUnavailable: 'O navegador não permitiu salvar a partida. Mantenha esta aba aberta.',
    total: 'Total'
  },

  en: {
    appTitle: 'Boardgame Score Assistant',
    start: 'Start new game',
    continueGame: 'Continue previous game',
    coin: 'Coin toss',
    score: 'SCORE',
    addTitle: 'ADD CARD',
    hint: 'Choose a row and tap a value. Tap a card to configure its effects.',
    exit: 'exit',
    exitToMenu: 'Exit',
    footerDisclaimer: 'GuentorScore is an independent third-party application with no connection, affiliation, sponsorship or endorsement from any third-party companies, brands or intellectual properties.',
    bond: 'Tight Bond',
    bondPlus: 'Tight Bond +1',
    morale: 'Morale',
    hero: 'Hero',
    effects: 'Card effects',
    delete: 'Delete card',
    weather: 'Weather',
    none: 'Clear Weather',
    frost: 'Frost',
    fog: 'Fog',
    rain: 'Rain',
    storm: 'Storm',
    leader: 'Leader',
    leaderTitle: 'Leader effect',
    weatherNote: 'Only one weather card at a time. Clear Weather removes weather and restores row colors.',
    leaderNote: 'Choose the row that gets ×2 from the leader. Does not stack with a horn or affect heroes. “None” removes the effect.',
    noLeader: 'None',
    double: 'Double',
    rows: ['Close Combat', 'Ranged', 'Siege'],
    group: 'Group',
    card: 'card',
    cards: 'cards',
    empty: 'No cards',
    base: 'Base',
    horn: 'Horn',
    currentScore: 'Current score',
    bondNote: '“Tight Bond +1” adds a copy below this card in the same group.',
    effectNote: 'Morale gives +1 to the other cards in the same row, except heroes.',
    heroNote: 'Hero: keeps its original value.',
    resetQuestion: 'Restart the game?',
    resetNote: 'All cards and effects will be removed. Both life gems will be restored.',
    reset: 'Restart game',
    gameOver: 'GAME OVER',
    lost: 'YOU LOST',
    restart: 'Play again',
    finishQuestion: 'End game?',
    finishNote: 'You have no life gems left.',
    yes: 'Yes',
    no: 'No',
    close: 'Close',
    life: 'Life gem',
    castle: 'Castle',
    torch: 'Torch',
    flip: 'Flip coin',
    spinning: 'Spinning…',
    flipAgain: 'Flip again',
    coinHint: 'Castle or torch? Flip the coin.',
    languageName: 'English',
    chooseDeck: 'Choose your deck',
    deckHint: 'Select a deck to begin.',
    begin: 'Begin',
    back: 'Back',
    bestas: 'Beasts',
    reinos_cima: 'Upper Realms',
    povos_floresta: 'Forest Peoples',
    imperio_dourado: 'Golden Empire',
    clas_ilhas: 'Island Clans',
    round: 'Round',
    nextRound: 'Next round',
    nextQuestion: 'Advance to the next round?',
    nextNote: 'Cards, weather, horns and the leader effect will be cleared. Your remaining life gems will be kept.',
    roundResultQuestion: 'Did you win or lose the round?',
    roundResultNote: 'The result determines whether you lose a life gem before advancing.',
    roundWon: 'I won',
    roundLost: 'I lost',
    victory: 'YOU WON',
    victoryEyebrow: 'GAME OVER',
    playAgain: 'Play again',
    finalRoundResult: 'Record round result',
    roundReady: 'Prepare your cards',
    lastRound: 'Final round. Restart to begin another game.',
    replaceQuestion: 'Start a new game?',
    replaceNote: 'Your saved game will be replaced.',
    saveUnavailable: 'Your browser could not save the game. Keep this tab open.',
    total: 'Total'
  }
};

const DECKS = [
  'bestas',
  'reinos_cima',
  'povos_floresta',
  'imperio_dourado',
  'clas_ilhas'
];

const climates = {
  frost: { icon: '❄️', rows: [0] },
  fog: { icon: '🌫️', rows: [1] },
  rain: { icon: '🌧️', rows: [2] },
  storm: { icon: '⛈️', rows: [1, 2] }
};

const SAVE_KEY = 'guentorscore-game-v4';
const LANGUAGE_KEY = 'guentorscore-language';

const $ = id => document.getElementById(id);
const has = (card, effect) => card.effects.includes(effect);

let language = 'pt';
let storageAvailable = true;
let currentScreen = 'menu';
let selectedDeck = null;
let selectedCardId = null;
let pendingGem = null;
let confirmationAction = null;
let lastFocus = null;
let roundBusy = false;

let coinTimer = null;
let coinBusy = false;
let coinAngle = 0;
let coinOutcome = null;

try {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  if (savedLanguage === 'pt' || savedLanguage === 'en') {
    language = savedLanguage;
  }
} catch {
  storageAvailable = false;
}

const t = key => translations[language][key];

function initialState(deck = 'bestas') {
  return {
    active: false,
    deck,
    round: 1,
    selectedRow: 0,
    nextId: 1,
    nextGroup: 1,
    cards: [],
    rows: [{ horn: false }, { horn: false }, { horn: false }],
    weather: [],
    leaderRow: null,
    gems: [true, true]
  };
}

// Valida o conteúdo salvo antes de reconstruir a partida.
function readSavedGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;

    const saved = JSON.parse(raw);
    const value = saved?.state;

    if (
      saved.version !== 3 ||
      !value ||
      value.active !== true ||
      !DECKS.includes(value.deck) ||
      !Number.isInteger(value.round) ||
      value.round < 1 ||
      value.round > 3 ||
      !Number.isInteger(value.selectedRow) ||
      value.selectedRow < 0 ||
      value.selectedRow > 2 ||
      !Array.isArray(value.cards) ||
      !Array.isArray(value.rows) ||
      value.rows.length !== 3 ||
      !value.rows.every(row => typeof row?.horn === 'boolean') ||
      !Array.isArray(value.gems) ||
      value.gems.length !== 2 ||
      !value.gems.every(gem => typeof gem === 'boolean') ||
      !value.gems.some(Boolean) ||
      !Array.isArray(value.weather) ||
      value.weather.length > 1 ||
      !value.weather.every(weather =>
        Object.prototype.hasOwnProperty.call(climates, weather)
      ) ||
      ![null, 0, 1, 2].includes(value.leaderRow)
    ) {
      return null;
    }

    const ids = new Set();
    const cards = [];

    for (const card of value.cards) {
      if (
        !Number.isSafeInteger(card.id) ||
        card.id < 1 ||
        ids.has(card.id) ||
        !Number.isInteger(card.row) ||
        card.row < 0 ||
        card.row > 2 ||
        !Number.isInteger(card.value) ||
        card.value < 1 ||
        card.value > 15 ||
        !Array.isArray(card.effects) ||
        !card.effects.every(effect =>
          ['bond', 'morale', 'hero'].includes(effect)
        )
      ) {
        return null;
      }

      ids.add(card.id);

      const effects = card.effects.includes('hero')
        ? ['hero']
        : [...new Set(card.effects)];

      if (
        effects.includes('bond') &&
        (!Number.isSafeInteger(card.groupId) || card.groupId < 1)
      ) {
        return null;
      }

      cards.push({
        id: card.id,
        row: card.row,
        value: card.value,
        effects,
        groupId: effects.includes('bond') ? card.groupId : null
      });
    }

    const restored = initialState(value.deck);

    restored.active = true;
    restored.round = value.round;
    restored.selectedRow = value.selectedRow;
    restored.cards = cards;
    restored.rows = value.rows.map(row => ({ horn: row.horn }));
    restored.weather = [...value.weather];
    restored.leaderRow = value.leaderRow;
    restored.gems = [...value.gems];

    restored.nextId = cards.reduce(
      (next, card) => Math.max(next, card.id + 1),
      1
    );

    restored.nextGroup = cards.reduce(
      (next, card) => Math.max(next, (card.groupId || 0) + 1),
      1
    );

    return restored;
  } catch {
    return null;
  }
}

let state = readSavedGame() || initialState();

$('startBtn').classList.remove('primary');
$('startBtn').classList.add('new-game-button');

// Acrescenta os novos controles sem precisar alterar seu HTML.
$('startBtn').insertAdjacentHTML('beforebegin', `
  <button
    class="menu-button continue-game-button"
    id="continueBtn"
    data-i18n="continueGame"
    hidden
  ></button>
`);

$('languageLabel').insertAdjacentHTML('afterend', `
  <p
    class="save-notice"
    id="saveNotice"
    data-i18n="saveUnavailable"
    role="status"
    hidden
  ></p>
`);

$('menuScreen').insertAdjacentHTML('afterend', `
  <section class="deck-screen" id="deckScreen" hidden>
    <div class="deck-panel">
      <div class="eyebrow">GUENTORSCORE</div>
      <h1 data-i18n="chooseDeck"></h1>
      <p class="menu-subtitle" data-i18n="deckHint"></p>

      <div class="deck-options">
        ${DECKS.map(deck => `
          <button
            class="deck-button"
            data-deck="${deck}"
            aria-pressed="false"
          >
            <span class="deck-dot" aria-hidden="true"></span>
            <span data-i18n="${deck}"></span>
            <span class="deck-check" aria-hidden="true">✓</span>
          </button>
        `).join('')}
      </div>

      <button
        class="menu-button primary"
        id="beginBtn"
        data-i18n="begin"
        disabled
      ></button>

      <button
        class="exit-button"
        id="backMenuBtn"
        data-i18n="back"
      ></button>
    </div>
  </section>
`);

const topActions = document.createElement('div');
topActions.className = 'top-actions';

$('resetBtn').before(topActions);

topActions.innerHTML = `
  <button
    class="reset-btn next-round-btn"
    id="nextRoundBtn"
    aria-label="Próxima rodada"
  >→</button>
`;

topActions.appendChild($('resetBtn'));

$('gameScreen').querySelector('.topbar').insertAdjacentHTML(
  'afterend',
  '<div class="match-caption" id="matchCaption"></div>'
);

$('cardNote').insertAdjacentHTML('beforebegin', `
  <p
    class="card-calculation"
    id="cardCalculation"
    aria-live="polite"
  ></p>
`);

document.body.insertAdjacentHTML('beforeend', `
  <div class="modal hidden" id="confirmModal">
    <div class="modal-card">
      <button class="close" type="button">×</button>
      <div class="modal-title" id="confirmTitle"></div>
      <p class="modal-note" id="confirmText"></p>
      <div class="confirm-actions">
        <button
          class="menu-button"
          id="cancelAction"
          data-i18n="no"
        ></button>
        <button
          class="menu-button primary"
          id="confirmAction"
          data-i18n="yes"
        ></button>
      </div>
    </div>
  </div>

  <div
    class="round-transition"
    id="roundTransition"
    role="status"
    aria-live="polite"
    hidden
  >
    <div class="round-banner">
      <div class="round-emblem" aria-hidden="true">⚔</div>
      <div class="eyebrow" data-i18n="round"></div>
      <strong id="transitionNumber">2</strong>
      <span data-i18n="roundReady"></span>
    </div>
  </div>
`);

const screenIds = [
  'menuScreen',
  'deckScreen',
  'gameScreen',
  'lossScreen',
  'winScreen'
];

const board = $('board');

function updateSaveNotice() {
  $('saveNotice').hidden = storageAvailable;
}

function saveGame() {
  try {
    if (!state.active) {
      localStorage.removeItem(SAVE_KEY);
    } else {
      const snapshot = JSON.parse(JSON.stringify(state));

      // Uma derrota ainda não confirmada não fica gravada.
      if (pendingGem !== null) {
        snapshot.gems[pendingGem] = true;
      }

      localStorage.setItem(SAVE_KEY, JSON.stringify({
        version: 3,
        state: snapshot
      }));
    }

    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }

  updateSaveNotice();
}

function weatherFor(row) {
  return state.weather.filter(weather =>
    climates[weather].rows.includes(row)
  );
}

// O placar e a explicação usam exatamente o mesmo cálculo.
function scoreDetails(card) {
  let value = card.value;
  const steps = [`${t('base')} ${value}`];

  if (has(card, 'hero')) {
    steps.push(t('heroNote'));
    return { value, steps };
  }

  if (weatherFor(card.row).length) {
    value = 1;
    steps.push(`${t('weather')} → ${value}`);
  }

  if (has(card, 'bond') && card.groupId !== null) {
    const count = state.cards.filter(other =>
      other.row === card.row &&
      other.groupId === card.groupId &&
      has(other, 'bond') &&
      !has(other, 'hero')
    ).length;

    value *= Math.max(1, count);
    steps.push(`${t('bond')} ×${Math.max(1, count)} = ${value}`);
  }

  const morale = state.cards.filter(other =>
    other.row === card.row &&
    other.id !== card.id &&
    has(other, 'morale') &&
    !has(other, 'hero')
  ).length;

  if (morale > 0) {
    value += morale;
    steps.push(`${t('morale')} +${morale} = ${value}`);
  }

  if (state.rows[card.row].horn || state.leaderRow === card.row) {
    value *= 2;

    const source = state.rows[card.row].horn
      ? t('horn')
      : t('leader');

    steps.push(`${source} ×2 = ${value}`);
  }

  return { value, steps };
}

function cardScore(card) {
  return scoreDetails(card).value;
}

function calculateRow(row) {
  return state.cards
    .filter(card => card.row === row)
    .reduce((sum, card) => sum + cardScore(card), 0);
}

function setEffect(card, effect) {
  if (has(card, effect)) {
    card.effects = card.effects.filter(item => item !== effect);
    if (effect === 'bond') card.groupId = null;
    return;
  }

  if (effect === 'hero') {
    card.effects = ['hero'];
    card.groupId = null;
    return;
  }

  card.effects = card.effects.filter(item => item !== 'hero');
  card.effects.push(effect);

  if (effect === 'bond') {
    card.groupId = state.nextGroup++;
  }
}

function addBondCopy(card) {
  if (!has(card, 'bond') || has(card, 'hero')) return;

  state.cards.splice(state.cards.indexOf(card) + 1, 0, {
    id: state.nextId++,
    row: card.row,
    value: card.value,
    effects: [...card.effects],
    groupId: card.groupId
  });
}

function cardMarkup(card) {
  return `
    <button
      class="card ${has(card, 'hero') ? 'hero-card' : ''}"
      data-card="${card.id}"
      aria-label="${t('card')} ${card.value}. ${t('currentScore')}: ${cardScore(card)}"
    >
      <span class="card-numbers">
        <span class="card-value">${cardScore(card)}</span>
        <small>${t('base')} ${card.value}</small>
      </span>

      <span class="card-icons">
        ${has(card, 'bond') ? '🔗 +' : ''}
        ${has(card, 'morale') ? '❤️' : ''}
        ${has(card, 'hero') ? '👑' : ''}
      </span>
    </button>
  `;
}

function render() {
  board.innerHTML = '';

  t('rows').forEach((name, rowIndex) => {
    const row = document.createElement('section');
    const weather = weatherFor(rowIndex);
    const cards = state.cards.filter(card => card.row === rowIndex);
    const seen = new Set();

    row.className = [
      'row',
      state.selectedRow === rowIndex ? 'selected-row' : '',
      weather.length
        ? `weather-affected weather-${weather[weather.length - 1]}`
        : ''
    ].filter(Boolean).join(' ');

    const markup = cards.map(card => {
      if (!has(card, 'bond')) return cardMarkup(card);
      if (seen.has(card.groupId)) return '';

      seen.add(card.groupId);

      const group = cards.filter(other =>
        other.groupId === card.groupId && has(other, 'bond')
      );

      return `
        <div class="bond-group">
          <span class="group-label">🔗 + ${t('group')}</span>
          ${group.map(cardMarkup).join('')}
        </div>
      `;
    }).join('');

    row.innerHTML = `
      <div class="row-head">
        <div class="row-name">${name}</div>
        <div class="row-score">${calculateRow(rowIndex)}</div>

        <div class="row-controls">
          <button
            class="row-control ${state.selectedRow === rowIndex ? 'active' : ''}"
            data-select-row="${rowIndex}"
            aria-pressed="${state.selectedRow === rowIndex}"
          >+ ${t('card')}</button>

          <button
            class="row-control ${state.rows[rowIndex].horn ? 'active' : ''}"
            data-horn="${rowIndex}"
            aria-pressed="${state.rows[rowIndex].horn}"
            aria-label="${t('horn')} · ${name}"
          >🎺 ×2</button>
        </div>

        ${weather.length ? `
          <div class="row-status">
            ${weather.map(w => `${climates[w].icon} ${t(w)}`).join(' · ')}
          </div>
        ` : ''}

        ${state.leaderRow === rowIndex ? `
          <div class="leader-status">👑 ${t('leader')} ×2</div>
        ` : ''}
      </div>

      <div class="cards">
        ${markup || `<div class="empty">${t('empty')}</div>`}
      </div>

      <div class="row-total">
        ${cards.length} ${t(cards.length === 1 ? 'card' : 'cards')}
      </div>
    `;

    board.appendChild(row);
  });

  $('totalScore').textContent =
    [0, 1, 2].reduce((sum, row) => sum + calculateRow(row), 0);

  $('weatherBtn').classList.toggle('active', state.weather.length > 0);
  $('leaderBtn').classList.toggle('active', state.leaderRow !== null);

  document.querySelectorAll('[data-weather]').forEach(button => {
    const active = button.dataset.weather === 'none'
      ? state.weather.length === 0
      : state.weather.includes(button.dataset.weather);

    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });

  document.querySelectorAll('[data-leader]').forEach(button => {
    const active = button.dataset.leader === 'none'
      ? state.leaderRow === null
      : state.leaderRow === Number(button.dataset.leader);

    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });

  document.querySelectorAll('.gem').forEach(gem => {
    const active = state.gems[Number(gem.dataset.gem)];
    gem.classList.toggle('active', active);
    gem.setAttribute('aria-label', `${t('life')} ${Number(gem.dataset.gem) + 1}: ${active ? '●' : '○'}`);
  });

  $('matchCaption').textContent =
    `${t(state.deck)} · ${t('round')} ${state.round}/3`;

  $('nextRoundBtn').disabled = roundBusy || !state.active;
  $('nextRoundBtn').title = t(
    state.round >= 3 ? 'finalRoundResult' : 'nextRound'
  );

  $('continueBtn').hidden = !state.active;

  saveGame();
}

function applyTheme() {
  document.body.dataset.faction =
    ['game', 'loss', 'win'].includes(currentScreen)
      ? state.deck
      : '';
}

function closeAllModals() {
  if (pendingGem !== null) {
    state.gems[pendingGem] = true;
    pendingGem = null;
    render();
  }

  confirmationAction = null;
  stopCoin();

  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.add('hidden');
  });

  screenIds.forEach(id => {
    $(id).inert = false;
  });

  document.body.classList.remove('modal-open');

  if (lastFocus?.isConnected && lastFocus.getClientRects().length) {
    lastFocus.focus();
  }

  lastFocus = null;
}

function showModal(id) {
  closeAllModals();
  lastFocus = document.activeElement;

  screenIds.forEach(screenId => {
    $(screenId).inert = true;
  });

  const modal = $(id);
  modal.classList.remove('hidden');

  document.body.classList.add('modal-open');
  modal.querySelector('button')?.focus();
}

function askConfirmation(title, note, action) {
  $('confirmTitle').textContent = title;
  $('confirmText').textContent = note;
  $('confirmModal').setAttribute('aria-label', title);

  showModal('confirmModal');
  confirmationAction = action;
}

function updateCardModal() {
  const card = state.cards.find(item => item.id === selectedCardId);
  if (!card) return;

  $('modalNumber').textContent = card.value;

  document.querySelectorAll('[data-effect]').forEach(button => {
    const active = has(card, button.dataset.effect);
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });

  $('bondPlus').hidden = !has(card, 'bond');

  const details = scoreDetails(card);

  $('cardCalculation').textContent =
    details.steps.join(' → ') + ` · ${t('total')}: ${details.value}`;

  $('cardNote').textContent = has(card, 'hero')
    ? t('heroNote')
    : t(has(card, 'bond') ? 'bondNote' : 'effectNote');
}

function openCardModal(id) {
  selectedCardId = id;
  updateCardModal();
  showModal('cardModal');
}

function setScreen(screen) {
  closeAllModals();
  currentScreen = screen;

  const visibleId = {
    menu: 'menuScreen',
    deck: 'deckScreen',
    game: 'gameScreen',
    loss: 'lossScreen',
    win: 'winScreen'
  }[screen];

  screenIds.forEach(id => {
    $(id).hidden = id !== visibleId;
  });

  applyTheme();

  const focusTarget = {
    menu: state.active ? 'continueBtn' : 'startBtn',
    game: 'nextRoundBtn',
    loss: 'restartBtn',
    win: 'restartWinBtn'
  }[screen];

  if (screen === 'deck') {
    document.querySelector('[data-deck]')?.focus();
  } else if (screen === 'game' && roundBusy) {
    $('resetBtn').focus();
  } else {
    $(focusTarget)?.focus();
  }

  window.scrollTo(0, 0);
}

function updateDeckSelection() {
  document.querySelectorAll('[data-deck]').forEach(button => {
    const active = button.dataset.deck === selectedDeck;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });

  $('beginBtn').disabled = !selectedDeck;
}

function openDeckSelection() {
  selectedDeck = null;
  updateDeckSelection();
  setScreen('deck');
}

function startGame(deck) {
  closeAllModals();

  state = initialState(deck);
  state.active = true;
  selectedCardId = null;

  render();
  setScreen('game');
}

function completedWins() {
  const completedRounds = Math.max(0, state.round - 1);
  const losses = 2 - state.gems.filter(Boolean).length;
  return Math.max(0, completedRounds - losses);
}

function finishMatch(screen) {
  state.active = false;
  selectedCardId = null;
  render();
  setScreen(screen);
}

function registerRoundResult(won) {
  if (roundBusy || !state.active) return;

  const winsBefore = completedWins();

  if (!won) {
    const gemIndex = state.gems.findIndex(Boolean);
    if (gemIndex !== -1) state.gems[gemIndex] = false;

    if (!state.gems.some(Boolean)) {
      closeAllModals();
      finishMatch('loss');
      return;
    }
  } else if (winsBefore + 1 >= 2) {
    closeAllModals();
    finishMatch('win');
    return;
  }

  closeAllModals();

  if (state.round >= 3) {
    // Na terceira rodada, qualquer resultado que não seja a segunda derrota
    // encerra a partida como vitória.
    finishMatch('win');
    return;
  }

  advanceRound();
}

function advanceRound() {
  if (roundBusy || state.round >= 3 || !state.active) return;

  roundBusy = true;

  state.round += 1;
  state.cards = [];
  state.rows = [{ horn: false }, { horn: false }, { horn: false }];
  state.weather = [];
  state.leaderRow = null;
  state.selectedRow = 0;
  state.nextId = 1;
  state.nextGroup = 1;
  selectedCardId = null;

  // Salva a nova rodada antes da animação.
  render();

  $('transitionNumber').textContent = state.round;
  $('roundTransition').hidden = false;
  $('gameScreen').inert = true;

  const reduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  setTimeout(() => {
    $('roundTransition').hidden = true;
    $('gameScreen').inert = false;
    roundBusy = false;

    render();

    $('gameScreen').classList.add('round-arrival');
    $('resetBtn').focus();

    setTimeout(() => {
      $('gameScreen').classList.remove('round-arrival');
    }, 450);
  }, reduced ? 150 : 1250);
}

function renderCoinText() {
  $('coinResult').textContent = coinBusy
    ? t('spinning')
    : coinOutcome
      ? t(coinOutcome)
      : t('coinHint');

  $('flipBtn').textContent = t(
    coinBusy ? 'spinning' : coinOutcome ? 'flipAgain' : 'flip'
  );

  $('flipBtn').disabled = coinBusy;
}

function stopCoin() {
  clearTimeout(coinTimer);
  coinTimer = null;

  if (!coinBusy) return;

  coinBusy = false;
  coinOutcome = null;
  coinAngle = 0;

  $('coinDisc').style.transition = 'none';
  $('coinDisc').style.transform = 'rotateY(0deg)';

  renderCoinText();
}

function applyLanguage() {
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  document.title = `GuentorScore — ${t('appTitle')}`;

  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll('[data-lang]').forEach(button => {
    const active = button.dataset.lang === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });

  $('languageLabel').textContent = t('languageName');

  document.querySelectorAll('[data-leader]').forEach(button => {
    button.textContent = button.dataset.leader === 'none'
      ? t('noLeader')
      : `🎺 ${t('double')} ${t('rows')[Number(button.dataset.leader)]}`;
  });

  document.querySelectorAll('.close').forEach(button => {
    button.setAttribute('aria-label', t('close'));
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    const title = modal.querySelector('.modal-title');
    if (title?.textContent) {
      modal.setAttribute('aria-label', title.textContent);
    }
  });

  document.querySelectorAll('.gem').forEach(gem => {
    gem.setAttribute(
      'aria-label',
      `${t('life')} ${Number(gem.dataset.gem) + 1}`
    );
  });

  [
    ['resetBtn', 'reset'],
    ['restartBtn', 'playAgain'],
    ['restartWinBtn', 'playAgain'],
    ['nextRoundBtn', state.round >= 3 ? 'finalRoundResult' : 'nextRound'],
    ['weatherBtn', 'weather'],
    ['leaderBtn', 'leader']
  ].forEach(([id, key]) => {
    $(id).setAttribute('aria-label', t(key));
    $(id).title = t(key);
  });

  render();
  updateCardModal();
  renderCoinText();
}

// Campo e cartas.
board.addEventListener('click', event => {
  if (roundBusy) return;

  const button = event.target.closest('button');
  if (!button) return;

  if (button.hasAttribute('data-select-row')) {
    state.selectedRow = Number(button.dataset.selectRow);
    render();
  }

  if (button.hasAttribute('data-horn')) {
    const row = Number(button.dataset.horn);
    state.rows[row].horn = !state.rows[row].horn;
    render();
  }

  if (button.hasAttribute('data-card')) {
    openCardModal(Number(button.dataset.card));
  }
});

document.querySelectorAll('[data-add]').forEach(button => {
  button.addEventListener('click', () => {
    if (roundBusy) return;

    state.cards.push({
      id: state.nextId++,
      row: state.selectedRow,
      value: Number(button.dataset.add),
      effects: [],
      groupId: null
    });

    render();
  });
});

document.querySelectorAll('[data-effect]').forEach(button => {
  button.addEventListener('click', () => {
    const card = state.cards.find(item => item.id === selectedCardId);
    if (!card) return;

    setEffect(card, button.dataset.effect);
    render();
    updateCardModal();
  });
});

$('bondPlus').addEventListener('click', () => {
  const card = state.cards.find(item => item.id === selectedCardId);
  if (!card) return;

  addBondCopy(card);
  closeAllModals();
  render();
});

$('deleteCard').addEventListener('click', () => {
  state.cards = state.cards.filter(card => card.id !== selectedCardId);
  selectedCardId = null;

  closeAllModals();
  render();
});

// Clima e líder.
document.querySelectorAll('[data-weather]').forEach(button => {
  button.addEventListener('click', () => {
    const weather = button.dataset.weather;

    state.weather =
      weather === 'none' || state.weather.includes(weather)
        ? []
        : [weather];

    render();
    closeAllModals();
  });
});

document.querySelectorAll('[data-leader]').forEach(button => {
  button.addEventListener('click', () => {
    state.leaderRow = button.dataset.leader === 'none'
      ? null
      : Number(button.dataset.leader);

    render();
    closeAllModals();
  });
});

$('weatherBtn').addEventListener('click', () => {
  showModal('weatherModal');
});

$('leaderBtn').addEventListener('click', () => {
  showModal('leaderModal');
});

// Pedras de vida são apenas indicadores visuais.
// O resultado da rodada é informado pelo botão de avançar.

// Menu, baralhos e continuidade.
$('startBtn').addEventListener('click', openDeckSelection);

$('continueBtn').addEventListener('click', () => {
  if (!state.active) return;
  render();
  setScreen('game');
});

$('exitBtn').addEventListener('click', () => {
  saveGame();
  setScreen('menu');
});

$('backMenuBtn').addEventListener('click', () => {
  setScreen('menu');
});

document.querySelectorAll('[data-deck]').forEach(button => {
  button.addEventListener('click', () => {
    selectedDeck = button.dataset.deck;
    updateDeckSelection();
  });
});

$('beginBtn').addEventListener('click', () => {
  if (!DECKS.includes(selectedDeck)) return;

  const deck = selectedDeck;

  if (state.active) {
    askConfirmation(
      t('replaceQuestion'),
      t('replaceNote'),
      () => startGame(deck)
    );
  } else {
    startGame(deck);
  }
});

$('restartBtn').addEventListener('click', openDeckSelection);
$('restartWinBtn').addEventListener('click', openDeckSelection);
$('exitLossBtn').addEventListener('click', () => setScreen('menu'));
$('exitWinBtn').addEventListener('click', () => setScreen('menu'));

$('resetBtn').addEventListener('click', () => {
  askConfirmation(
    t('resetQuestion'),
    t('resetNote'),
    () => startGame(state.deck)
  );
});

$('nextRoundBtn').addEventListener('click', () => {
  if (roundBusy || !state.active) return;
  showModal('roundResultModal');
});

$('roundWinBtn').addEventListener('click', () => {
  registerRoundResult(true);
});

$('roundLossBtn').addEventListener('click', () => {
  registerRoundResult(false);
});

$('cancelAction').addEventListener('click', closeAllModals);

$('confirmAction').addEventListener('click', () => {
  const action = confirmationAction;
  closeAllModals();
  action?.();
});

// Idioma.
document.querySelectorAll('[data-lang]').forEach(button => {
  button.addEventListener('click', () => {
    language = button.dataset.lang;

    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch {
      storageAvailable = false;
    }

    applyLanguage();
  });
});

// Moeda.
$('coinBtn').addEventListener('click', () => {
  showModal('coinModal');
  renderCoinText();
});

$('flipBtn').addEventListener('click', () => {
  if (coinBusy) return;

  coinBusy = true;
  coinOutcome = null;
  renderCoinText();

  const random = new Uint32Array(1);
  window.crypto.getRandomValues(random);

  const torch = random[0] % 2 === 1;

  coinAngle =
    Math.ceil(coinAngle / 360) * 360 +
    1800 +
    (torch ? 180 : 0);

  const reduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const duration = reduced ? 150 : 2200;

  $('coinDisc').style.transition =
    `transform ${duration}ms cubic-bezier(.18,.65,.28,1)`;

  $('coinDisc').style.transform = `rotateY(${coinAngle}deg)`;

  coinTimer = setTimeout(() => {
    coinBusy = false;
    coinTimer = null;
    coinOutcome = torch ? 'torch' : 'castle';
    renderCoinText();
  }, duration);
});

// Fechamento dos boxes e navegação pelo teclado.
document.querySelectorAll('.close').forEach(button => {
  button.addEventListener('click', closeAllModals);
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', event => {
    if (event.target === modal) closeAllModals();
  });
});

document.addEventListener('keydown', event => {
  if (roundBusy) return;

  const modal = document.querySelector('.modal:not(.hidden)');
  if (!modal) return;

  if (event.key === 'Escape') {
    closeAllModals();
    return;
  }

  if (event.key !== 'Tab') return;

  const buttons = [...modal.querySelectorAll('button')].filter(
    button =>
      !button.hidden &&
      !button.disabled &&
      button.getClientRects().length > 0
  );

  if (!buttons.length) return;

  const first = buttons[0];
  const last = buttons[buttons.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

window.addEventListener('pagehide', saveGame);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) saveGame();
});

// Abre no menu, oferecendo continuar quando houver partida salva.
applyLanguage();
setScreen('menu');