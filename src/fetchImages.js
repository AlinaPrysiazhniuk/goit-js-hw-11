import { refs } from './index';
import { createImageMarkup } from './index';

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
      if (data.hits.length === 0) {
        alert(
          `Too many matches ${data.hits} found. Please enter a more specific name.`
        );
      } else {
        const item = createImageMarkup(data.hits);
        refs.galleryInfo.insertAdjacentHTML('beforeend', item);
        //console.log(item);
      }
    })
    .catch(er => {
      if (!er.ok) {
        throw new Error(er.status);
      }
    });
