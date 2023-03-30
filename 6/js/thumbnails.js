import { showBigPhoto } from './big-photo.js';

const containerPictures = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const getThumbnail = (data) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = data.url;
  thumbnail.querySelector('.picture__comments').textContent = data.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = data.likes;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPhoto(data);
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
