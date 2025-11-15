const User = require('../models/user');
const jwt = require('jsonwebtoken');

class authService {
    static async register(userData) {
        try {
            const existingUser = await User.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('User already exists');
            }

            const newUser = await User.create(userData);

            const token = this.generateToken(newUser);

            return {
                user: {
                    user: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                },
                token
            };
        } catch (error) {
            throw error;
        }
    }

    static async login(email, password) {
      try {
        // Find user by email - rename the variable to avoid conflict
        const foundUser = await User.findByEmail(email);
        if (!foundUser) {
          throw new Error('Invalid credentials');
        }

        const isPasswordValid = await User.validatePassword(password, foundUser.password);
        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        const token = this.generateToken(foundUser);
        return {
          user: {
            user: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
          },
          token
        };
      } catch (error) {
          throw error;
      }
  }

    static generateToken(user) {
        return jwt.sign(
          { userId: user.id, email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );
      }
    
    static verifyToken(token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = authService;