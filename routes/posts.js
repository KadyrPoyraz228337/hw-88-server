const path = require('path');
const express = require('express');
const PostsService = require('../services/posts');
const isAuth = require('../middlewares/isAuth');
const multer = require("multer");
const nanoid = require("nanoid");
const config = require("../config");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cd) => cd(null, config.uploadPath),
  filename: (req, file, cd) => cd(null, nanoid() + path.extname(file.originalname))
});
const upload = multer({storage});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const service = new PostsService();
    const post = await service.getPost(id);

    res.send(post);
  } catch (e) {
    res.status(500).send(e)
  }
});

router.get('/', async (req, res) => {
  try {
    const service = new PostsService();
    const posts = await service.getPosts();

    res.send(posts)
  } catch (e) {
    res.send(500).send(e)
  }
});

router.post('/', isAuth, upload.single('image'), async (req, res) => {
  try {
    let
      title = req.body.title,
      description = req.body.description,
      image = req.body.image,
      user = req.currentUser;

    if (req.file) image = req.file.filename;

    const service = new PostsService();
    const post = await service.addPost(title, description, image, user);

    res.send(post)
  } catch (e) {
    res.status(500).send(e)
  }
});

module.exports = router;