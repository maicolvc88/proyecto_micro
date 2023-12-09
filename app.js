const express = require('express');

const app = express();
const {  mongoConn } = require('./databases/configuration');
mongoConn()

const cors = require('cors');

//const tiposProyectos = require('./routes/tipoProyecto');

const proyectos = require('./routes/proyecto');

//const clientes = require('./routes/cliente');

//const universidades = require('./routes/universidad')

//const etapas = require('./routes/etapa')

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


//app.use('/api/tiposproyectos', tiposProyectos);
app.use('/api/proyectos', proyectos);
//app.use('/api/clientes', clientes);
//app.use('/api/universidades', universidades);
//app.use('/api/etapas', etapas);

module.exports = app;