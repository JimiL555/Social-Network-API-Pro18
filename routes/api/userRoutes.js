const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getUsers)        // GET all users
  .post(createUser);     // POST a new user

// /api/users/:id
router.route('/:id')
  .get(getUserById)      // GET a single user by ID
  .put(updateUser)       // PUT to update a user by ID
  .delete(deleteUser);   // DELETE to remove a user by ID

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)       // POST to add a friend to the user's friend list
  .delete(removeFriend); // DELETE to remove a friend from the user's friend list

module.exports = router;