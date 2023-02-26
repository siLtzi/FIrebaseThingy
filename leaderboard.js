const mongoose = require('mongoose');
const { Schema } = mongoose;

const mongoURI = // MongoDB URI/URL here

// Define schema for leaderboard collection
const leaderboardSchema = new Schema({
  userName: String,
  firstPlace:  Number,
  secondPlace: Number,
  thirdPlace: Number,
  points: Number
});

const Leaderboard = mongoose.model('leaderboards', leaderboardSchema);

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB successfully');

    // Get leaderboard data from MongoDB using Mongoose
    const leaderboardData = await Leaderboard.find().sort({ points: -1 });

    // Update the leaderboard table with the retrieved data
    const leaderboardTable = document.getElementById('leaderboard-data');

    leaderboardData.forEach((entry, index) => {
      const rank = index + 1;
      const userName = entry.userName;
      const firstPlace = entry.firstPlace;
      const secondPlace = entry.secondPlace;
      const thirdPlace = entry.thirdPlace;
      const totalPoints = entry.points;

      const row = leaderboardTable.insertRow(-1);
      const rankCell = row.insertCell(0);
      const usernameCell = row.insertCell(1);
      const firstPlaceCell = row.insertCell(2);
      const secondPlaceCell = row.insertCell(3);
      const thirdPlaceCell = row.insertCell(4);
      const totalPointsCell = row.insertCell(5);

      rankCell.innerText = rank;
      usernameCell.innerText = userName;
      firstPlaceCell.innerText = firstPlace;
      secondPlaceCell.innerText = secondPlace;
      thirdPlaceCell.innerText = thirdPlace;
      totalPointsCell.innerText = totalPoints;
    });
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
  }
}

// Call the connectToMongo function to establish the connection
connectToMongo();

fetch('/leaderboards')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.log(error));
