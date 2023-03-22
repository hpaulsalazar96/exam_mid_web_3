// Esquema de usuarios
const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre : {
        type: String,
        require: true
    },
    apellido : {
        type: String,
        require: true
    },
    identificacion : {
        type: Number,
        require: true
    },
    direccion : {
        type: String
    },
    telefono : {
        type: Number,
        'default': 999999999
    },
    edad : {
        type: Number,
        'default': 1,
        min: 1,
        max: 100
    },
    materias : { 
        tipo : {
            type : String,
            enum: ['Presencial', 'Virtual']
        },
        nombres: [String]
    },
    carrera : { 
        type : String,
        require: true
    },
    creado : { 
        type : Date,
        'default': Date.now
    },
});

const Usuario = new mongoose.model('user', usuariosSchema); // compilar el esquema en un modelo

const user = new Usuario({
    nombre: 'Jorge',
    apellido: 'Fierro',
    identificación: 00215250,
    direccion: 'Puengasí',
    telefono: 0978940720,
    edad: 21,
    materias: {
        tipo: 'Presencial',
        nombres: ['Creatividad Empresarial', 'Proyectos Empresariales', 'Desarrollo web 3']
    },
    carrera: 'Diseño de Medios Interactivos'
}); // crear un nuevo documento

// user.save();