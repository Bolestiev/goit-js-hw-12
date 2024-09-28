import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';

const API_KEY = '45713433-433c1b648e48abad27090f3cc';

export async function getGalleryData(queryValue, page = 1, perPage = 15) {
  try {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: queryValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: perPage,
    });

    const response = await axios.get(`${API_URL}?${searchParams}`);

    return response.data;
  } catch (error) {
    console.error('Помилка під час отримання даних:', error);
    throw error;
  }
}
