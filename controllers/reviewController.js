const Review = require('../models/reviewModel');
// const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

exports.getAllReview = catchAsync(async (req, res, next) => {
  //   const reviews = new APIFeatures(Review.find(), req.query);
  const reviews = await Review.find();
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
