
const { request, response } = require('express');
const Proyecto = require('../models/proyecto');
const TipoProyecto = require('../models/tipoProyecto');
const Cliente = require('../models/cliente');
const Universidad = require('../models/universidad');
const Etapa = require('../models/etapa')

/**
 * crea
 */
const createProyecto = async (req = request, res = response) => {
     try{
         const data = req.body
         const { cliente, tipoProyecto, universidad, etapa, titulo, fecha_iniciacion, fecha_entrega, valor } = data

         const proyectoBD = await Proyecto.findOne({ titulo, fecha_iniciacion, fecha_entrega, valor });
         if(proyectoBD){// ya existe el titulo
            return res.status(400).json({msg: 'Ya existe titulo de proyecto'});
        }
         const tipoProyectoBD = await TipoProyecto.findOne({
             _id: tipoProyecto._id
         })
         if(!tipoProyectoBD){
             return res.status(400).json({
                 msj: 'No existe tipo Proyecto'
             })
         }
         const clienteBD = await Cliente.findOne({
             _id: cliente._id
         })
         if(!clienteBD){
             return res.status(400).json({
                 msj: 'No existe cliente'
             })
         }
         const universidadBD = await Universidad.findOne({
            _id: universidad._id
        })
        if(!universidadBD){
            return res.status(400).json({
                msj: 'No existe universidad'
            })
        }
        const etapaBD = await Etapa.findOne({
            _id: etapa._id
        })
        if(!etapaBD){
            return res.status(400).json({
                msj: 'No existe etapa'
            })
        }
         const proyecto = new Proyecto(data);
         await proyecto.save();
         return res.status(201).json(proyecto);
     }catch(e){
         return res.status(500).json({
             error: e
         });
     }
 }
 
/**
 * Consultar todos
 */
const getProyectos = async (req, res = response) => {
    var hoy = new Date(); 
    console.log('Calling getProyectos'+ ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds())
    try{
        const proyectosBD = await Proyecto.find()
        .populate({
            path: 'cliente'
        })
        .populate({
            path: 'tipoProyecto'
        })
        return res.json(proyectosBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar todos inventarios
 */
 const getProyectoByID = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const query = { _id: id};
        const proyectooBD = await Proyecto.findOne(query).populate({
            path: 'titulo',
            match: { estado: true }
        });
        // TODO: personalizar error de no encontrado
        res.json(proyectooBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}


const updateProyecto = async (req = request, res = response) => {
   try{
        const { id } = req.params;
        const data = req.body;// destructuring, spread (...)
    
        const proyectoBD = await Proyecto.findOne({ _id: id});
       if(!proyectoBD){
        return res.status(400).json({
            msj: 'No existe este proyecto'
        });
       } 
        const proyecto = await Proyecto.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(proyecto);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}


module.exports = { 
    createProyecto,
    getProyectos, 
    updateProyecto, 
    getProyectoByID
}