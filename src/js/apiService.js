export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImg() {
    const API_KEY = '19086607-f63ea5bac9dbca697b9469f63';
    const BASE_URL = 'https://pixabay.com/api/';

    return fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    )
      .then(response => response.json())
      .then(({ hits }) => {
        this.increment();
        return hits;
      });
  }

  increment() {
    this.page += 1;
  }

  reset() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}