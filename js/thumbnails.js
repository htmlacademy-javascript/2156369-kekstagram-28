import { showBigPhoto } from './big-photo.js';

const containerPictures = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const getThumbnail = (photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = photo.url;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPhoto(photo);
  });

  return thumbnail;
};

const getThumbnailsPhoto = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const thumbnailsPhoto = getThumbnail(photo);
    fragment.append(thumbnailsPhoto);
  });

  containerPictures.append(fragment);
};

export { getThumbnailsPhoto };
