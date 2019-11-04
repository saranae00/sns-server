const chkLogged = (req, res, next) => {
  if (!req.decoded) {
    res.status(401).send();
    return;
  }
  return next();
};

module.exports = chkLogged;
