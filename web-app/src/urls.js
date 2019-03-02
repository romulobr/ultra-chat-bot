const server = 'http://localhost:62619';
const api = `${server}/api/`;

const settingsUrlFor = (key) => {
    return `${server}/api/${key}`;
};
const settingsFileUrlFor = (key) => {
    return `${server}/settings-file/${key}`;
};

const mediaApi = settingsUrlFor('media');
const iconsApi = settingsUrlFor('icons');
const chickenApi = settingsUrlFor('chicken');
const welcomeApi = settingsUrlFor('welcome');
const userApi = settingsUrlFor('users');
const newsApi = settingsUrlFor('news');
const loyaltyApi = settingsUrlFor('loyalty');

const messageApi = `${server}/message`;
const streamElementsTokenApi = settingsUrlFor('stream-elements-token');
const streamLabsDataApi = settingsUrlFor('streamlabs');
const mediaUrl = `${server}/media`;
const streamElementsApiCheck = 'https://api.streamelements.com/kappa/v2/users/current';
const youtubeBroadcastsApi = `${server}/youtube-broadcasts`;
const settingsFileApi = `${server}/settings-file`;

export {settingsUrlFor};
export {settingsFileUrlFor};
export {server};
export {api};
export {mediaApi};
export {mediaUrl};
export {userApi};
export {messageApi};
export {streamElementsTokenApi};
export {streamElementsApiCheck};
export {youtubeBroadcastsApi};
export {chickenApi};
export {streamLabsDataApi};
export {iconsApi};
export {settingsFileApi};
export {welcomeApi};
export {newsApi};
export {loyaltyApi};

export default {
    settingsUrlFor,
    settingsFileUrlFor,
    server,
    api,
    mediaApi,
    userApi,
    messageApi,
    mediaUrl,
    streamElementsTokenApi,
    streamElementsApiCheck,
    youtubeBroadcastsApi,
    chickenApi,
    streamLabsDataApi,
    settingsFileApi,
    welcomeApi,
    newsApi,
    loyaltyApi
};
