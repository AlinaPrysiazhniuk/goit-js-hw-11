import { refs } from './index';
import { createImageMarkup } from './index';
import Notiflix from 'notiflix';

export const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34983998-155dfb76bac09cdf48f99cd2f';

export const fetchImages = name =>
  fetch(
    `${BASE_URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      const imagesSearch = data.hits;

      //console.log(imagesSearch.length);
      //console.log(imagesSearch);
      if (imagesSearch.length === 0) {
        Notiflix.Notify.info(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        refs.galleryInfo.innerHTML = '';
        const item = createImageMarkup(data.hits);
        refs.galleryInfo.insertAdjacentHTML('beforeend', item);
      }
    })
    .catch(er => {
      if (!er.ok) {
        throw new Error(er.status);
      }
    });
// export const fetchImages = name =>
//   fetch(
//     `${BASE_URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
//   )
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       const imagesSearch = data.hits;

//       //console.log(imagesSearch.length);
//       //console.log(imagesSearch);
//       if (imagesSearch.length === 0) {
//         Notiflix.Notify.info(
//           `Sorry, there are no images matching your search query. Please try again.`
//         );
//       } else {
//         const item = createImageMarkup(data.hits);
//         refs.galleryInfo.insertAdjacentHTML('beforeend', item);
//       }
//     })
//     .catch(er => {
//       if (!er.ok) {
//         throw new Error(er.status);
//       }
//     });
