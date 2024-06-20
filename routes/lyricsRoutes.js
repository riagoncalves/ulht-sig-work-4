const passport = require('passport');
const router = require('express').Router();
const { isAuth } = require('../services/middleware');
const Lyric = require('../models/Lyric');

router.use(isAuth);

router.get('/', async (req, res) => {
  const lyrics = await Lyric.find({ userId: req.user.googleId });

  res.render('lyrics/index', {
    user: req.user,
    lyrics: lyrics
  });
});

router.get('/new', (req, res) => {
  res.render('lyrics/new', {
    user: req.user
  });
});

router.post('/create', async (req, res) => {
  const { title, description } = req.body;

  const lyric = new Lyric({
    userId: req.user.googleId,
    title,
    description
  });

  try {
    await lyric.save();
    res.redirect('/lyrics');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
    res.redirect('/lyrics/new');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const lyric = await Lyric.findOne({ _id: req.params.id, userId: req.user.googleId });

    if (!lyric) {
      return res.status(404).send('Lyric not found');
    }

    res.render('lyrics/show', {
      user: req.user,
      lyric: lyric
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/:id/edit', async (req, res) => {
  try {
    const lyric = await Lyric.findOne({ _id: req.params.id, userId: req.user.googleId });

    if (!lyric) {
      return res.status(404).send('Lyric not found');
    }

    res.render('lyrics/edit', {
      user: req.user,
      lyric: lyric
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id/update', async (req, res) => {
  try {
    const lyric = await Lyric.findOne({ _id: req.params.id, userId: req.user.googleId });
    const { title, description } = req.body;

    if (!lyric) {
      return res.status(404).send('Lyric not found');
    }

    lyric.title = title;
    lyric.description = description;

    await lyric.save();

    res.redirect('/lyrics');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id/delete', async (req, res) => {
  try {
    await Lyric.findByIdAndDelete(req.params.id);
    res.redirect('/lyrics');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;