const ID_PHOTO = {
  min: 1,
  max: 25,
};

const COMMENTS_COUNT = {
  min: 1,
  max: 10,
};

const AVATAR = {
  min: 1,
  max: 6,
};

const LIKES = {
  min: 15,
  max: 200,
};

const DESCRIPTIONS = [
  'Это был лучший день',
  'Супер',
  'Оцените',
  'Хочу услышать критику от профи',
  'А вам слабо повторить?',
  'Снимок на новый фотик',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Анна',
  'Иван',
  'Ярослав',
  'Нина',
  'Юлия',
  'Антон',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getComments = () => {
  const comments = [];
  for (let i = COMMENTS_COUNT.min, j = 1; i <= getRandomInteger(COMMENTS_COUNT.min, COMMENTS_COUNT.max); i++, j++) {
    comments.push({
      id: j,
      avatar: `img/avatar-${getRandomInteger(AVATAR.min, AVATAR.max)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    });
  }
  return comments;
};

const getDescriptionPhoto = () => {
  const descriptionPhoto = [];
  for (let i = ID_PHOTO.min; i <= ID_PHOTO.max; i++) {
    descriptionPhoto.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(LIKES.min, LIKES.max),
      comments: getComments(),
    });
  }
  return descriptionPhoto;
};

getDescriptionPhoto();
