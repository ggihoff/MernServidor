const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var cors = require('cors');

app.use(cookieParser());
app.use(express.json());


app.use(cors({ credentials: true}));

mongoose.connect('mongodb+srv://ggih:426041Aa@gustavo.g6ait.mongodb.net/twitter?retryWrites=true&w=majority', {
useNewUrlParser : true,
useUnifiedTopology:true
}, ()=> console.log('succestuflly connected to database'))



const userRouter = require('./routes/User');
app.use('/user', userRouter);


app.listen(5000, () => {
    console.log(`El servidor esta funcionando en el puerto 4000`);
});