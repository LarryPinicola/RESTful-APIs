const express = require('express')
const userController = require('../controllers/userController')
const authenticateToken = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/users', authenticateToken, userController.getUsers);
router.get('/users/:id', authenticateToken, userController.getUser);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser)

module.exports = router;