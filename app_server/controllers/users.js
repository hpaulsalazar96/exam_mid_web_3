// controllers de users
const request = require('request');

// Definir las URLs para los ambientes de desarrollo y produccion
const apiOptions = {
    server: 'http://localhost:3000' // server local
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://hsalazar-dw3.herokuapp.com' // server remoto - produccion
};


const addUsers = (req, res) => {
    res.render('users_add', {
        titulo: 'Creación de Usuarios',
        mensaje: 'Bienvenido a Creación de Usuarios'
    });
}

// 2. petición HTTP - POST /api/users
const doAddUsers = (req, res) => {
    const path = '/api/users/';
    const postdata = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        identificacion: req.body.identificacion,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        edad: req.body.edad,
        tipo: req.body.tipo,
        nombres: req.body.nombres,
        carrera: req.body.carrera,
        fecha: req.body.creado
    }

    const requestOptions = { // objeto cargado con las opciones para request
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postdata
    };

    request(requestOptions,
        (err, response, body) => {
            console.log('Opciones: ', requestOptions);
            if (response.statusCode === 201) { // creación exitosa
                console.log('Body: ', body);
                // volver a mostrar la vista users_add para el ingreso de más documentos
                res.render('users_add', {
                    titulo: 'Creación de Usuarios',
                });
            } else {
                console.log('statuscode: ', response.statusCode);
                console.log('error: ', err);
                console.log('req.body: ', req.body);
                console.log('Opciones: ', requestOptions);
                res.render('error', { message: 'Existe un error en la creación de usuarios' });
            }
        });

}

const doSearchedUpdateUsers = (req, res) => {
    const path = `/api/users/${req.body.documento}`; // invoco a la ruta de la API para eliminar por Id;
    const postdata = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        identificacion: req.body.identificacion,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        edad: req.body.edad,
        tipo: req.body.tipo,
        nombres: req.body.nombres,
        carrera: req.body.carrera,
        fecha: req.body.fecha
    }
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'PUT',
        json: postdata
    }
    console.log('Ruta: ', path);
    request(requestOptions,
        (err, response, body) => {
            console.log('Opciones: ', requestOptions);
            if (response.statusCode === 200) { // creación exitosa
                console.log('Body: ', body);
                // volver a mostrar la vista users_add para el ingreso de más documentos
                return res.redirect('/');
            } else {
                console.log('statuscode: ', response.statusCode);
                console.log('error: ', err);
                console.log('req.body: ', req.body);
                console.log('Opciones: ', requestOptions);
                res.render('error', { message: 'Existe un error en la creación de usuarios' });
            }
        });
}

const readUsersUpdate = (req, res, next) => {
    res.render('users_update', {
        titulo: 'Buscar y Actualizar',
        mensaje: 'Bienvenido a Busqueda de Usuarios'
    });
}

const callSearchUpdate = (req, res) => {
    res.redirect(`/users_update/${req.body.codigo}`);
    console.log('Path', `/users_update/${req.body.codigo}`);
}


const userFindNameUpdate = (req, res, next) => {
    const path = `/api/search/${req.params.userId}`; // invoco a la ruta de la API para buscar por Id;
    console.log(req.params.userId);
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    }
    console.log('Ruta: ', path);
    request(
        requestOptions, // Opciones
        (err, response, body) => { // callback con sus 3 partes
            console.log('Documento: ', body);
            console.log('Status Code: ', response.statusCode);
            if (err) {
                console.log('Request encontró el error: ', err);
            } else if (response.statusCode === 200 && body) { // además del status code, el objeto resultante debe tener contenido
                //console.log('Objeto Resultante: ', body.shift());
                renderSearchUpdateUsers(req, res, body[0]); // llamar a la función que hace render de la vista users_delete
            } else {
                console.log('Status Code: ', response.statusCode);
                res.render('error', {
                    mensaje: 'Existe un error en la colección usuarios'
                })
            }
        });

}

const renderSearchUpdateUsers = (req, res, responseBody) => {
    console.log(`response`, responseBody);
    res.render('users_update', {
        title: 'Busqueda de usuarios',
        nombre: responseBody.nombre,
        apellido: responseBody.apellido,
        identificacion: responseBody.identificacion,
        direccion: responseBody.direccion,
        telefono: responseBody.telefono,
        edad: responseBody.edad,
        tipo: responseBody.tipo,
        nombres: responseBody.nombres,
        carrera: responseBody.carrera,
        fecha: responseBody.creado,
        documento: responseBody._id // necesario para realizar el update
    });
}



module.exports = {
    addUsers,
    doAddUsers,
    readUsersUpdate,
    callSearchUpdate,
    userFindNameUpdate,
    doSearchedUpdateUsers,
}