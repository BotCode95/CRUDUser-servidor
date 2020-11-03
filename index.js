const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');


const app = express();

conectarDB();

//habilitar cors
app.use(cors());

//habilitar express.json
app.use(express.json({ extended : true}));

//port for app
const port = process.env.PORT || 4000;

//import paths
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contactos', require('./routes/contactos')); 

// app.get('/', (req,res) => {
//     res.send('Hola Mundo')
// });


//init app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})
