import { debounce } from './util.js';
import { getThumbnailsPhoto } from './thumbnails.js';

const PHOTO_COUNT_RANDOM = 10;
const SORT_NUMBER = 0.5;
const RENDER_DELAY = 500;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const photoSortingElement = document.querySelector('.img-filters');
const photoFiltersForm = photoSortingElement.querySelector('.img-filters__form');
const sortButton = photoFiltersForm.querySelectorAll('.img-filters__button');
const photosContainer = document.querySelector('.pictures');

let descriptionSorted = [];
let currentFilter = Filter.DEFAULT;

const getRandomSorting = () => Math.random() - SORT_NUMBER;

const getDiscussedSorting = (a, b) => b.comments.length - a.comments.length;

const clearOldPhotos = () => {
  const photosElement = photosContainer.querySelectorAll('.picture');
  photosElement.forEach((photo) => {
    photo.remove();
  });
};

const getSortedPhotos = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...descriptionSorted].sort(getRandomSorting).slice(0, PHOTO_COUNT_RANDOM);
    case Filter.DISCUSSED:
      return [...descriptionSorted].sort(getDiscussedSorting);
    default:
      return [...descriptionSorted];
  }
};

const init = (loadedPhotos) => {
  const debouncedCallback = debounce(getThumbnailsPhoto, RENDER_DELAY);
  photoSortingElement.classList.remove('img-filters--inactive');
  descriptionSorted = [...loadedPhotos];

  photoFiltersForm.addEventListener('click', (evt) => {
    sortButton.forEach((item) => item.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    clearOldPhotos();
    debouncedCallback(getSortedPhotos());
  });
  debouncedCallback(getSortedPhotos());
};

export { init };
