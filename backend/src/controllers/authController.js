import User from "../models/user.model";
import constants from "../utils/constants";
import sha256 from "sha256";
import helper from "../helpers";

class userController {
  /**
   * Admin registration API
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async signUp(req, res) {
    try {
      let userExists = await User.findOne({
        email: constants.adminEmail,
        type: constants.userType.admin,
      });

      if (userExists) {
        throw "Admin already Exists with this email";
      }

      // Hashing the password
      let hashPassword = sha256(constants.adminPassword + constants.SALT);

      const createAdmin = await User.create({
        email: constants.adminEmail,
        password: hashPassword,
        type: constants.userType.admin,
      });
      // Generating the JWT token
      // Token generation function is written in Helper function
      const token = await helper.generateToken(createAdmin);

      res.json({
        status: 201,
        message: "Admin created successfully",
        data: {
          token: token,
          name: "Admin",
          email: constants.adminEmail,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Admin Log API
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async login(req, res) {
    try {
      const data = req.body;

      let userExists = await User.findOne({
        email: data["email"],
        type: constants.userType.admin,
      });

      if (!userExists) {
        throw "Admin doesn't Exists with this email";
      }

      let hashPassword = sha256(data["password"] + constants.SALT);

      // Generating the JWT token
      const token = await helper.generateToken(userExists);

      if (hashPassword != userExists.password) {
        res.status(401).json({
          status: 401,
          message: "Invalid Credentials",
        });
      } else {
        await User.updateOne(
          {
            email: data["email"],
            type: constants.userType.admin,
          },
          {
            $set: {
              token: token,
            },
          }
        );
      }

      res.json({
        status: 201,
        message: "Successfully Login",
        data: {
          token: token,
          name: "Admin",
          email: constants.adminEmail,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Admin Log Out API
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async logout(req, res) {
    try {
      let userExists = await User.findOne({
        email: constants.adminEmail,
        type: constants.userType.admin,
      });

      if (!userExists) {
        throw "Admin doesn't Exists with this email";
      }

      /**
       * remove token from database
       */
      await User.updateOne(
        {
          email: constants.adminEmail,
          type: constants.userType.admin,
        },
        {
          $set: {
            token: "",
          },
        }
      );

      res.json({
        status: 200,
        message: "Successfully Logout"
      });
    } catch (error) {
      throw error;
    }
  }
}

export default userController;
