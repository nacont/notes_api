require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3001;
const Note = require('./models/note');
app.use(express.json());

let notes = [];



app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

// const requestLogger = (req, res, next) => {
//     console.log('Method:', req.method);
//     console.log('Path:', req.path);
//     console.log('Body:', req.body);
//     console.log('---');
//     // LA FUNCIÓN next() CEDE EL CONTROL AL SIGUIENTE MIDDLEWARE
//     next();
// }

const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: 'unknow endpoint'
    });
}
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    
    if(error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id'});
    } else if(error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message});
    }
    next(error);
}
app.use(errorHandler);