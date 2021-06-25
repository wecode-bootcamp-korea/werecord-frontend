const BASE_URL = 'http://15.164.163.99:8000';
const API_URLS = {
  SIGNIN: `${BASE_URL}/users/info`,
  LOGIN: `${BASE_URL}/users/login`,
  MENTOR_PAGE: `${BASE_URL}/users/batchlist`,
  MENTOR_INFO: `${BASE_URL}/users/info`,
  BATCH_PAGE: `${BASE_URL}/users/batch`,
  BATCH_MANAGEMENT: `${BASE_URL}/users/batch-manager`,
  MAIN_PAGE: `${BASE_URL}/records`,
  MAIN_TIME_START: `${BASE_URL}/records/start`,
  MAUB_TINE_STOP: `${BASE_URL}/records/stop`,
  MY_PAGE: `${BASE_URL}/users/student`,
};
export default API_URLS;
