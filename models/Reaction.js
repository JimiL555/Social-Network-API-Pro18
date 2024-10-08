const { Schema } = require('mongoose');

// Schema to create Reaction subdocument
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Schema.Types.ObjectId(),  // Generates a new ObjectId automatically
    },
    reactionBody: {
      type: String,
      required: true,            // Reaction text is required
      maxlength: 280,            // Maximum length of 280 characters
    },
    username: {
      type: String,
      required: true,            // Username of the person who created the reaction
    },
    createdAt: {
      type: Date,
      default: Date.now,         // Default value is the current timestamp
      get: (timestamp) => new Date(timestamp).toLocaleDateString(),  // Getter to format date
    },
  },
  {
    toJSON: {
      getters: true,             // Apply getter method to createdAt for formatted date
    },
    id: false,                   // Disable the default `_id` field
  }
);

module.exports = reactionSchema;