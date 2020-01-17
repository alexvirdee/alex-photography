const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(rq, res, next)).catch(next);

module.exports = asyncHandler;
