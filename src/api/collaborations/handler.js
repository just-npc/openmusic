const autoBind = require('auto-bind');

class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, usersService, validator) {
    this._service = collaborationsService;
    this._playlistsService = playlistsService;
    this._usersService = usersService;
    this._validator = validator;

    autoBind(this);
  }

  async postCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);

    const { userId: owner } = request.auth.credentials;
    const { playlistId, userId } = request.payload;

    await this._service.verifyPlaylistOwner(playlistId, owner);
    await this._usersService.getUserById(userId);
    const collborationId = await this._service.addCollaboration(playlistId, userId);

    const response = h.response({
      status: 'success',
      message: 'Kolaborasi berhasil ditambahkan',
      data: {
        collborationId,
      },
    });

    response.code(201);
    return response;
  }

  async deleteCollaborationHandler(request) {
    await this._validator.validateCollaborationPayload(request.payload);

    const { userId: owner } = request.auth.credentials;
    const { playlistId, userId } = request.payload;

    await this._playlistsService.verifyPlaylistOwner(playlistId, owner);
    await this._service.deleteCollaboration(playlistId, userId);

    return {
      status: 'success',
      message: 'Kolaborasi berhaasil dihapus!',
    };
  }
}

module.exports = CollaborationsHandler;
