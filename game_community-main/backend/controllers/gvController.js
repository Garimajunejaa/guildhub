const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

// Updated to return generic response for any ID to avoid 404
exports.getGVById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  // For now, return a generic response with the requested ID
  res.status(200).json({
    status: "success",
    data: {
      id,
      name: "Sample GV Data",
      description: "This is a placeholder GV data for testing.",
    },
  });
});
