const { Schema, model } = require('mongoose');
const  ObjectID = require('mongodb').ObjectId;

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;