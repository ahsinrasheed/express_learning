const multer = require('multer');
const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// Upload the image file........
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an Image! Please Upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');


// const fs = require('fs');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// Route Handlers----
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1)  Create Error if user POSTs password Data,
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates! Please use /updateMyPassword',
        400
      )
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated.
  const filterBody = filterObj(req.body, 'name', 'email');
  // saving the photo file 
  if (req.file) filterBody.photo = req.file.filename;

  // 3) Update User Document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) =>
  res.status(500).json({
    status: 'error',
    message: 'This router is not defined! Please use/ signup instead',
  });

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// Do not update password with this!;
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
