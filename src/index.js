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
let page = 0;

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34983998-155dfb76bac09cdf48f99cd2f';

async function fetchImages(name, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    //console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function enterDataSearchImage(event) {
  event.preventDefault();
  refs.galleryInfo.innerHTML = '';
  page = 1;
  name = refs.inputSearch.value.trim();

  //console.log(name);
  fetchImages(name, page)
    .then(name => {
      //console.log(`Number of arrays: ${name.hits.length}`);
      //console.log(`Total hits: ${name.totalHits}`);
      let totalPages = Math.ceil(name.totalHits / perPage);
      // console.log(`Total pages: ${totalPages}`);

      if (name.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${name.totalHits} images.`);
        createImageMarkup(name);

        //console.log(`Current pages: ${page}`);

        new SimpleLightbox('.gallery a');

        if (page < totalPages) {
          console.log('qwqwqw');
        } else {
          // console.log('There are no more images');
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
//const searchImage = refs.inputSearch.value.trim();

//   refs.inputSearch.addEventListener('input', () => {
//     if (searchImage === '') {
//       refs.galleryInfo.innerHTML = '';
//       return;
//     }
//   });

//   fetchImages(searchImage);
// }

//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       const imagesSearch = data.hits;
//       let totalPage = data.totalHits / perPage;
//       // console.log(totalPage);

//       if (imagesSearch.length === 0) {
//         Notiflix.Notify.info(
//           `Sorry, there are no images matching your search query. Please try again.`
//         );
//       } else {
//         Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//         refs.galleryInfo.innerHTML = '';
//         const item = createImageMarkup(data.hits);

//         refs.galleryInfo.insertAdjacentHTML('beforeend', item);
//         const lightbox = new SimpleLightbox('.gallery a');

//         //addDataSearchImage();
//       }
//     })
//     .catch(er => {
//       if (!er.ok) {
//         throw new Error(er.status);
//       }
//     });
// }

// const addDataSearchImage = () => {
//   refs.loadMoreBtn.addEventListener('click', () => {
//     element = refs.inputSearch.value;

//     page += 1;
//     fetchImages(element);
//   });
// };

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

// refs.loadMoreBtn.addEventListener('click', () => {
//   name = refs.inputSearch.value.trim();
//   console.log('lklk');
//   page += 1;
//   fetchImages(name, page).then(name => {
//     let totalPage = data.totalHits / perPage;
//   });
// });

function addDataSearchImage() {
  name = refs.inputSearch.value.trim();
  //console.log('load more images');
  page += 1;
  fetchImages(name, page).then(name => {
    let totalPages = Math.ceil(name.totalHits / perPage);
    createImageMarkup(name);
    new SimpleLightbox('.gallery a');

    if (page >= totalPages) {
      // console.log('There are no more images');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

refs.loadMoreBtn.addEventListener('click', addDataSearchImage);
