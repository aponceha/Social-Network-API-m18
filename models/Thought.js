const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      default: ' ',
    },
    username: {
        type: String,
        required: true,
        maxlength: 50,
        default: 'Anonymous',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      // setters: true,
    },
    id: false,
  }
);
const Thought = model('thought', thoughtSchema);

module.exports = Thought;