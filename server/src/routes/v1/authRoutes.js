const express = require('express')
const AuthController = require('../../controllers/authController');
const { authenticateToken } = require('../../middleware/auth');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/profile', authenticateToken, (req, res) => 
{
    res.json({
        success: true,
        message: 'Profile endpoint',
        userId: req.userId
    });
});

module.exports = router;