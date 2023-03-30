import { isEscapeKey } from './util.js';

const photoContainer = document.querySelector('.big-picture');
const photoImage = document.querySelector('.big-picture__img img');
const photoLikes = document.querySelector('.likes-count');
const photoComments = document.querySelector('.comments-count');
const photoDescription = document.querySelector('.social__caption');
const commentsList = photoContainer.querySelector('.social__comments');
const comment = photoContainer.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const photoCloseButton = document.querySelector('.big-picture__cancel');

const fillInfoBigPhoto = (data) => {
  photoImage.src = data.url;
  photoImage.alt = data.description;
  photoLikes.textContent = data.likes;
  photoComments.textContent = data.comments.length;
  photoDescription.textContent = data.description;
};

const fillComment = (element) => {
  const commentElement = comment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = element.avatar;
  commentElement.querySelector('.social__picture').alt = element.name;
  commentElement.querySelector('.social__text').textContent = element.message;
  return commentElement;
};

const fillComments = (comments) => {
  comments.forEach((element) => commentsList.append(fillComment(element)));
};

const closeBigPhoto = () => {
  photoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  photoCloseButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onCloseButtonClick(evt) {
  evt.preventDefault();
  closeBigPhoto();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

const showBigPhoto = (data) => {
  commentsList.innerHTML = ' ';
  photoContainer.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  fillInfoBigPhoto(data);
  fillComments(data.comments);
  photoCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { showBigPhoto };
