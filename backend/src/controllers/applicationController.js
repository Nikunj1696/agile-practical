import User from "../models/user.model";
import constants from "../utils/constants";

class applicationController {
  /**
   * Add Application API
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async addApplication(req, res) {
    try {
      const data = req.body;

      let userExists = await User.findOne({
        email: data["email"],
        type: constants.userType.user,
      });

      if (userExists) {
        throw "Application is already exists with this email";
      }

      // collecting all data for insertion in database
      const finalData = {
        full_name: data["full_name"],
        email: data["email"],
        address: data["address"],
        mobile: data["mobile"],
        education_details: data["education_details"]
          ? JSON.parse(data["education_details"])
          : [],
        work_experience: data["work_experience"]
          ? JSON.parse(data["work_experience"])
          : [],
        known_languages: data["known_languages"]
          ? JSON.parse(data["known_languages"])
          : [],
        preferred_location: data["preferred_location"],
        ExpectedCTC: data["ExpectedCTC"],
        CurrentCTC: data["CurrentCTC"],
        NoticePeriod: data["NoticePeriod"],
      };
      await User.create(finalData);

      res.json({
        status: 201,
        message: "Your application has submitted successfully",
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Edit by Admin API
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async editApplication(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;

      let userExists = await User.findOne({
        _id: id,
        type: constants.userType.user,
      });

      if (!userExists) {
        throw "Application not found";
      }

      const finalData = {
        full_name: data["full_name"],
        email: data["email"],
        address: data["address"],
        mobile: data["mobile"],
        education_details: data["education_details"]
          ? JSON.parse(data["education_details"])
          : [],
        work_experience: data["work_experience"]
          ? JSON.parse(data["work_experience"])
          : [],
        known_languages: data["known_languages"]
          ? JSON.parse(data["known_languages"])
          : [],
        preferred_location: data["preferred_location"],
        ExpectedCTC: data["ExpectedCTC"],
        CurrentCTC: data["CurrentCTC"],
        NoticePeriod: data["NoticePeriod"],
      };

      await User.updateOne(
        {
          email: data["email"],
          type: constants.userType.user,
        },
        {
          $set: finalData,
        }
      );

      res.json({
        status: 200,
        message: "Application has updated successfully",
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * View List by Admin API
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async listApplications(req, res) {
    try {
      const filterData = req.query;
      const filter_match = [
        {
          type: constants.userType.user,
        },
      ];

      if (filterData["search"]) {
        const searchQuery = filterData["search"].trim();
        filter_match.push({
          full_name: { $regex: searchQuery, $options: "i" },
        });
      }

      let applications = await User.aggregate([
        {
          $match: { $and: filter_match },
        },
        {
          $project: {
            _id: 1,
            full_name: 1,
            email: 1,
            address: 1,
            education_details: 1,
            work_experience: 1,
            known_languages: 1,
            created_at: 1,
          },
        },
      ]);

      res.json({
        status: 200,
        data: applications,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * View Application Details
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async viewApplicationDetails(req, res) {
    try {
      const id = req.params.id;
      let applicationDetails = await User.findOne({
        type: constants.userType.user,
        _id: id,
      }).select({
        _id: 1,
        full_name: 1,
        email: 1,
        address: 1,
        education_details: 1,
        work_experience: 1,
        known_languages: 1,
        created_at: 1,
      });

      res.json({
        status: 200,
        data: applicationDetails,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete Application Details
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async deleteApplicationDetails(req, res) {
    try {
      const id = req.params.id;

      await User.deleteOne({
        type: constants.userType.user,
        _id: id,
      });

      res.json({
        status: 200,
        message: "Application deleted successfully",
      });
    } catch (error) {
      throw error;
    }
  }
}

export default applicationController;
