import { fetchImages } from './fetchImages';

export const refs = {
  formSearch: document.querySelector('.search-form'),
  buttonSearch: document.querySelector('.search-button'),
  inputSearch: document.querySelector('.search-input'),
  galleryInfo: document.querySelector('.gallery'),
};

const enterDataSearchImage = event => {
  event.preventDefault();

  const searchImage = refs.inputSearch.value.trim();

  fetchImages(searchImage);
  console.log(searchImage);
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
  <img class="photo" src="${largeImageURL}" alt="${tags}" loading="lazy" width="100" </a>
  heigth="100 />
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
