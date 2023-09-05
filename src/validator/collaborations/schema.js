const Joi = require('joi');

const CollaborationPayloadSchema = Joi.object({
  playlistId: Joi.object().required(),
  userId: Joi.object().required(),
});

module.exports = CollaborationPayloadSchema;
