export function addLoader(element) {
  const loaderHTML = '<span class="loader"></span>';

  element.insertAdjacentHTML('afterend', loaderHTML);
}

export function removeLoader() {
  const loader = document.querySelector('.loader');

  if (loader) {
    loader.remove();
  }
}

export function markup(data) {
  return data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
            <li class="gallery-item hvr-grow">
              <a class="gallery-link" href="${largeImageURL}">
                <img
                  class="gallery-image"
                  src="${webformatURL}"
                  alt="${tags}"
                  loading="lazy"
              /></a>
              <ul class="img-content-wrapper">
                <li class="img-content-descr">Likes<span>${likes}</span></li>
                <li class="img-content-descr">Views<span>${views}</span></li>
                <li class="img-content-descr">Comments<span>${comments}</span></li>
                <li class="img-content-descr">Downloads<span>${downloads}</span></li>
              </ul>
            </li>
      `
    )
    .join('');
}
