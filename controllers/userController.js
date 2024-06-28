const User = require('../models/User')
const bcrypt = require('bcrypt')

// get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        return res.json(users)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// get single user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            return res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// update user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, phone } = req.body;
        const user = await User.findByPk(id);
        if (user) {
            user.username = username;
            user.email = email;
            user.phone = phone;
            await user.save();
            return res.json(user);
        }
        else {
            return res.status(404).json({ error: 'User not found' })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            return res.json({ message: 'user deleted' })
        } else {
            return res.status(404).json({ error: 'user not found' })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}