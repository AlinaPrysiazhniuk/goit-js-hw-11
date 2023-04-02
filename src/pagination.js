import { BASE_URL } from './fetchImages';
//import axios from 'axios';

export class PaginationImage {
  #BASE_URL = 'https://pixabay.com/api/';
  page = 1;
  per_page = 40;

  fetchImages() {
    fetch(
      `${this.#BASE_URL}?_limit = ${this.per_page}& _page=${this.page}`
    ).then(responce => {
      if (!responce.ok) {
        throw new Error(responce.status);
      }
      return responce.json();
    });
  }
}

//   incrementPage() {
//     return (this.page += 1);
//   }

//   resetPage() {
//     return (this.page = 1);
//   }

//   setTotal(total) {
//     return (this.totalPages = total);
//   }

//   resetTotalPage() {
//     return (this.totalPages = 0);
//   }

//   hasMoreImages() {
//     return this.page === Math.ceil(this.totalPages / this.per_page);
//   }
