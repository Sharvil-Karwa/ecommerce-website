module.exports = (func1) => (req, res, next) => {
  Promise.resolve(func1(req, res, next)).catch(next);
};
