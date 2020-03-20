const express = require('express');
const CommentService = require('../services/comments');
const isAuth = require('../middlewares/isAuth');
const router = express.Router();

router.post('/', isAuth, (req, res) => {
  try {
    const
      id = req.body.id,
      text = req.body.text,
      user = req.currentUser._id;

    const service = new CommentService();
    const comment = service.addComment(id, user, text);
  } catch (e) {
    res.status(500).send(e)
  }
});

router.get('/:id', isAuth, async (req, res) => {
  try {
    const
      id = req.params.id;

    console.log(id);

    const service = new CommentService();
    const comments = await service.getComments(id);

    res.send(comments)
  } catch (e) {
    res.status(500).send(e)
  }
});

module.exports = router;