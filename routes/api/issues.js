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
router.get('/', (req, res) => {
  // if(req.query._summary===undefined){
  //   const offset=req.query._offset?parseInt(req.query._offset,10):0
  //   let limit=req.query._limit?parseInt(req.query._limit,10):20
  //   if(limit>50)limit=50
  //   const cursor=Issues.find().sort({_id:1}).skip(offset).limit(limit)
  //   let totalCount;
  //   cursor.count(false).then()
  // }
  let pageNo = parseInt(req.query.pageNo);
  let size = parseInt(req.query.size);
  let query = {};
  if (pageNo < 0 || pageNo === 0) {
    return res.json({
      error: true,
      message: 'Invalid page number,should start with 1',
    });
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  //find some documents
  Issues.countDocuments({}, function (err, totalCount) {
    if (err) {
      response = { error: true, message: 'Error fetching data' };
    }
    Issues.find({}, {}, query, function (err, data) {
      if (err) {
        response = { error: true, message: 'Error fetching data' };
      } else {
        let totalPages = Math.ceil(totalCount / size);
        response = {
          error: false,
          pages: totalPages,
          totalRecords: totalCount,
          message: data,
        };
      }
      res.json(response);
    });
  });

  // let issues = await Issues.find();
  // if (issues) res.json(issues);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send('Server error');
  // }
});
//@route Get api/issues/:page
//@desc get paginated issues
//@access Private
// router.get('/:page', function(req, res, next) {
//   let perPage = 6
//   let page = req.params.page || 1

//   Issues
//       .find({})
//       .skip((perPage * page) - perPage)
//       .limit(perPage)
//       .exec(function(err, issues) {
//           Issues.count().exec(function(err, count) {
//               if (err) return next(err)
//               res.render('main/products', {
//                   issues: issues,
//                   current: page,
//                   pages: Math.ceil(count / perPage)
//               })
//           })
//       })
// })
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
