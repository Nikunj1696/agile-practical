import * as Yup from "yup";

const mobileNoRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validation = Yup.object({
  full_name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Full Name is Required"),
  address: Yup.string()
    .max(50, "Must be 20 characters or less")
    .required("Address is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  mobile: Yup.string()
    .required("Mobile Number is Required")
    .matches(mobileNoRegExp, "Mobile number is not valid")
    .min(10, "At least 10 digits requires")
    .max(12, "Maximum 12 digits allowed"),
  education_details: Yup.array()
    .of(
      Yup.object().shape({
        board: Yup.string().required("Board is Required"),
        year: Yup.string().required("Board is Required"),
        percentage: Yup.string().required("Board is Required"),
      })
    )
    .required("Education Details are Required"),
});

export default validation;