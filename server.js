const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

//Appel du fichier .env
dotenv.config();
//appel du body parser
app.use(express.json());
//mise en place du CORS policy
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
//mise en place du multer
app.use('/images', express.static(path.join(__dirname, 'images')));
// Connect to DB
mongoose
    .connect(process.env.DB_CONNECT, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, console.log('je suis connecté à la base'))
    .catch(
        //TODO : Envoyer un email pour alerter
        (error) => console.log(error)
    );

//Import routes
const saucesRoutes = require('./routes/Sauce');
const userRoutes = require('./routes/user');

//Route Middlewares
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

//lancement du server
app.listen(process.env.APP_PORT, () => console.log('Server Up and Running'));