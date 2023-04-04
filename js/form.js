import { isEscapeKey } from './util.js';
import { resetScale } from './scale-image.js';
import { resetEffects } from './filters.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-я0-9]{1,19}$/i;

const fileLoad = document.querySelector('#upload-file');
const imgLoadOverlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const closeModalButton = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const showModal = () => {
  imgLoadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  resetScale();
  resetEffects();
  form.reset();
  pristine.reset();
  imgLoadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const onCloseModalButtonClick = () => {
  closeModal();
};

const onFileLoadChange = () => {
  showModal();
};

const inputInFocus = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

commentField.addEventListener('keydown', inputInFocus);
hashtagField.addEventListener('keydown', inputInFocus);

const isValidComment = (comment) => comment.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  commentField,
  isValidComment,
  'Комментарий должен быть меньше 140 символов'
);

const isTagValid = () => {
  const hashtags = hashtagField.value.trim().split(' ');
  if (hashtagField.value.length === 0) {
    return true;
  }
  return hashtags.every((hashtag) => VALID_SYMBOLS.test(hashtag));
};

pristine.addValidator(
  hashtagField,
  isTagValid,
  'Хэш-тег должен начинаться с #, состоять из букв и чисел, не более 20 символов'
);

const hasValidCount = () => {
  const hashtags = hashtagField.value.split(' ');
  return hashtags.length <= HASHTAG_MAX_COUNT;
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  'Нельзя указать больше пяти хэш-тегов'
);

const hasUniqueTag = () => {
  const lowerCaseHashtags = hashtagField.value.toLowerCase().trim().split(' ');
  const uniqueHashtags = new Set(lowerCaseHashtags);
  return lowerCaseHashtags.length === uniqueHashtags.size;
};

pristine.addValidator(
  hashtagField,
  hasUniqueTag,
  'Хэш-тег не может быть использован дважды'
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
};

fileLoad.addEventListener('change', onFileLoadChange);
closeModalButton.addEventListener('click', onCloseModalButtonClick);
form.addEventListener('submit', onFormSubmit);
