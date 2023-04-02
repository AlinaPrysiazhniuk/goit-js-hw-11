import { refs } from './index';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34983998-155dfb76bac09cdf48f99cd2f';

export const fetchImages = name =>
  fetch(
    `${BASE_URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      if (!error.ok) {
        throw new Error(error.status);
      }
    });
