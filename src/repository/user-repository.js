const { where } = require("sequelize");
const { User, Role } = require("../models/index");
const ValidationError = require("../utils/validation-error");
const ClientError = require("../utils/client-error");
const { StatusCodes } = require("http-status-codes");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      console.log("Something went wrong on repository Layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong on repository Layer");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id", "password"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository Layer");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (!user) {
        throw new ClientError(
          "Attributes not found",
          "invalid email sent in the request",
          "please check the email as there is no record",
          StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      console.log("Something went wrong on repository Layer");
      throw error;
    }
  }

  async isAdmin(UserId) {
    try {
      const user = await User.findByPk(UserId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      const result = await user.hasRole(adminRole);
      console.log(result);
      return result;
    } catch (error) {
      console.log("Something went wrong on repository Layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
