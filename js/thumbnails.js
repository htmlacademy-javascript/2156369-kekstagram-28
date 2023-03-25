const containerPictures = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const getThumbnail = ({ url, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
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
