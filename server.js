const express = require('express');
const app = express();
const mongoose = require('mongoose');

const uri = // MongoDB URI/URL here

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((error) => console.log('Error connecting to MongoDB', error));

const leaderboardSchema = new mongoose.Schema({
  userName: String,
  firstPlace: Number,
  secondPlace: Number,
  thirdPlace: Number,
  points: Number
});

const Leaderboard = mongoose.model('leaderboards', leaderboardSchema);

app.get('/leaderboards', async (req, res) => {
  try {
    const leaderboardData = await Leaderboard.find().sort({ points: -1 });
    console.log(leaderboardData);
    res.render('leaderboards', { leaderboardData });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', __dirname + '/views'); // Set the views directory

app.listen(3000, () => console.log('Server listening on port 3000'));