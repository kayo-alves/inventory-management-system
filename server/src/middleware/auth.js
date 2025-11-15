const AuthService = require('../services/authService')

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'É necessário o Token de acesso'
            })
        }

        const decoded = AuthService.verifyToken(token);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({
            sucess: false,
            message: 'Token invalido ou expirado'
        });
    }
}

module.exports = { authenticateToken }