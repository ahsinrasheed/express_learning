/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A tour Name must have less or equal then 40 characters'], 
        minlength: [10, 'A tour Name must have less or equal then 10 characters'], 
        // validator : [validator.isAlpha, ' A tour name must only contain characters']
    },
    slug: String,
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
        enum: {
            values: ['easy', 'medium', 'difficulty'],
            message: 'Difficulty is either: easy, medium or difficulty',
        }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                // This only points to current do on NEW document Creation...
                return val < this.price;
            },
            message: "Discount Price ({VALUE}) should  be below the regular price..",
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a Summary '],
    },
    description: {
        type: String,
        trim: true,
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a Cover Image'],
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select : false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false,
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    
  });
  
tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});
// DOCUMENT MIDDLEWARE : run before .save() and .create();

tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})

// tourSchema.pre('save', function (next) {
//     console.log('Will save document...');
//     next();
// })


// // Run AFTER ALL MIDDLEWARE FUNCTION CALL
// tourSchema.post('save', function (doc, next) {
//     console.log(doc);
//     next();
// })

// QUERY MIDDLEWARE ::

tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });
    this.start = Date.now();
    next();
});

tourSchema.post(/^find/, function(docs, next) {
    console.log(`Query tool ${Date.now() - this.start} milliseconds`);  
    next();
});

// Aggregation MIDDLEWARE

tourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    console.log(this);
    next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
