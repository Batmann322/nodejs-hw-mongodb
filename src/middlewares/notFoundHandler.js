const notFoundHandler = (req, res) => {
  res.status(404).json({
    massage: `${req.url} not found`,
  });
};

export default notFoundHandler;
