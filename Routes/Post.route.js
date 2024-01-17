const express = require('express');
const router = express.Router();
const client = require('../client');
const Post = require('../Models/Post.model');

router.get('/', async (req, res, next) => {
  try {
    const cachedPosts = await client.get('posts');

    if (cachedPosts) {
      res.json(JSON.parse(cachedPosts));
    } else {
      const posts = await Post.find();
      await client.set('posts', JSON.stringify(posts));
      res.json(posts);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { content } = req.body;

    const words = content.split(/\s+/);
    const numberOfWords = words.length;
    const averageWordLength = words.reduce((total, word) => total + word.length, 0) / numberOfWords;

    const newPost = await Post.create({
      content,
      numberOfWords,
      averageWordLength,
    });

    await client.del('posts');

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/analysis', async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    const words = content.split(/\s+/);
    const numberOfWords = words.length;
    const averageWordLength = words.reduce((total, word) => total + word.length, 0) / numberOfWords;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        content,
        numberOfWords,
        averageWordLength,
      },
      { new: true }
    );

    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      res.json(updatedPost);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id/analysis', async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      res.json(post);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/analysis', async (req, res, next) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      res.json(deletedPost);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
