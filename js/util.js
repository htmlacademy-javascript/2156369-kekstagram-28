const ALERT_SHOW_TIME = 5000;

const successMessageTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

const onSuccessLoadingKeydown = (evt) => {
  const successModal = document.querySelector('.success');
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successModal.remove();
    successModal.removeEventListener('keydown', onSuccessLoadingKeydown);
  }
};

const onSuccessButtonClick = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('click', onSuccessButtonClick);
};

const onModalSuccessOutsideClick = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    document.querySelector('.success').remove();
    document.removeEventListener('click', onModalSuccessOutsideClick);
  }
};

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  const successModal = document.querySelector('.success');
  const successButton = successModal.querySelector('.success__button');
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onSuccessLoadingKeydown);
  document.addEventListener('click', onModalSuccessOutsideClick);
};

const onErrorLoadingKeydown = (evt) => {
  const alertModal = document.querySelector('.error');
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    alertModal.remove();
    alertModal.removeEventListener('keydown', onErrorLoadingKeydown);
  }
};

const onErrorButtonClick = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('click', onErrorButtonClick);
};

const onModalErrorOutsideClick = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    document.querySelector('.error').remove();
    document.removeEventListener('click', onModalErrorOutsideClick);
  }
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.append(errorMessage);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorLoadingKeydown);
  document.addEventListener('click', onModalErrorOutsideClick);
};

export { showAlert, isEscapeKey, showSuccessMessage, showErrorMessage };
