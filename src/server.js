const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: albums,
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();