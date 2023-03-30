import { getPhotos } from './data.js';
import { getThumbnailsPhoto } from './thumbnails.js';
import './big-photo.js';

getThumbnailsPhoto(getPhotos());
