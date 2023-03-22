const express = require('express');
const router = express.Router();

//controllers imports
const ctrlMain = require('../controllers/main')
const ctrlUsers = require('../controllers/users');

/* GET home page. */
/* GET home page. */
router.get('/', ctrlMain.index);

/* GET users read. */
router
        .route('/users_add')        
        .get(ctrlUsers.addUsers)
        .post(ctrlUsers.doAddUsers);

/* GET users update search. */
router
        .route('/users_update')        
        .get(ctrlUsers.readUsersUpdate)
        .post(ctrlUsers.callSearchUpdate);

router
        .route('/users_update/:userId')
        .get(ctrlUsers.userFindNameUpdate)
        .post(ctrlUsers.doSearchedUpdateUsers);

module.exports = router;
