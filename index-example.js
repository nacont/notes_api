// IMPORTAMOS EXPRESS. LO CUAL ES UNA FUNCIÓN
const express = require('express');
// CREAMOS UNA APLICACIÓN express QUE ALMACENAMOS EN LA CONSTANTE app
const app = express();
const PORT = 3001;

app.use(express.json());

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
];

// EL CONTROLADOR DE EVENTOS ACEPTA DOS PARÁMETROS:
// req (REQUEST): CONTIENE LA INFORMACIÓN DE LA SOLICITUD http
// res (RESPONSE): SE USA PARA DEFINIR COMO SE RESPONDE A LA SOLICITUD
// express ESTABLECE AUTOMATICAMENTE EL 'Content-Type': 'text/html'
app.get('/', (req, res) => {
    // LA SOLICITUD SE RESPONDE CON EL MÉTODO send DEL OBJETO res. EN ESTE CASO SE ENVIA UNA RESPUESTA CON UN STRING
    res.send('<h1>Hello World</h1>');    
});


// express ESTABLECE AUTOMATICAMENTE EL 'Content-Type': 'application/json'
app.get('/api/notes', (req, res) => {
    app.use(requestLogger);
    // LA SOLICITUD SE RESPONDE CON EL MÉTODO json DEL OBJETO res. EN ESTE CASO SE ENVIA EL ARRAY notes CON FORMATO JSON
    res.json(notes);    
});

// RUTA PARA UN SOLO RECURSO. RECIBIREMOS POR URL EL ID
app.get('/api/notes/:id', (req, res) => {    
    // ACCEDEMOS AL PARÁMETRO id EN LA RUTA A TRAVÉS DEL OBJETO req. LO CONVERTIMOS A NUMBER PORQUE DE LA URL VIENE COMO STRING
    const id = Number(req.params.id);
    const note = notes.find( note => note.id === id);

    if(note) {
        res.json(note);
    } else {
        // SI NO EXISTE NOTA CON DICHO ID, DEVOLVEMOS UN status(404)
        res.status(404).end();
    }
});

// RUTA PARA ELIMINAR UN ELEMENTO
app.delete('/api/notes/:id', (req, res) => {        
    const id = Number(req.params.id);
    notes = notes.filter( note => note.id !== id);    
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

const generateId = () => {
    const maxId = notes.length > 0 
                ? Math.max(...notes.map( n => n.id )) 
                : 0;
    return maxId + 1;
}

app.post('/api/notes', (req, res) => {
    // LA INFORMACIÓN DE LA NOTA SE ENCUENTRA EN EL body. SE ENVÍA EN FORMATO JSON
    // CON json-parser TOMA LOS DATOS JSON DE LA SOLICITUD, LOS TRANSFORMA EN UN OBJETO JS Y LOS ADJUNTA A LA PROPIEDAD body DEL OBJETO req    
    const body = req.body;
    if(!body.content) {
        return res.status(400).json({
            error: 'content missing'
        });
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }
    
    notes = notes.concat(note);    
    res.json(note);
});

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path:', req.path);
    console.log('Body:', req.body);
    console.log('---');
    // LA FUNCIÓN next() CEDE EL CONTROL AL SIGUIENTE MIDDLEWARE
    next();
}

const unknownEndpoint = (req, res) => {
    response.status(404).send({
        error: 'unknow endpoint'
    });
}
app.use(unknownEndpoint);