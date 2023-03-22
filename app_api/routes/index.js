const express = require('express');
const router = express.Router();

// incorporar controllers
const ctrlUsers = require('../controllers/users');

// Definir las rutas para las acciones sobre la colección users
router
    .route('/users')
        .post(ctrlUsers.userCreate)
        .get(ctrlUsers.userList);

router
    .route('/users/:userid')
        .get(ctrlUsers.userRead)
        .put(ctrlUsers.userUpdate)
        .delete(ctrlUsers.userDelete);

router
    .route('/search/:name')
        .get(ctrlUsers.userFindName);

module.exports = router;