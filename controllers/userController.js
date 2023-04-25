const User = require('../models/User');
const Thought = require('../models/Thoughts');
const { getThoughts } = require('./thoughtController');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    console.log(req);
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // async 
  async deleteSingleUser(req, res) {
    let thisUser = await User.findByIdAndDelete({ _id: req.params.userId })
    await Thought.deleteMany({ username: thisUser.username }, { new: true })
    .then((thisUser) =>
        !thisUser
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(thisUser)
    )
      .catch((err) => res.status(500).json(err));
  },
  updateSingleUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { username: req.body[0].username, email: req.body[0].email }, { new: true })
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user with that ID' })
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
  },
  addSingleFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId}, { $addToSet: { friends: req.params.friendId } }, { new: true })
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user with that ID' })
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
  },
  deleteSingleFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId}, { $pull: { friends: req.params.friendId } }, { new: true })
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user with that ID' })
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
  },

};
