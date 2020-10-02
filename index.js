const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
//create a server
const app = express();

//connect db
conectarDB();

//habilitar cors
app.use(cors());

//habilitar express.json
app.use(express.json({ extended : true}));

//port for app
const PORT = process.env.PORT || 4000;

//import paths
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contactos', require('./routes/contactos'))
// app.use('/api/usuarios/listado', require('./routes/usuarios'));

// app.use('/api/listado', require('./routes/listado'));
//init app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})
