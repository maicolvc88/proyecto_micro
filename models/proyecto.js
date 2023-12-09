const { Schema, model } = require('mongoose');

const ProyectoSchema = Schema({
    numero: {
        type: String,
        required: [true, 'Debe colocar un número'],
        unique: [true, 'Consecutivo del proyecto debe ser único']
    },
    titulo: {
        type: String,
        required: [true, 'Debe colocar un titulo']
    },
    fecha_iniciacion: {
        type: Date,
        required: true
    },
    fecha_entrega: {
        type: Date,
        required: true
    },
    valor: {
        type: Number,
        required: true,

    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    tipoProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        required: true
    },
    universidad:{
        type: Schema.Types.ObjectId,
        ref: 'Universidad',
        required: true 
    },
    etapa: {
        type: Schema.Types.ObjectId,
        ref: 'Etapa',
        required: true 
    }
});

module.exports = model('Proyecto', ProyectoSchema);
/*
{
    "numero" : "1234567890",
    "cliente" : {
        "_id" : "654c22edf267494bb9f199b9"
    },
    "tipoProyecto" : {
       "_id" : "654c206d12086cb83e692eb8"
    }
}*/