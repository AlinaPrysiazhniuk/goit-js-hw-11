export class JSONPlaceholderAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  page = 1;
  count = 50;

  fetchPosts() {
    return fetch(
      `${this.#BASE_URL}/posts?_limit=${this.count}&_page=${this.page}`
    ).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    });
  }
}
