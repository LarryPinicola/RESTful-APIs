const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY;

exports.register = async (req, res) => {
    try {
        const { username, email, phone, role, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User.create({ username, email, phone, role: role || 'user', password: hashedPassword, createdAt: Date.now() })
        return res.status(201).json({ success: true, message: "register successful", data: user });
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' })
        }
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1hr' })
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}