import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';

const ID_PHOTO_COUNT = 25;

const COMMENTS_COUNT = {
  min: 1,
  max: 10,
};

const AVATAR = {
  min: 1,
  max: 6,
};

const LIKES_COUNT = {
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

const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    unit: '',
  },
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

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

const getComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR.min, AVATAR.max)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const getPhoto = () => {
  const id = generatePhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_COUNT.min, LIKES_COUNT.max),
    comments: Array.from({ length: getRandomInteger(COMMENTS_COUNT.min, COMMENTS_COUNT.max) }, getComment),
  };
};

const getPhotos = () => Array.from({ length: ID_PHOTO_COUNT }, getPhoto);

export { getPhotos, EFFECTS };
