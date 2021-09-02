const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Middlewares
dotenv.config();
app.use(express.json());
// Connect to DB
mongoose
    .connect(process.env.DB_CONNECT, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .catch(
        //TODO : Envoyer un email pour alerter
        (error) => console.log(error)
    );

//Import routes
//const authRoutes = require('./routes/auth');
// const postsRoutes = require('./routes/posts');
const sauceRoutes = require('./routes/Sauce')
const userRoutes = require('./routes/user')

//Route Middlewares
app.use('/api/auth', userRoutes);
// app.use('/posts', postsRoutes);
app.use('/api/sauces', saucesRoutes);

app.listen(process.env.APP_PORT, () => console.log('Server Up and Running'));