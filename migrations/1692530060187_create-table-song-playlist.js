/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('songs_playlists', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'playlists(id)',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'songs(id)',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
  });

  pgm.addConstraint('songs_playlists', 'unique_song_playlist_playlist_id_and_song_id', 'UNIQUE(playlist_id, song_id)');
};

exports.down = (pgm) => {
  pgm.dropTable('songs_playlists');
};
