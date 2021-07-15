// IMPORTAMOS EL MÓDULO DE SERVIDOR WEB INTEGRADO DE NODE
const http = require('http');

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

const PORT = 3001;

// EL MÉTODO .createServer CREA UN NUEVO SERVIDOR
const app = http.createServer( (req, res) => {
    // DEVOLVEREMOS DATOS SIN PROCESAR EN FORMATO JSON
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(notes));
});

// ENLAZAMOS EL SERVIDOR http ASIGNADO A LA VARIABLE app PARA ESCUCHAR LAS SOLICITUDES ENVIADAS AL PUERTO 3001
app.listen(PORT);

console.log(`Server running on port ${PORT}`);