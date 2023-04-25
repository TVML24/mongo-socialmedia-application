const { Schema, model } = require('mongoose');
const  ObjectID = require('mongodb').ObjectId;
const Reaction = require('./Reaction');
const dayjs = require('dayjs');
var advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);


// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

function formatDate(date) {
  let newDate = dayjs(date);
  return newDate.format('MMM Do YYYY [at] h:MM A');
}

// Initialize our Post model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
