const { Thought, User } = require('../models');

// Controller for Thought actions
const thoughtController = {

  // Get all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a single thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a new thought and associate it with a user
  createThought({ body }, res) {
    Thought.create(body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'Thought created but no user found with this id!' });
        }
        res.json({ message: 'Thought created successfully!' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought by ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought by ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        // Optionally, remove the thought from the user's thoughts array
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: 'Thought deleted!' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Remove a reaction from a thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;