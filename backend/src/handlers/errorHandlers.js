import { isCelebrateError } from "celebrate";

class mainHandler {
  /**
   * @param {Object} err Error
   * @param {Object} req Request
   * @param {Object} res Response
   * @param {Object} next Next
   * @returns {Object}
   */
  static celebrateErrors = (err, req, res, next) => {
    if (isCelebrateError(err)) {
      const errorBody = err.details.get("body") || err.details.get("params");
      const message = errorBody.message;
      return res.status(400).json({ status: 400, message: message });
    }
    return next(err);
  };

  /**
   * Catch Errors Handler
   * @param {void} fn
   * @returns {*}
   */
  static catchErrors = (fn) => {
    return function (req, res, next) {
      fn(req, res, next).catch((err) => {
        if (typeof err === "string") {
          res.json({
            status: 400,
            message: err,
          });
        } else {
          next(err);
        }
      });
    };
  };

  /**
   * 404 Not Found Error
   * @param {Object} req Request
   * @param {Object} res Response
   * @param {Object} next Next
   */
  static notFound = (req, res, next) => {
    res.json({
      status: 404,
      message: "Route not found",
    });
  };
}

export default mainHandler;