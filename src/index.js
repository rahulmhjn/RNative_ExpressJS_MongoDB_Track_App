require('./models/Users');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const currentRoutes = require('./routes/currentRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());

app.use('/',authRoutes);
app.use('/',trackRoutes);
app.use('/',currentRoutes);
app.use('/',pdfRoutes);

const mongoUri = 'mongodb+srv://qwerty:rahul6912@cluster0-aisct.mongodb.net/track_db?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',() => {
    console.log('Database Connected');
});

mongoose.connection.on('error',(err) => {
    console.log('Error:',err);
});


app.get('/',requireAuth ,(req,res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('connected to server');
});