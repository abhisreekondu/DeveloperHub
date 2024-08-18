const express = require('express');
const devuser = require('./usermodels');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const middleware = require('./middleware');
const reviewmodel = require('./reviewmodel');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:admin@backenddb.7wgh4tq.mongodb.net/")
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.log(err));

app.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, skill, password, confirmpassword } = req.body;

    
    if (password !== confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await devuser.findOne({ email });
    if (existingUser) {
      return res(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new devuser({
      name,
      email,
      mobile,
      skill,
      password,
      confirmpassword // Ensure this matches the schema
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await devuser.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    if (user.password !== password) {
      return res.status(400).send("Invalid password");
    }
    let payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, 'jwtpassword', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.get('/allprofiles', middleware, async (req, res) => {
  try {
    let allprofiles = await devuser.find();
    return res.json(allprofiles);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.get('/myprofile', middleware, async (req, res) => {
  try {
    let user = await devuser.findById(req.user.id);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.post('/addreview', middleware, async (req, res) => {
  try {
   
    const { taskworker, rating } = req.body;
    const exist = await devuser.findById(req.user.id);
    const newReview = new reviewmodel({
      taskprovider: exist.name,
      taskworker, rating
    });
    newReview.save();
    return res.status(200).send("Review added successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.get('/myreview', middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    let myreviews = await reviewmodel.find({ taskworker: userId});
    return res.status(200).json(myreviews);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.get('/reviews/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    let reviews = await reviewmodel.find({ taskworker: userId });
    return res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});







app.listen(5000, () => console.log("Server listening on port 5000"));