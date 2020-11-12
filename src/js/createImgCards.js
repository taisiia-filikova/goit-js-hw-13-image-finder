import cardsImgsTemplate from '../templates/imgCard.hbs';
import NewsApiService from './apiService.js';
import LoadBtn from './loadBtn.js';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  cardsList: document.querySelector('.gallery'),
};
const loadBtn = new LoadBtn({
  selector: '[data-action="load-btn"]',
  hidden: true,
});
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', searchImgs);
loadBtn.refs.btn.addEventListener('click', loadMore);
refs.cardsList.addEventListener('click', openModal);

function searchImgs(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return info({
      text: 'Enter something',
      delay: 1500,
      closerHover: true,
    });
  }

  loadBtn.show();
  newsApiService.resetPage();
  clearCards();
  fetchCards();
}

function fetchCards() {
  loadBtn.disable();
  return newsApiService.fetchCards().then(imgs => {
    addMarkup(imgs);
    loadBtn.enable();
    if (imgs.length === 0) {
      loadBtn.hide();
      error({
        text: 'Sorry. Nothing found :(',
        delay: 1500,
        closerHover: true,
      });
    }
  });
}

function addMarkup(imgs) {
  refs.cardsList.insertAdjacentHTML('beforeend', cardsImgsTemplate(imgs));
}

function clearCards() {
  refs.cardsList.innerHTML = '';
}

function openModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const largeImageURL = `<img src= ${e.target.dataset.source}>`;
  basicLightbox.create(largeImageURL).show();
}

function loadMore() {
  fetchCards()
    .then(
      setTimeout(() => {
        window.scrollBy({
          top: document.documentElement.clientHeight - 100,
          behavior: 'smooth',
        });
      }, 1000),
    )
    .catch(error => console.log(error));
}