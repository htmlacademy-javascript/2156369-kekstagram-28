import { getThumbnailsPhoto } from './thumbnails.js';
import { showAlert } from './util.js';
import { getData, sendData } from './api.js';
import { onFormSubmit } from './form.js';
import { init } from './sorting.js';
import './big-photo.js';
import './form.js';

onFormSubmit(sendData);

getData()
  .then((data) => init(data, getThumbnailsPhoto))
  .catch(showAlert);
