import { Joi, celebrate } from "celebrate";

const APPLICATION_SCHEMA = {
  ADD_APPLICATION: celebrate({
    body: Joi.object({
      full_name: Joi.string()
        .regex(/^[a-zA-Z ]*$/)
        .min(2)
        .max(50)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case "any.required":
                err.message = "Full Name is Required";
                break;
              case "string.min":
                err.message = `Full Name accept minimum ${err.local.limit} character.`;
                break;
              case "string.max":
                err.message = `Full Name accept maximum ${err.local.limit} character.`;
                break;
              default:
                err.message = "Please enter valid Full Name";
                break;
            }
          });
          return errors;
        }),
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
      address: Joi.string()
        .regex(/^[a-zA-Z0-9- ]*$/)
        .min(2)
        .max(50)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case "any.required":
                err.message = "Address is Required";
                break;
              case "string.min":
                err.message = `Address accept minimum ${err.local.limit} character.`;
                break;
              case "string.max":
                err.message = `Address accept maximum ${err.local.limit} character.`;
                break;
              default:
                err.message = "Please enter valid Address";
                break;
            }
          });
          return errors;
        }),
      mobile: Joi.string()
        .regex(/^[0-9+ ]*$/)
        .optional()
        .allow("")
        .min(10)
        .max(13)
        .trim()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "any.empty":
                err.message = i18n
                  .__("require_field")
                  .replace("%s", "Mobile No");
                break;
              case "any.required":
                err.message = i18n
                  .__("require_field")
                  .replace("%s", "Mobile No");
                break;
              case "string.min":
                err.message = i18n
                  .__("min_char")
                  .replace("%f", `${err.context.limit}`)
                  .replace("%s", "Mobile No");
                break;
              case "string.max":
                err.message = i18n
                  .__("max_char")
                  .replace("%f", `${err.context.limit}`)
                  .replace("%s", "Mobile No");
                break;
              case "string.pattern.base":
                err.message = i18n.__("only_numeric");
                break;
              case "string.regex.base":
                err.message = i18n.__("only_numeric");
                break;
              default:
                err.message = i18n
                  .__("validation_error")
                  .replace("%s", "Mobile No");
                break;
            }
          });
          return errors;
        }),
      education_details: Joi.string(),
      work_experience: Joi.string(),
      known_languages: Joi.string(),
      preferred_location: Joi.string(),
      ExpectedCTC: Joi.string(),
      CurrentCTC: Joi.string(),
      NoticePeriod: Joi.string(),
    }).options({ abortEarly: true, allowUnknown: true }),
  }),
};

export { APPLICATION_SCHEMA };
