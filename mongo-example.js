const mongoose = require('mongoose');

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

// const password = '9nGuHNf7ROEi8DAi';
// PASAMOS LA CONTRASEÑA COMO PARÁMETRO DE LA LÍNEA DE COMANDO (node mongo.js 9nGuHNf7ROEi8DAi)
const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.wxymc.mongodb.net/note-app?retryWrites=true&w=majority`;

// ESTABLECEMOS LA CONEXIÓN
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// DEFINIMOS EL ESQUEMA PARA UNA NOTA. ESTE LE DICE A MONGOOSE COMO SE ALMACENARÁN LOS OBJETOS DE LA NOTA EN LA BASE DE DATOS
const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
});
// DEFINIMOS EL MODELO PARA LA NOTA POR CONVENCIÓN, MONGOOSE, CUANDO EL ESQUEMA SE REFIERE AL MODELO EN SINGULAR, NOMBRA LA COLECCIÓN EN PLURAL
const Note = mongoose.model('Note', noteSchema);

// CREAMOS UN NUEVO OBJETO DE LA NOTA CON EL MODELO Note
// LOS MODELOS SON LAS FUNCIONES CONSTRUCTORAS. CREAN NUEVOS OBJETOS JS BASADOS EN LOS PARÁMETROS PROPORCIONADOS. COMO SE CREAN CON LA
// const note = new Note({
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     date: new Date(),
//     important: true
// });

// HACEMOS UNA CONSULTA PARA ENCONTRAR TODAS LAS NOTAS. EL MÉTODO .find RECUPERA LOS OBJETOS. SU PARÁMETRO ES UN OBJETO QUE EXPRESA LAS CONDICIONES DE LA BÚSQUEDA. DADO QUE EN ESTE CASO ESTA VACÍO, TRAE TODAS. 
Note.find({
    // important: true
}).then(result => {
    result.forEach(note => {
        console.log(note);
    });
});

// GUARDAMOS EN LA BD CON EL MÉTODO SAVE
// LUEGO SE INVOCA EL CONTROLADOR DE EVENTOS .then ESTE CIERRA LA CONEXIÓN CON LA BD PARA TERMINAR LA EJECUCIÓN
// note.save().then(result => {
//     console.log('note saved!');
//     console.log(result)
//     mongoose.connection.close();
// });

// CONTINUAR EJERCICIO 3.12