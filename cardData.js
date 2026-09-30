// image 경로에 파일을 추가하면 이모지 대신 해당 그림이 표시됩니다.
const createCard = (id, label, emoji, category) => ({
  id,
  label,
  // Resolve from this module so the URL stays correct when the app is hosted
  // below a repository path (for example, on GitHub Pages).
  image: new URL(`./assets/${category}/${id}.png`, import.meta.url).href,
  emoji,
});

export const cardData = {
  characters: [
    createCard("rabbit", "토끼", "🐰", "characters"),
    createCard("dog", "강아지", "🐶", "characters"),
    createCard("cat", "고양이", "🐱", "characters"),
    createCard("bear", "곰", "🐻", "characters"),
    createCard("lion", "사자", "🦁", "characters"),
    createCard("elephant", "코끼리", "🐘", "characters"),
    createCard("monkey", "원숭이", "🐵", "characters"),
    createCard("penguin", "펭귄", "🐧", "characters"),
    createCard("dinosaur", "공룡", "🦖", "characters"),
    createCard("astronaut", "우주인", "🧑‍🚀", "characters"),
    createCard("wizard", "마법사", "🧙", "characters"),
    createCard("robot", "로봇", "🤖", "characters"),
    createCard("pirate", "해적", "🏴‍☠️", "characters"),
    createCard("princess", "공주", "👸", "characters"),
    createCard("prince", "왕자", "🤴", "characters"),
  ],
  places: [
    createCard("kindergarten", "유치원", "🏫", "places"),
    createCard("forest", "숲", "🌳", "places"),
    createCard("sea", "바다", "🌊", "places"),
    createCard("space", "우주", "🌌", "places"),
    createCard("castle", "성", "🏰", "places"),
    createCard("playground", "놀이터", "🛝", "places"),
    createCard("zoo", "동물원", "🦒", "places"),
    createCard("amusement-park", "놀이공원", "🎡", "places"),
    createCard("desert-island", "무인도", "🏝️", "places"),
    createCard("mountain", "산", "⛰️", "places"),
    createCard("market", "마트", "🛒", "places"),
    createCard("library", "도서관", "📚", "places"),
    createCard("above-clouds", "구름 위", "☁️", "places"),
    createCard("train", "기차", "🚆", "places"),
    createCard("cave", "동굴", "🪨", "places"),
  ],
  events: [
    createCard("find-gift", "선물을 발견했어요", "🎁", "events"),
    createCard("meet-friend", "친구를 만났어요", "🫶", "events"),
    createCard("get-lost", "길을 잃었어요", "🧭", "events"),
    createCard("start-raining", "비가 내리기 시작했어요", "🌧️", "events"),
    createCard("find-treasure", "보물을 발견했어요", "🪙", "events"),
    createCard("find-food", "맛있는 음식을 발견했어요", "🍱", "events"),
    createCard("hear-sound", "이상한 소리를 들었어요", "👂", "events"),
    createCard("fall-from-sky", "하늘에서 무언가 떨어졌어요", "☄️", "events"),
    createCard("find-door", "문을 발견했어요", "🚪", "events"),
    createCard("animal-follows", "동물이 따라왔어요", "🐾", "events"),
    createCard("become-small", "갑자기 몸이 작아졌어요", "🐜", "events"),
    createCard("become-big", "갑자기 몸이 커졌어요", "🗼", "events"),
    createCard("can-fly", "날 수 있게 되었어요", "🪽", "events"),
    createCard("asked-for-help", "도움을 요청받았어요", "🆘", "events"),
    createCard("find-magic-item", "신기한 물건을 발견했어요", "✨", "events"),
  ],
  emotions: [
    createCard("happy", "기뻐요", "😊", "emotions"),
    createCard("sad", "슬퍼요", "😢", "emotions"),
    createCard("angry", "화가 났어요", "😠", "emotions"),
    createCard("scared", "무서워요", "😨", "emotions"),
    createCard("surprised", "깜짝 놀랐어요", "😲", "emotions"),
    createCard("excited", "신나요", "🤩", "emotions"),
    createCard("curious", "궁금해요", "🤔", "emotions"),
    createCard("shy", "부끄러워요", "☺️", "emotions"),
  ],
};

export const cardTypes = {
  character: {
    title: "누가?",
    dataKey: "characters",
    className: "character",
  },
  companion: {
    title: "누구랑?",
    dataKey: "characters",
    className: "companion",
  },
  place: {
    title: "어디서?",
    dataKey: "places",
    className: "place",
  },
  emotion: {
    title: "어떤 기분?",
    dataKey: "emotions",
    className: "emotion",
  },
};

export const difficultyTypes = {
  easy: ["character", "companion"],
  normal: ["character", "companion", "place"],
  challenge: ["character", "companion", "place", "emotion"],
};
