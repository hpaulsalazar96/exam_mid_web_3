// Controladores
const mongoose = require('mongoose'); 
const users = mongoose.model('user');

// Creación de usuarios
const userCreate = (req, res) => {
    users.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        identificacion: req.body.identificacion,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        edad: req.body.edad,
        materias: {
            tipo: req.body.tipo,
            nombres: req.body.nombres // ya viene en formato de arreglo desde la vista
        },
        carrera: req.body.carrera

    },(err, objetoUsuario)=>{
        if (err) {
            res 
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(objetoUsuario);
        }
    });
};

// Lectura de un usuario
const userRead = (req, res) => {
  users
        .findById(req.params.userid) // obtiene el userid de los parámetros de la URL
        .exec((err, objetoUsuario)=>{ 
            if (!objetoUsuario) { // findById no encontró un documento que cumpla con userid
                console.log(`Usuario con el userid: ${req.params.userid} no encontrado`);
                return res 
                    .status(404)
                    .json({"mensaje": "Usuario no encontrado"});
            } else if (err) { // findById encontró un error
                console.log(`Usuario con el userid: ${req.params.userid} tiene error`, err);
                return res 
                    .status(404)
                    .json(err);
            }
            res // Responde enviando el documento encontrado en formato JSON y el status HTTP 200 
                .status(200)
                .json(objetoUsuario);
        });
}

// Búsqueda por nombre/apellido/identificación
const userFindName = (req, res)=>{
    const buscar = new RegExp(req.params.name);
    console.log('Buscar usuario con nombre/apellido:', buscar);
    users
        // .find({ 'apellido': buscar })
        .find({ 'nombre': req.params.name })
        .exec((err, objetoUsuario)=> {
            if (!objetoUsuario) { // valido la existencia de documentos en la colección
                console.log('No existen documentos en la colección usuarios');
                return res
                    .status(404)
                    .json({'mensaje': 'Usuarios no encontrados'});
            } else if (err) { // find encontró error
                console.log('Existe error en la colección usuarios');
                return res
                    .status(404)
                    .json(err);
            }
            res // Responde enviando el documento encontrado en formato JSON y el status HTTP 200 
                .status(200)
                .json(objetoUsuario);
        })
}


// Listado de usuarios
const userList = (req, res) => {  
    users
        //.find({"nombre": "Henry"})
        //.find({"materias.tipo": "Presencial"})
        .find()
        //.select('nombre apellido')
        .exec((err, objetoUsuario)=> {
            if (!objetoUsuario) { // valido la existencia de documentos en la colección
                console.log('No existen documentos en la colección usuarios');
                return res
                    .status(404)
                    .json({'mensaje': 'Usuarios no encontrados'});
            } else if (err) { // find encontró error
                console.log('Existe error en la colección usuarios');
                return res
                    .status(404)
                    .json(err);
            }
            res // Responde enviando el documento encontrado en formato JSON y el status HTTP 200 
                .status(200)
                .json(objetoUsuario);
        })
    // res
    //     .status(200)
    //     .json({"status": "lectura exitosa"});
}

// Actualización de un usuario
const userUpdate = (req, res) => {
    if(!req.params.userid){
        return res  
            .status(404)
            .json({"mensaje": "Ingrese un userid válido"});
    }
    users
        .findById(req.params.userid)
        .exec((err, objetoUsuario)=>{
            if(!objetoUsuario){
                return res
                    .status(404)
                    .json({"mensaje": "userid no existente"});
            } else if (err){
                return res
                    .status(400)
                    .json(err);
            }

            objetoUsuario.nombre = req.body.nombre;
            objetoUsuario.apellido = req.body.apellido;
            objetoUsuario.identificacion = req.body.identificacion;
            objetoUsuario.direccion = req.body.direccion;
            objetoUsuario.telefono = req.body.telefono;
            objetoUsuario.edad = req.body.edad;
            objetoUsuario.materias.tipo = req.body.tipo;
            objetoUsuario.materias.nombres = req.body.nombres;
            objetoUsuario.carrera = req.body.carrera;

            objetoUsuario.save((err, users)=>{
                if (err){
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(users);
                }
            });

        })


}

// Eliminación de un usuario
const userDelete = (req, res) => {
    if (req.params.userid){
        users
            .findByIdAndDelete(req.params.userid)
            .exec((err, objetoUsuario)=>{
                if(!objetoUsuario){
                    console.log('Usuario no encontrado: ', req.params.userid)
                    return res  
                        .status(404)
                        .json({"mensaje": "Usuario no encontrado"});
                } else if (err) {
                    return res  
                        .status(404)
                        .json(err);
                }
                res
                    .status(204)
                    .json(null);
            })
    }
}

module.exports = {
    userCreate, // Creación de usuarios
    userList,   // Listado de usuarios
    userRead,   // Lectura de un usuario
    userFindName,
    userUpdate, // Actualización de un usuario
    userDelete  // Eliminación de un usuario
}