import { isEscapeKey } from './util.js';
import { onDocumentKeydown } from './form.js';

const showMessage = (result) => {
  const element = document.querySelector(`#${result}`).content.querySelector(`.${result}`);
  const button = element.querySelector(`.${result}__button`);

  const closeMessage = () => {
    document.removeEventListener('keydown', onKeydown);
    if (result === 'error') {
      document.addEventListener('keydown', onDocumentKeydown);
    } else {
      document.body.classList.remove('modal-open');
    }
    element.remove();
  };

  function onKeydown(evt) {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }

  element.addEventListener('click', (evt) => {
    if (evt.target === element || evt.target === button) {
      closeMessage();
    }
  });

  return {
    open: () => {
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', onKeydown);
      document.removeEventListener('keydown', onDocumentKeydown);
      document.body.append(element);
    }
  };
};

const showSuccessMessage = showMessage('success').open;
const showErrorMessage = showMessage('error').open;

export { showSuccessMessage, showErrorMessage };
