const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,      // Ensures each username is unique
      required: true,    // Username is required
      trimmed: true,     // Removes extra spaces
    },
    email: {
      type: String,
      required: true,    // Email is required
      unique: true,      // Ensures each email is unique
      match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email validation
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,  // Refers to the Thought model (ObjectId)
        ref: 'Thought',               // Reference to the Thought model
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,  // Refers to the User model itself (self-reference)
        ref: 'User',                  // Reference to the User model
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,  // Ensures virtuals are included in the JSON response
    },
    id: false,        // Disables the default `id` field
  }
);

// Virtual to get the number of friends a user has
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model using the userSchema
const User = model('User', userSchema);

module.exports = User;