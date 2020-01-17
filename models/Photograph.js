const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const PhotographSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add photo title'],
    unique: true,
    trim: true,
    maxLength: [80, 'Please create a shorter title name']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxLength: [500, 'Description cannot be more than 500 characters']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create photograph slug from name
PhotographSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Geocode & create location field
PhotographSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipCode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  // Not to save address in DB
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Photograph', PhotographSchema);
