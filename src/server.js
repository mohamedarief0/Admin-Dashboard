const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/auth_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


















// const mongoose = require('mongoose');

// // Define a schema for your data model
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String
// });

// // Define a model based on the schema
// const User = mongoose.model('User', userSchema);

// // cmd Connect to MongoDB mongodb+srv://Arief:mohamedarief0110@cluster0.fxaqdtw.mongodb.net/

// mongoose.connect('mongodb+srv://Arief:mohamedarief0110@cluster0.fxaqdtw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Once connected, create a new user document (which will create the 'users' collection)
//     return User.create({ username: 'example', email: 'example@example.com', password: 'password' });
//   })
//   .then(() => {
//     console.log('User created successfully');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });




  // server.js

// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3001;
// const MONGODB_URI = process.env.MONGODB_URI;

// // Connect to MongoDB
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => console.error('Error connecting to MongoDB:', error));

// // Middleware
// app.use(express.json());

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello from Express');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });
