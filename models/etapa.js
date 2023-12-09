const { Schema, model } = require('mongoose');

const EtapaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Debe colocar una etapa']
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
});

module.exports = model('Etapa', EtapaSchema);