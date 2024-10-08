const { User, Thought } = require('../models');

// Controller for User actions
const userController = {

  // Get all users
  getUsers(req, res) {
    User.find({})
      .populate({ path: 'thoughts', select: '-__v' })  // Populate thoughts related to user
      .populate({ path: 'friends', select: '-__v' })   // Populate friends related to user
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a single user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({ path: 'thoughts', select: '-__v' })  // Populate thoughts related to user
      .populate({ path: 'friends', select: '-__v' })   // Populate friends related to user
      .select('-__v')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a new user
  createUser({ body }, res) {
    User.create(body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete user by ID and remove associated thoughts
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        // Remove user's thoughts
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted!' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend to a user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend from a user's friend list
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;