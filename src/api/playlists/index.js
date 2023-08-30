const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlists',
  version: '2.0.0',
  register: async (
    server,
    {
      service, songsService, validator,
    // eslint-disable-next-line comma-dangle
    }
  ) => {
    const playlistsHandler = new PlaylistsHandler(service, songsService, validator);
    server.route(routes(playlistsHandler));
  },
};
