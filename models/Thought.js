const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,              // Thought text is required
      minlength: 1,                // Minimum length of 1 character
      maxlength: 280,              // Maximum length of 280 characters
    },
    createdAt: {
      type: Date,
      default: Date.now,           // Default value is the current timestamp
      get: (timestamp) => new Date(timestamp).toLocaleDateString(),  // Getter to format date
    },
    username: {
      type: String,
      required: true,              // The user who created this thought is required
    },
    reactions: [reactionSchema],    // Array of nested documents using the Reaction schema
  },
  {
    toJSON: {
      virtuals: true,               // Include virtuals in JSON responses
      getters: true,                // Apply getter method for formatting createdAt
    },
    id: false,                      // Disable the default `_id` field
  }
);

// Virtual to calculate reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;