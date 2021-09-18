const router = require('express').Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//route pour créer une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
//route pour modifier une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//route pour supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);
//route pour récupérer un sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);  
//route pour récupérer les sauces
router.get('/', auth, sauceCtrl.getAllSauce);
//route pour aimer ou ne pas aimer une sauce
router.post('/:id/like',auth, sauceCtrl.likeSauce);

module.exports = router;