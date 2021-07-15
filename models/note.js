const mongoose = require('mongoose');
// DEFINIMOS EL ESQUEMA DE MONGOOSE PARA LAS NOTAS
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    important: Boolean
});

// PARSEAMOS LOS DATOS
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

// DEFINIMOS LA INTERFAZ PÚBLICA DEL MÓDULO ESTABLECIENDO UN VALOR EN LA VARIABLE module.exports
module.exports = mongoose.model('Note', noteSchema);