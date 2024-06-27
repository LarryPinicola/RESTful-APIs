const express = require('express')
const userController = require('../controllers/userController')
const authenticateToken = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/users', authenticateToken, userController.getUsers);
router.get('/user/:id', authenticateToken, userController.getUser)

module.exports = router;