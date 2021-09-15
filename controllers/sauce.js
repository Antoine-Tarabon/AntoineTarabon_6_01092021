const Sauce = require('../models/Sauce');

//logique métier des routes sauces

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    if (!delete sauceObject._id) res.status(400).json({message:'Un problème est survenu'});
    const sauce = new Sauce({
      ...sauceObject,
      likes: 0,
      dislikes: 0,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'sauce enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, imageUrl: req.file === undefined ? this.imageUrl :`${req.protocol}://${req.get('host')}/images/${req.file.filename}` })
      .then(() => res.status(200).json({ message: req.body}))
      .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = async (req, res, next) => {
  let sauce = await Sauce.findOne({ _id: req.params.id });
  if(req.params.like === 1) {
    sauce.likes = sauce.likes + 1;
    sauce.usersLiked = sauce.usersLiked.push(req.body.userId);
  }
  else if(req.params.like === 0) {
    sauce.dislikes = sauce.dislikes + 1;
    sauce.usersDisliked = sauce.usersDisliked.push(req.body.userId);
  }
  try {
    const savedSauce = await sauce.save();
    res.status(200).json({message: savedSauce});
  }
  catch (error) {
    res.status(400).json({ error});
  }
}

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      //le tableau des sauces
      .catch(error => res.status(400).json({ error }));
};