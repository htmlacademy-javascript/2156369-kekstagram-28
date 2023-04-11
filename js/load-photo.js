import { showAlert } from './util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const ERROR_MESSAGE = `Только форматы ${FILE_TYPES.join(', ')}`;

const preview = document.querySelector('.img-upload__preview img');

const uploadFile = (fileChooser) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    return true;
  }

  showAlert(ERROR_MESSAGE);
  return false;
};

export { uploadFile };
