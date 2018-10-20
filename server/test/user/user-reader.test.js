const expect = require('chai').expect;
const userReader = require('../../src/services/users/user-reader');

const twitchUserData = {
  _id: '5bca5942aadf132430d3a021',
  twitchId: '123123121221',
  twitch: {
    profile: {
      id: '123123121221',
      login: 'username',
      display_name: 'DisplayName',
      type: '',
      broadcaster_type: 'affiliate',
      description: 'Seu noob favorito!',
      profile_image_url: 'a_profile_picture_url',
      offline_image_url: '',
      view_count: 15170,
      email: 'romulobr@gmail.com',
      provider: 'twitch.js'
    },
    accessToken: 'an_acess_token',
    refreshToken: 'a_refresh_token'
  }
};

const youtubeUserData = {
  '_id': '5bca60cff5f59e4a20bb0741',
  'youtubeId': 'an_youtube_channel_id',
  'youtube': {
    'profile': {
      'provider': 'youtube',
      'id': 'an_youtube_channel_id',
      'displayName': 'Display Name',
      '_json': {
        'items': [
          {
            'id': 'an_youtube_channel_id',
            'snippet': {
              'title': 'Display Name',
              'thumbnails': {
                'medium': {
                  'url': 'a_profile_picture_url',
                  'width': 240,
                  'height': 240
                }
              },
            }
          }
        ]
      }
    },
    'accessToken': 'an_acess_token',
    'refreshToken': 'a_refresh_token'
  }
};

describe('user reader', () => {
  
  it('reads a simplified twitch user profile data from a server response', () => {
    const user = userReader.getSimplifiedUserIn(twitchUserData);
    expect(user.origin).to.equal('twitch');
    expect(user.name).to.equal('username');
    expect(user.displayName).to.equal('DisplayName');
    expect(user.profilePictureUrl).to.equal('a_profile_picture_url');
    expect(user.accessToken).to.not.exist;
    expect(user.refreshToken).to.not.exist;
  });

  it('reads a twitch user profile data from a server response', () => {
    const user = userReader.getUserIn(twitchUserData);
    expect(user.origin).to.equal('twitch');
    expect(user.name).to.equal('username');
    expect(user.displayName).to.equal('DisplayName');
    expect(user.profilePictureUrl).to.equal('a_profile_picture_url');
    expect(user.id).to.equal('123123121221');
    expect(user.accessToken).to.equal('an_acess_token');
    expect(user.refreshToken).to.equal('a_refresh_token');
  });

  it('reads a simplified youtube user profile data from a server response', () => {
    const user = userReader.getSimplifiedUserIn(youtubeUserData);
    expect(user.origin).to.equal('youtube');
    expect(user.name).to.equal('Display Name');
    expect(user.displayName).to.equal('Display Name');
    expect(user.profilePictureUrl).to.equal('a_profile_picture_url');
    expect(user.accessToken).to.not.exist;
    expect(user.refreshToken).to.not.exist;
  });

  it('reads a youtube user profile data from a server response', () => {
    const user = userReader.getUserIn(youtubeUserData);
    expect(user.origin).to.equal('youtube');
    expect(user.name).to.equal('Display Name');
    expect(user.displayName).to.equal('Display Name');
    expect(user.profilePictureUrl).to.equal('a_profile_picture_url');
    expect(user.id).to.equal('an_youtube_channel_id');
    expect(user.accessToken).to.equal('an_acess_token');
    expect(user.refreshToken).to.equal('a_refresh_token');
  });

});
