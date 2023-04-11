import { getThumbnailsPhoto } from './thumbnails.js';
import { showAlert } from './util.js';
import { getData, sendData } from './api.js';
import { initForm } from './form.js';
import { initSorting } from './sorting.js';

initForm(sendData);

getData()
  .then((data) => {
    initSorting(data);
    getThumbnailsPhoto(data);
  })
  .catch(showAlert);
