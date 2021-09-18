const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//logique métier des routes users

//inscription
exports.signup = (req, res, next) => {
  //encryption du mot de passe récupréré du formulaire
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        //création du user par rapport au model
        const user = new User({
          email: req.body.email,
          password: hash
        });
        //sauvegarde du user
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

//connexion
exports.login = (req, res, next) => {
  //récuperation du user par son email
  User.findOne({ email: req.body.email })
    .then(user => {
      //si l'utilisateur n'existe pas 
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      //sinon vérification du mot de passe 
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          //si le mot de passe est incorrect
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          //l'utilisateur est connecté avec la token
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.TOKEN_JWT,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};