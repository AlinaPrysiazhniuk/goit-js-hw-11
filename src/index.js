import { fetchImages } from './fetchImages';

const refs = {
  formSearch: document.querySelector('.search-form'),
  buttonSearch: document.querySelector('.search-button'),
};

const enterDataSearchImage = event => {
  event.preventDefault();

  fetchImages(name);
  console.log('qwqw');
};

refs.formSearch.addEventListener('submit', enterDataSearchImage);
