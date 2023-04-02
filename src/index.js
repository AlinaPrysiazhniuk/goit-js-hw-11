import { fetchImages } from './fetchImages';
import { BASE_URL } from './fetchImages';
import { JSONPlaceholderAPI } from './pagination';
import { fetchImages } from './fetchImages';
import { handleImages } from './pagination';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
  formSearch: document.querySelector('.search-form'),
  buttonSearch: document.querySelector('.search-button'),
  inputSearch: document.querySelector('.search-input'),
  galleryInfo: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.gallery a');

const enterDataSearchImage = event => {
  event.preventDefault();
  const searchImage = refs.inputSearch.value.trim();

  if (!searchImage) {
    refs.galleryInfo.innerHTML = '';
    return;
  }
  fetchImages(searchImage);
};

refs.formSearch.addEventListener('submit', enterDataSearchImage);

export function createImageMarkup(item) {
  return item
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <a class="image-link" href="${webformatURL}">
  <img class="photo" src="${largeImageURL}" alt="${tags}" loading="lazy" width="200" height="150" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
       <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
       <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
       <span>${downloads}</span>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
}
