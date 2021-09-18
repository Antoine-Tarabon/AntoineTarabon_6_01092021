const Sauce = require('../models/Sauce');

//logique métier des routes sauces

//création d'une sauce
exports.createSauce = (req, res, next) => {
  //récuperation des informations de la sauce depuis les champs de formulaire
    const sauceObject = JSON.parse(req.body.sauce);
    //suppression de la variable _id et erreur si non reussi
    if (!delete sauceObject._id) res.status(400).json({message:'Un problème est survenu'});
    //création de la sauce a partir du model
    const sauce = new Sauce({
      ...sauceObject,
      likes: 0,
      dislikes: 0,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    //sauvegarde de la sauce en BDD
    sauce.save()
      .then(() => res.status(201).json({ message: 'sauce enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

//modification d'une sauce
exports.modifySauce = (req, res, next) => {
  //mise a jour de la sauce selon les champs du formulaire + modification de l'image si nouvelle image 
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, imageUrl: req.file === undefined ? this.imageUrl :`${req.protocol}://${req.get('host')}/images/${req.file.filename}` })
      .then(() => res.status(200).json({ message: req.body}))
      .catch(error => res.status(400).json({ error }));
};

//like et dislike d'une sauce
exports.likeSauce = async (req, res, next) => {
  //récuperation de la sauce concernée dans la BDD
  let sauce = await Sauce.findOne({ _id: req.params.id });
  //si cest un like 
  if(req.params.like === 1) {
    sauce.likes = sauce.likes + 1;
    sauce.usersLiked = sauce.usersLiked.push(req.body.userId);
  }
  //si cest un dislike
  else if(req.params.like === 0) {
    sauce.dislikes = sauce.dislikes + 1;
    sauce.usersDisliked = sauce.usersDisliked.push(req.body.userId);
  }
  //sauvegarde en BDD
  try {
    const savedSauce = await sauce.save();
    res.status(200).json({message: savedSauce});
  }
  catch (error) {
    res.status(400).json({ error});
  }
}

//supression d'une sauce de la BDD par rapport à son id
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

//récupération d'une sauce par rapport à son id 
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

//récupération de toutes les sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      //le tableau des sauces
      .catch(error => res.status(400).json({ error }));
};