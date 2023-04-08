import { getThumbnailsPhoto } from './thumbnails.js';
import { showAlert } from './util.js';
import { getData, sendData } from './api.js';
import { onFormSubmit } from './form.js';
import './big-photo.js';
import './form.js';

onFormSubmit(sendData);

getData().then(getThumbnailsPhoto).catch(showAlert);
