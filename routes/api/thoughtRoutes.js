const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  deleteSingleThought,
  updateSingleThought,
  addSingleReaction,
  deleteSingleReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

router.route('/addThought').post(createThought);

router.route('/delete/:thoughtId').delete(deleteSingleThought);

router.route('/update/:thoughtId').put(updateSingleThought);

router.route('/:thoughtId/reactions').post(addSingleReaction).delete(deleteSingleReaction);

module.exports = router;
