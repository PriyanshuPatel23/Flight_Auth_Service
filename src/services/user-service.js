const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/ServerConfig");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw error;
      }
      console.log("something went wrong in the service layer", error);
      throw error;
    }
  }

  async SignIn(email, plainpassword) {
    try {
      const user = await this.userRepository.getByEmail(email);

      const passwordMatch = this.checkPassword(plainpassword, user.password);

      if (!passwordMatch) {
        console.log("Password Doesn't Match");
        throw { error: "Password Doesnt Matched" };
      }

      const newJwt = this.createToken({ email: user.email, id: user.id });
      return newJwt;
    } catch (error) {
      if (error.name === "AttributeNotFound") {
        throw error;
      }
      console.log("something went wrong in the service layer", error);
      throw error;
    }
  }

  async destroy(data) {
    try {
      const user = await this.userRepository.destroy(data);
      return user;
    } catch (error) {
      console.log("something went wrong in the service layer", error);
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await this.userRepository.getById(userId);
      return user;
    } catch (error) {
      console.log("something went wrong in the service layer", error);
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "invalid token" };
      }
      const user = this.userRepository.getById(response.id);

      if (!user) {
        throw { error: "no user with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("something went wrong in the token creation", error);
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "20d" });
      return result;
    } catch (error) {
      console.log("something went wrong in the token creation", error);
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const result = jwt.verify(token, JWT_KEY);
      return result;
    } catch (error) {
      console.log("something went wrong in the token Validation", error);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("something went wrong in the password comparison", error);
      throw error;
    }
  }

  isAdmin(UserId) {
    try {
      return this.userRepository.isAdmin(UserId);
    } catch (error) {
      console.log("something went wrong in the Service Layer", error);
      throw error;
    }
  }
}

module.exports = UserService;
