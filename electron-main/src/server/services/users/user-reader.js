const getUserIn = data => {
  if (data.origin) {
    return data;
  }
  if (data.twitch) {
    return getTwitchUserIn(data);
  } else if (data.youtube) {
    return getYoutubeUserIn(data);
  }
  return data;
};

const getSimplifiedUserIn = data => {
  if (data.twitch) {
    return getSimplifiedTwitchUserIn(data);
  } else if (data.youtube) {
    return getSimplifiedYoutubeUserIn(data);
  }
  return null;
};

const getSimplifiedYoutubeUserIn = data => {
  return {
    origin: "youtube",
    name: data.youtube.profile.displayName,
    displayName: data.youtube.profile.displayName,
    profilePictureUrl:
    data.youtube.profile._json.items[0].snippet.thumbnails.medium.url
  };
};

const getYoutubeUserIn = data => {
  const simplifiedUser = getSimplifiedYoutubeUserIn(data);
  return {
    ...simplifiedUser,
    id: data.youtubeId,
    accessToken: data.youtube.accessToken,
    refreshToken: data.youtube.refreshToken
  };
};

const getSimplifiedTwitchUserIn = data => {
  return {
    _id: data._id,
    origin: "twitch",
    name: data.twitch.profile.login,
    displayName: data.twitch.profile.display_name,
    profilePictureUrl: data.twitch.profile.profile_image_url
  };
};

const getTwitchUserIn = data => {
  const simplifiedUser = getSimplifiedTwitchUserIn(data);
  return {
    ...simplifiedUser,
    id: data.twitch.profile.id,
    accessToken: data.twitch.accessToken,
    refreshToken: data.twitch.refreshToken
  };
};

module.exports = {
  getUserIn,
  getSimplifiedUserIn
};
