const mongoose = require('mongoose');

// Define a schema for your data model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Define a model based on the schema
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://Arief:mohamedarief0110@cluster0.fxaqdtw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Once connected, create a new user document (which will create the 'users' collection)
    return User.create({ username: 'example', email: 'example@example.com', password: 'password' });
  })
  .then(() => {
    console.log('User created successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
