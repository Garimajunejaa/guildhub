const multer = require("multer");
const sharp = require("sharp");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/users");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  console.log("getMe middleware called, req.user:", req.user);
  if (!req.user) {
    return res.status(401).json({
      status: "fail",
      message: "User not authenticated",
    });
  }
  req.params.id = req.user.id;
  next();
};

const originalGetOne = factory.getOne(User, [
  { path: "team" },
  { path: "event", select: "name description" },
]);

exports.getUser = async (req, res, next) => {
  console.log("getUser controller called, req.params.id:", req.params.id);
  if (!req.user) {
    return res.status(401).json({
      status: "fail",
      message: "User not authenticated",
    });
  }
  try {
    const userId = req.params.id;
    let user = await User.findById(userId).populate([
      { path: "team" },
      { path: "event", select: "name description" },
    ]);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user found with that ID",
      });
    }
    // Add default photo if missing
    if (!user.photo) {
      user.photo = "default.jpg";
    } else if (!user.photo.startsWith("http")) {
      user.photo = `http://localhost:8080/img/users/${user.photo}`;
    } else if (user.photo.startsWith("http")) {
      // If photo is a full URL, leave it as is
      user.photo = user.photo;
    }
    res.status(200).json({
      status: "success",
      data: {
        data: user,
      },
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    next(error);
  }
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};

exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
