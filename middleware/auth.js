const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //récuperation du token et informations du user
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_JWT);
    const userId = decodedToken.userId;
    //on vérifie que cest le bon user
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};