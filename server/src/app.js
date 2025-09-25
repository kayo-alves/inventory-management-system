const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const routes = require('./routes');

const app = express();

app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('combined'));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true}));

app.use('/api', routes)

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

app.use((error, req, res, next) => {
    console.error('error:', error);
    res.status(500).json({
        sucess: false,
        message: 'Internal server error'
    });
});

module.exports = app