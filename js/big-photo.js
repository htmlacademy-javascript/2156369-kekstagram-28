import { isEscapeKey } from './util.js';

const COMMENTS_PART_FOR_LOADING = 5;

const photoContainer = document.querySelector('.big-picture');
const photoImage = photoContainer.querySelector('.big-picture__img img');
const photoLikes = photoContainer.querySelector('.likes-count');
const photoComments = photoContainer.querySelector('.comments-count');
const photoDescription = photoContainer.querySelector('.social__caption');
const commentsList = photoContainer.querySelector('.social__comments');
const commentTemplate = photoContainer.querySelector('.social__comment');
const commentCount = photoContainer.querySelector('.social__comment-count');
const commentLoader = photoContainer.querySelector('.comments-loader');
const photoCloseButton = photoContainer.querySelector('.big-picture__cancel');

let commentsShown = 0;
let comments = [];

const fillInfoBigPhoto = (photo) => {
  photoImage.src = photo.url;
  photoImage.alt = photo.description;
  photoLikes.textContent = photo.likes;
  photoComments.textContent = photo.comments.length;
  photoDescription.textContent = photo.description;
};

const fillComment = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const fillComments = () => {
  const activeComments = comments.slice(commentsShown, commentsShown + COMMENTS_PART_FOR_LOADING);
  commentsShown += COMMENTS_PART_FOR_LOADING;
  commentsShown = Math.min(commentsShown, comments.length);
  activeComments.forEach((element) => commentsList.append(fillComment(element)));
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;

  if (commentsShown >= comments.length) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
  }
};

const closeBigPhoto = () => {
  photoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
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

function onLoaderCommentsClick(evt) {
  evt.preventDefault();
  fillComments();
}

const showBigPhoto = (photos) => {
  commentsList.innerHTML = '';
  photoContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fillInfoBigPhoto(photos);
  comments = photos.comments;
  fillComments();
  photoCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentLoader.addEventListener('click', onLoaderCommentsClick);
};

export { showBigPhoto };
