import { fetchImages } from './fetchImages';

const refs = {
  formSearch: document.querySelector('.search-form'),
  buttonSearch: document.querySelector('.search-button'),
  inputSearch: document.querySelector('.search-input'),
};

const enterDataSearchImage = event => {
  event.preventDefault();

  const searchImage = refs.inputSearch.value.trim();

  fetchImages(searchImage);
  console.log(searchImage);
};

refs.formSearch.addEventListener('submit', enterDataSearchImage);
