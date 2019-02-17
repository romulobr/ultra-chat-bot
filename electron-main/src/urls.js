const server = 'http://localhost:62619';
const api = `${server}/api`;
const mediaApi = `${server}/api/media`;
const iconsApi = `${server}/api/icons`;
const chickenApi = `${server}/api/chicken`;
const welcomeApi = `${server}/api/welcome`;
const welcomeMessagesApi = `${server}/api/welcome-messages`;
const userApi = `${server}/api/users`;
const media = `${server}/media`;
const messageApi = `${server}/message`;
const streamlabsDataApi = `${server}/api/streamlabs`;
const streamElementsTokenApi = `${server}/api/stream-elements-token`;
const streamElementsApiCheck = `https://api.streamelements.com/kappa/v2/users/current`;
const newsApi = `${server}/api/news`;
const loyaltyApi = `${server}/api/loyalty`;
const loyaltyProfileApi = `${server}/api/loyalty-profile`;

module.exports = {
  server,
  api,
  mediaApi,
  iconsApi,
  userApi,
  media,
  messageApi,
  streamElementsApiCheck,
  streamElementsTokenApi,
  chickenApi,
  welcomeApi,
  streamlabsDataApi,
  welcomeMessagesApi,
  newsApi,
  loyaltyApi,
  loyaltyProfileApi
};
