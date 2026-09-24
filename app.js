import { cardData, cardTypes, difficultyTypes } from "./cardData.js";

const cardBoard = document.querySelector("#card-board");
const drawAllButton = document.querySelector("#draw-all-button");
const difficultyInputs = document.querySelectorAll('input[name="difficulty"]');

let currentDifficulty = "normal";
let currentCards = {};
let previousCombination = "";
let animationTimer;

const randomItem = (items, excludedIds = []) => {
  const excludedIdSet = new Set(
    Array.isArray(excludedIds) ? excludedIds : [excludedIds],
  );
  const candidates = items.filter((item) => !excludedIdSet.has(item.id));
  const pool = candidates.length > 0 ? candidates : items;
  return pool[Math.floor(Math.random() * pool.length)];
};

const getVisibleTypes = () => difficultyTypes[currentDifficulty];

const getCombinationKey = (cards = currentCards) =>
  getVisibleTypes()
    .map((type) => cards[type]?.id ?? "")
    .join("|");

function chooseAllCards() {
  const nextCards = {};

  getVisibleTypes().forEach((type) => {
    const { dataKey } = cardTypes[type];
    const excludedIds = [currentCards[type]?.id];

    if (type === "companion") {
      excludedIds.push(nextCards.character?.id);
    }

    nextCards[type] = randomItem(cardData[dataKey], excludedIds);
  });

  // 각 카드가 달라져도 혹시 모를 동일 조합은 한 번 더 피합니다.
  if (getCombinationKey(nextCards) === previousCombination) {
    const lastType = getVisibleTypes().at(-1);
    const { dataKey } = cardTypes[lastType];
    nextCards[lastType] = randomItem(cardData[dataKey], nextCards[lastType].id);
  }

  currentCards = nextCards;
  previousCombination = getCombinationKey();
}

function chooseOneCard(type) {
  const { dataKey } = cardTypes[type];
  const excludedIds = [currentCards[type]?.id];

  if (type === "character") excludedIds.push(currentCards.companion?.id);
  if (type === "companion") excludedIds.push(currentCards.character?.id);

  currentCards[type] = randomItem(cardData[dataKey], excludedIds);
  previousCombination = getCombinationKey();
}

function createArtwork(item) {
  const artwork = document.createElement("div");
  artwork.className = "card-artwork";
  artwork.setAttribute("aria-hidden", "true");

  const fallback = document.createElement("span");
  fallback.className = "emoji-artwork";
  fallback.textContent = item.emoji;
  artwork.append(fallback);

  if (item.image) {
    const image = document.createElement("img");
    image.className = "card-image";
    image.alt = "";
    image.decoding = "async";
    const showImage = () => {
      artwork.classList.remove("has-error");
      artwork.classList.add("has-image");
    };
    const showFallback = () => {
      artwork.classList.remove("has-image");
      artwork.classList.add("has-error");
      image.remove();
    };

    image.addEventListener("load", showImage, { once: true });
    image.addEventListener("error", showFallback, { once: true });
    artwork.append(image);
    image.src = item.image;

    // A cached image can already be complete before its event is observed.
    if (image.complete) {
      if (image.naturalWidth > 0) showImage();
      else showFallback();
    }
  } else {
    artwork.classList.add("has-error");
  }

  return artwork;
}

function createCardElement(type) {
  const typeInfo = cardTypes[type];
  const item = currentCards[type];
  const article = document.createElement("article");
  article.className = `story-card story-card--${typeInfo.className}`;
  article.dataset.type = type;
  article.setAttribute("aria-label", `${typeInfo.title} ${item.label}`);

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = typeInfo.title;

  const label = document.createElement("p");
  label.className = "card-label";
  label.textContent = item.label;

  const redrawButton = document.createElement("button");
  redrawButton.className = "redraw-button";
  redrawButton.type = "button";
  redrawButton.dataset.redraw = type;
  redrawButton.setAttribute("aria-label", `${typeInfo.title} 카드만 다시 뽑기`);
  redrawButton.innerHTML = '<span aria-hidden="true">↻</span><span>바꾸기</span>';

  article.append(title, createArtwork(item), label, redrawButton);
  return article;
}

function renderCards({ animate = false } = {}) {
  window.clearTimeout(animationTimer);
  cardBoard.classList.toggle("is-shuffling", animate);
  cardBoard.dataset.count = String(getVisibleTypes().length);
  cardBoard.replaceChildren(...getVisibleTypes().map(createCardElement));

  if (animate) {
    animationTimer = window.setTimeout(() => {
      cardBoard.classList.remove("is-shuffling");
    }, 650);
  }
}

function renderOneCard(type) {
  cardBoard.classList.remove("is-shuffling");

  const currentCard = cardBoard.querySelector(`[data-type="${type}"]`);
  if (!currentCard) return;

  const nextCard = createCardElement(type);
  nextCard.classList.add("is-shuffling");
  nextCard.addEventListener(
    "animationend",
    () => nextCard.classList.remove("is-shuffling"),
    { once: true },
  );
  currentCard.replaceWith(nextCard);
}

function drawAllCards({ animate = true } = {}) {
  chooseAllCards();
  renderCards({ animate });
}

drawAllButton.addEventListener("click", () => drawAllCards());

cardBoard.addEventListener("click", (event) => {
  const button = event.target.closest("[data-redraw]");
  if (!button) return;

  const type = button.dataset.redraw;
  chooseOneCard(type);
  renderOneCard(type);

  // DOM이 새로 만들어진 뒤 같은 카드의 버튼으로 초점을 되돌립니다.
  cardBoard.querySelector(`[data-redraw="${type}"]`)?.focus();
});

difficultyInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (!input.checked) return;
    currentDifficulty = input.value;
    previousCombination = "";
    drawAllCards();
  });
});

drawAllCards({ animate: false });
