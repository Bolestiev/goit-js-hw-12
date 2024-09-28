import { getGalleryData } from './js/pixabay-api';

import { addLoader, removeLoader, markup } from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');

const gallery = document.querySelector('.gallery');

const loadMoreBtn = document.querySelector('.load-more-button');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let searchValue = '';
let page = 1;
let totalHits = 0;
let shouldSmoothScroll = false;

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', onSubmitForm);

loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmitForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { search } = Object.fromEntries(formData.entries());
  searchValue = search.trim();

  if (!searchValue) {
    iziToast.error({
      title: 'Error',
      message: 'The search query is empty.',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  addLoader(form);

  fetchGalleryData();
}

async function fetchGalleryData() {
  try {
    const data = await getGalleryData(searchValue, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        position: 'topRight',
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    const galleryMarkup = markup(data);
    gallery.insertAdjacentHTML('beforeend', galleryMarkup);

    lightbox.refresh();

    if (page * 15 >= totalHits) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error('Помилка:', error);
    iziToast.error({
      title: 'Error',
      message: `Error: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    removeLoader();
    if (shouldSmoothScroll) {
      smoothScroll();
      shouldSmoothScroll = false;
    }
  }
}

function onLoadMore() {
  page += 1;

  loadMoreBtn.style.display = 'none';
  addLoader(loadMoreBtn);

  shouldSmoothScroll = true;

  fetchGalleryData();
}

function smoothScroll() {
  const firstGalleryItem = document.querySelector('.gallery-item');

  if (firstGalleryItem) {
    const cardHeight = firstGalleryItem.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
