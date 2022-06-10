/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true,
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a Duration'],
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a Group Size'],
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a Difficulty'],
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
        type: Number,
        default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a Description'],
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a Cover Image'],
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    startDates: [Date],
    
  });
  
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

