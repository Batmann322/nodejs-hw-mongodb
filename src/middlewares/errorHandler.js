const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    massage: error.message,
  });
};

export default errorHandler;
