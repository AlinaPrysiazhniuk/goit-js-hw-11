import { refs } from './index';
import { createImageMarkup } from './index';
import Notiflix from 'notiflix';
import { PaginationImage } from './pagination';

export const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34983998-155dfb76bac09cdf48f99cd2f';

const paginationApi = new PaginationImage();

export const fetchImages = name =>
  fetch(
    `${BASE_URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.info(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      } else {
        const item = createImageMarkup(data.hits);
        refs.galleryInfo.insertAdjacentHTML('beforeend', item);
        paginationApi.page += 1;

        //refs.loadMoreBtn.classList.add('vissible');
      }
    })
    .catch(er => {
      if (!er.ok) {
        throw new Error(er.status);
      }
    });
