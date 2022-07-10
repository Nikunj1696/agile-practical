import { Joi, celebrate } from "celebrate";

const ADMIN_SCHEMAS = {
  LOGIN: celebrate({
    body: Joi.object({
      email: Joi.string()
        .email()
        .lowercase()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case "any.required":
                err.message = "Email is Required";
                break;
              default:
                err.message = "Please enter valid Email";
                break;
            }
          });
          return errors;
        }),
      password: Joi.string()
        .min(6)
        .max(15)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case "any.required":
                err.message = "Password is Required";
                break;
              case "string.min":
                err.message = `Password accept minimum ${err.local.limit} character.`;
                break;
              case "string.max":
                err.message = `Password accept maximum ${err.local.limit} character.`;
                break;
              default:
                err.message = "Please enter valid Password";
                break;
            }
          });
          return errors;
        }),
    }).options({ abortEarly: true, allowUnknown: true }),
  }),
};

export { ADMIN_SCHEMAS };
