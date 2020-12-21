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
//@route Get api/issues/:id
//@desc get one Issues
//@access Private
router.get('/:id', async (req, res) => {
  let issueId;

  try {
    issueId = mongoose.mongo.ObjectId(req.params.id);
  } catch (err) {
    return res.status(422).json({ message: `Invalid issue Id format:${err}` });
  }
  Issues.findOne({ _id: issueId })
    .then((issue) => {
      if (!issue) {
        res.status(404).json({ message: `No such issue: ${issueId}` });
      } else {
        res.json(issue);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: `Internal Server Error: ${err}` });
    });
});

//@route Put api/issues/:id
//@desc update issue
//@access Public
router.put('/:id', (req, res) => {
  let issueId;

  try {
    issueId = mongoose.mongo.ObjectId(req.params.id);
  } catch (err) {
    return res.status(422).json({ message: `Invalid issue Id format:${err}` });
  }
  const issue = req.body;
  //console.log(issue)
  //issue.created=new Date()
  issue.completionDate = issue.completionDate
    ? new Date(issue.completionDate)
    : '';
  console.log(issue.completionDate);
  Issues.findOneAndUpdate({ _id: issueId }, issue, { new: true })
    .then((issue) => {
      res.json(issue);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: `Internal Server Error: ${err}` });
    });
});

//@route Delete api/issues/:id
//@desc Delete issue
//@access Public
router.delete('/:id', (req, res) => {
  let issueId;

  try {
    issueId = mongoose.mongo.ObjectId(req.params.id);
  } catch (err) {
    return res.status(422).json({ message: `Invalid issue Id format:${err}` });
  }
  Issues.findOneAndDelete({ _id: issueId })
    .then((deleteIssue) => {
      if (deleteIssue) res.json(deleteIssue);
      else res.json({ status: 'Warning:object not found' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: `Internal Server Error: ${err}` });
    });
});

module.exports = router;
