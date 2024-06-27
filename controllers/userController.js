const User = require('../models/User')

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}