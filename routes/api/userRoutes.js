const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteSingleUser,
  updateSingleUser,
  addSingleFriend,
  deleteSingleFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

router.route('/delete/:userId').delete(deleteSingleUser);

router.route('/update/:userId').put(updateSingleUser);

router.route('/:userId/friends/:friendId').post(addSingleFriend).delete(deleteSingleFriend);

module.exports = router;
