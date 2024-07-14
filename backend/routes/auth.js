const express = require('express')
const router = express.Router();
const AuthControllers = require('../controllers/auth')
const auth = require('../middleware/auth')



router.post('/signup', AuthControllers.signup);
router.post('/login', AuthControllers.login);
router.get('/authDetails',auth, AuthControllers.authDetails)


module.exports = router