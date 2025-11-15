const AuthService = require('../services/authService');

class AuthController {
    static async register(req, res) {
        try {
            const { email, password, name } = req.body;

            // basic validation
            if (!email || !password || !name) {
                return res.status(400).json({
                    success: false,
                    message: 'Email, senha e nome são obrigatórios'
                });
            }

            // email format validation
            const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                success: false,
                message: 'Por favor, forneça um endereço de email válido'
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Senha deve ter pelo menos 6 caracteres'
                });
            }

            const result = await AuthService.register({ email, password, name })

            res.status(201).json({
                success: true,
                message: 'Usuário registrado com sucesso',
                data: result
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                  });
            }

            const result = await AuthService.login(email, password);

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
              });
            } catch (error) {
              res.status(401).json({
                success: false,
                message: error.message
              });
        }
    }
}

module.exports = AuthController;