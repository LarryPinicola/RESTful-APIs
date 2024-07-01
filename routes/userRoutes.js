const express = require('express')
const userController = require('../controllers/userController')
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware')

const router = express.Router();

// router.get('/users', authenticateToken, userController.getUsers);
// router.get('/users/:id', authenticateToken, userController.getUser);
// router.put('/users/:id', authenticateToken, userController.updateUser);
// router.delete('/users/:id', authenticateToken, userController.deleteUser)

router.get('/users', authenticateToken, authorizeRole(['admin']), userController.getUsers);
router.get('/users/:id', authenticateToken, authorizeRole(['admin']), userController.getUser);
router.put('/users/:id', authenticateToken, authorizeRole(['admin']), userController.updateUser);
router.delete('/users/:id', authenticateToken, authorizeRole(['admin']), userController.deleteUser)

module.exports = router;