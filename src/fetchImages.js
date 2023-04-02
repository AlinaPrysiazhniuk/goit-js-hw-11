import { refs } from './index';
import { createImageMarkup } from './index';
import Notiflix from 'notiflix';
import { enterDataSearchImage } from './index';

export const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34983998-155dfb76bac09cdf48f99cd2f';
let page = 1;
let perPage = 40;

export const fetchImages = name =>
  fetch(
    `${BASE_URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      const imagesSearch = data.hits;
      let totalPage = data.totalHits / perPage;
      console.log(totalPage);

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
        refs.loadMoreBtn.addEventListener('click', () => {
          page += 1;
          const item = createImageMarkup(data.hits);
          refs.galleryInfo.insertAdjacentHTML('beforeend', item);
        });
      }
    })
    .catch(er => {
      if (!er.ok) {
        throw new Error(er.status);
      }
    });
