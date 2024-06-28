require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config/database')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();
const port = 4400;

// middleware
app.use(bodyParser.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api', userRoutes)

app.listen(port, () => {
    // synchronize with db
    sequelize.sync().then(() => {
        console.log('Database & table connected');
    }).catch(err => console.log('Error ' + err));
    console.log(`Server running on http://localhost:${port}/`);
});