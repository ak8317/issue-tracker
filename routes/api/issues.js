const express = require('express');
const User = require('../../models/User');
const Issues = require('../../models/Issues');
const router = express.Router();
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

//route POST api/issues
//@desc create issues
//@access private
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('owner', 'Owner is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, title, owner } = req.body;
    try {
      //See if User exists
      const user_id = mongoose.mongo.ObjectId(id);
      let user = await User.findOne({ _id: user_id });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Access denied' }] });
      }
      let issues = new Issues({
        user: id,
        title: title,
        owner: owner,
      });
      const issue = await issues.save();
      if (!issue) {
        return res.status(500).send('Server error');
      }
      res.json(issue);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route Get api/issues/
//@desc get all Issues
//@access Private
router.get('/', async (req, res) => {
  try {
    let issues = await Issues.find();
    if (issues) res.json(issues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
