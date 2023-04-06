import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const refs = {
  formSearch: document.querySelector('.search-form'),
  buttonSearch: document.querySelector('.search-button'),
  inputSearch: document.querySelector('.search-input'),
  galleryInfo: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let name = refs.inputSearch.value;
let perPage = 40;
let page = 1;

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34983998-155dfb76bac09cdf48f99cd2f';

async function fetchImages(name, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function enterDataSearchImage(event) {
  event.preventDefault();
  page = 1;
  refs.galleryInfo.innerHTML = '';

  name = refs.inputSearch.value.trim();

  fetchImages(name, page)
    .then(name => {
      let totalPages = Math.ceil(name.totalHits / perPage);

      if (name.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${name.totalHits} images.`);
        createImageMarkup(name);

        let lightbox = new SimpleLightbox('.gallery a');
        lightbox.refresh();

        if (page < totalPages) {
          refs.loadMoreBtn.classList.add('vissible');
          console.log('qwqwqw');
        } else {
          refs.loadMoreBtn.classList.remove('vissible');
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(error => console.log(error));
}

refs.formSearch.addEventListener('submit', enterDataSearchImage);

function createImageMarkup(name) {
  const markup = name.hits
    .map(hit => {
      return `<div class="photo-card">
  <a class="image-link" href="${hit.largeImageURL}">
  <img class="photo" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width="320" height="240" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${hit.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
       <span>${hit.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
       <span>${hit.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
       <span>${hit.downloads}</span>
    </p>
  </div>
</div>`;
    })
    .join('');
  refs.galleryInfo.insertAdjacentHTML('beforeend', markup);
}

function addDataSearchImage() {
  name = refs.inputSearch.value.trim();
  page += 1;
  fetchImages(name, page).then(name => {
    let totalPages = Math.ceil(name.totalHits / perPage);
    createImageMarkup(name);
    let lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();

    if (page >= totalPages) {
      refs.loadMoreBtn.classList.remove('vissible');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

refs.loadMoreBtn.addEventListener('click', addDataSearchImage);
