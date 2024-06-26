const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY;

exports.register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, phone, password: hashedPassword })
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message })
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
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1hr' })
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}