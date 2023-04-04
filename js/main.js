import { getPhotos } from './data.js';
import { getThumbnailsPhoto } from './thumbnails.js';
import './big-photo.js';
import './form.js';
import './scale-image.js';
import './filters.js';

getThumbnailsPhoto(getPhotos());
