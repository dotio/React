const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  // validate
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password width 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // if errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // get data
    const { name, email, password } = req.body;

    try {
      // compare by email
      let user = await User.findOne({ email });
      // if user exist
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      // if no, create new user
      user = new User({
        name,
        email,
        password
      });

      // incrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save user
      await user.save();

      // get token
      const payload = {
        user: { id: user.id }
      };

      // generate token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
