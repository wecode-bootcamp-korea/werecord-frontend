const BASE_URL = 'http://192.168.0.14:8000';
const API_URLS = {
  SIGNIN: `${BASE_URL}/users/info`,
  LOGIN: `${BASE_URL}/users/login`,
  MENTOR_PAGE: `${BASE_URL}/users/batchlist`,
  MENTOR_INFO: `${BASE_URL}/users/info`,
  BATCH_PAGE: `${BASE_URL}/users/batch`,
  BATCH_MANAGEMENT: `${BASE_URL}/users/batch-manager`,
  MAIN: `${BASE_URL}/records`,
  MY_PAGE: `${BASE_URL}/users/student`,
  EDIT_PROFILE: `${BASE_URL}/users/info`,
  BATCH: `${BASE_URL}/users/batch`,
};
export default API_URLS;
