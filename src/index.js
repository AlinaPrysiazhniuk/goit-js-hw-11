import { fetchImages } from './fetchImages';
//mport { PaginationImage } from './pagination';

export const refs = {
  formSearch: document.querySelector('.search-form'),
  buttonSearch: document.querySelector('.search-button'),
  inputSearch: document.querySelector('.search-input'),
  galleryInfo: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const enterDataSearchImage = event => {
  event.preventDefault();

  const searchImage = refs.inputSearch.value.trim();

  fetchImages(searchImage);
};

refs.formSearch.addEventListener('submit', enterDataSearchImage);
refs.loadMoreBtn.addEventListener('click', enterDataSearchImage);

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
  <img class="photo" src="${largeImageURL}" alt="${tags}" loading="lazy" width="200" height="150"</a>
  
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
