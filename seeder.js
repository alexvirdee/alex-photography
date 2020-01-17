const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Load model
const Photograph = require('./models/Photograph');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON
const photographs = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/photographs.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Photograph.create(photographs);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete all data
const deleteData = async () => {
  try {
    await Photograph.deleteMany();

    console.log(`Data destroyed...`.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
